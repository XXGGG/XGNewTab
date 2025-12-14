// 后备方案：如果后台脚本没有成功重定向，这里作为兜底
import { storage } from 'webextension-polyfill'

async function handleNewTab() {
  // 添加一个短暂延迟，让后台脚本有机会处理
  setTimeout(async () => {
    try {
      const { customNewTabUrl } = await storage.local.get('customNewTabUrl')

      if (customNewTabUrl && typeof customNewTabUrl === 'string' && customNewTabUrl.trim()) {
        // 如果还在新标签页，说明后台脚本没有成功重定向，使用兜底方案
        if (location.href.includes('newtab/index.html') || location.href.includes('chrome://newtab/')) {
          location.replace(customNewTabUrl)
        }
      }
    }
    catch (error) {
      console.error('新标签页重定向失败:', error)
    }
  }, 100) // 100ms延迟
}

handleNewTab()
