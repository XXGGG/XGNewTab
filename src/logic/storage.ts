import { useWebExtensionStorage } from '~/composables/useWebExtensionStorage'

// 预设网址类型
export interface PresetUrl {
  name: string
  url: string
}

// 默认预设列表 - 提供一些常用网站作为示例
const defaultPresets: PresetUrl[] = [
  { name: 'Google', url: 'https://www.google.com' },
  { name: 'XGWeb', url: 'https://xgweb.xiexiage.com' },
  { name: 'GitHub', url: 'https://github.com' },
  { name: 'YouTube', url: 'https://www.youtube.com' },
]

// 自定义新标签页 URL - 如果设置了，新标签页会直接跳转到这个URL
export const customNewTabUrl = useWebExtensionStorage('customNewTabUrl', '')

// 用户自定义预设网址列表
export const presetUrls = useWebExtensionStorage<PresetUrl[]>('presetUrls', defaultPresets)
