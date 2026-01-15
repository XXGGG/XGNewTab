import { useWebExtensionStorage } from '~/composables/useWebExtensionStorage'

// 预设网址类型
export interface PresetUrl {
  name: string
  url: string
  isDefault?: boolean // 是否为默认预设（不可删除名称）
}

// 默认预设列表
const defaultPresets: PresetUrl[] = [
  { name: 'Google', url: 'https://www.google.com', isDefault: true },
  { name: '百度', url: 'https://www.baidu.com', isDefault: true },
  { name: 'Bing', url: 'https://www.bing.com', isDefault: true },
]

// 自定义新标签页 URL
export const customNewTabUrl = useWebExtensionStorage('customNewTabUrl', 'https://www.google.com')

// 用户自定义预设网址列表
export const presetUrls = useWebExtensionStorage<PresetUrl[]>('presetUrls', defaultPresets)
