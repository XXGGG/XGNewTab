import { storage } from 'webextension-polyfill'

async function redirectToCustomUrl() {
  const { customNewTabUrl } = await storage.local.get('customNewTabUrl')

  if (customNewTabUrl && typeof customNewTabUrl === 'string' && customNewTabUrl.trim()) {
    location.replace(customNewTabUrl)
  }
}

redirectToCustomUrl()
