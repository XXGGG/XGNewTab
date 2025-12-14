import { onMessage, sendMessage } from 'webext-bridge/background'
import type { Tabs } from 'webextension-polyfill'

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client')
  // load latest content script
  import('./contentScriptHMR')
}

// remove or turn this off if you don't use side panel
const USE_SIDE_PANEL = true

// to toggle the sidepanel with the action button in chromium:
if (USE_SIDE_PANEL) {
  // @ts-expect-error missing types
  browser.sidePanel
    .setPanelBehavior({ openPanelOnActionClick: true })
    .catch((error: unknown) => console.error(error))
}

browser.runtime.onInstalled.addListener((): void => {
  // eslint-disable-next-line no-console
  console.log('Extension installed')
})

// 监听新标签页创建，直接重定向到自定义URL
browser.tabs.onCreated.addListener(async (tab) => {
  // 检查是否是新标签页（chrome://newtab/ 或者我们的扩展页面）
  if (tab.url === 'chrome://newtab/' || tab.url?.includes('newtab/index.html')) {
    try {
      // 从存储中获取自定义URL
      const { customNewTabUrl } = await browser.storage.local.get('customNewTabUrl')

      if (customNewTabUrl && typeof customNewTabUrl === 'string' && customNewTabUrl.trim()) {
        // 直接更新标签页URL，避免重定向
        await browser.tabs.update(tab.id, { url: customNewTabUrl })
      }
    }
    catch (error) {
      console.error('重定向新标签页失败:', error)
    }
  }
})

// 监听标签页更新事件，处理空白新标签页
browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  // 当标签页完成加载且URL是新标签页时
  if (changeInfo.status === 'complete'
    && (tab.url === 'chrome://newtab/' || tab.url?.includes('newtab/index.html'))) {
    try {
      const { customNewTabUrl } = await browser.storage.local.get('customNewTabUrl')

      if (customNewTabUrl && typeof customNewTabUrl === 'string' && customNewTabUrl.trim()) {
        await browser.tabs.update(tabId, { url: customNewTabUrl })
      }
    }
    catch (error) {
      console.error('更新标签页失败:', error)
    }
  }
})

let previousTabId = 0

// communication example: send previous tab title from background page
// see shim.d.ts for type declaration
browser.tabs.onActivated.addListener(async ({ tabId }) => {
  if (!previousTabId) {
    previousTabId = tabId
    return
  }

  let tab: Tabs.Tab

  try {
    tab = await browser.tabs.get(previousTabId)
    previousTabId = tabId
  }
  catch {
    return
  }

  // eslint-disable-next-line no-console
  console.log('previous tab', tab)
  sendMessage('tab-prev', { title: tab.title }, { context: 'content-script', tabId })
})

onMessage('get-current-tab', async () => {
  try {
    const tab = await browser.tabs.get(previousTabId)
    return {
      title: tab?.title,
    }
  }
  catch {
    return {
      title: undefined,
    }
  }
})
