import { createApp } from 'vue'
import { storage } from 'webextension-polyfill'
import Welcome from './Welcome.vue'
import { setupApp } from '~/logic/common-setup'
import '../styles'

// 检查并执行重定向
async function checkAndRedirect() {
  try {
    const result = await storage.local.get('customNewTabUrl')
    const customUrl = result.customNewTabUrl

    // 如果设置了自定义URL，直接重定向
    if (customUrl && typeof customUrl === 'string' && customUrl.trim()) {
      let targetUrl = customUrl.trim()
      // 确保URL有协议
      if (!targetUrl.match(/^https?:\/\//i)) {
        targetUrl = `https://${targetUrl}`
      }

      // 使用 location.replace 避免在历史记录中留下痕迹
      window.location.replace(targetUrl)
      return true // 已重定向
    }

    return false // 未设置，显示引导页
  }
  catch (error) {
    console.error('检查重定向失败:', error)
    return false
  }
}

// 先检查重定向，如果没有设置则显示欢迎页
checkAndRedirect().then((redirected) => {
  if (!redirected) {
    // 没有设置跳转网址，显示欢迎引导页
    const app = createApp(Welcome)
    setupApp(app)
    app.mount('#app')
  }
})
