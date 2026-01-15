// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client')
}

browser.runtime.onInstalled.addListener((): void => {
  // eslint-disable-next-line no-console
  console.log('XGNewTab installed')
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

// 监听标签页更新事件，处理空白新标签页（作为备用方案）
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
