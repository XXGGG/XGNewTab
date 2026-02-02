// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client')
}

browser.runtime.onInstalled.addListener((): void => {
  // eslint-disable-next-line no-console
  console.log('XGNewTab installed')
})

// 注意：根据 Chrome Web Store 政策（Red Argon），
// 新标签页扩展不应该使用后台脚本监听标签页事件并强制重定向。
// 正确的做法是在新标签页本身提供内容和导航选项，让用户主动点击。
