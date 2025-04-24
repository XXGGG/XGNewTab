import { useWebExtensionStorage } from '~/composables/useWebExtensionStorage'

export const storageDemo = useWebExtensionStorage('webext-demo', 'Storage Demo')

// 添加新的存储变量
export const customNewTabUrl = useWebExtensionStorage('customNewTabUrl', 'https://xgtools.xiexiage.com')