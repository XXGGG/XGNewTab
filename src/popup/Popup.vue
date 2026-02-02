<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { customNewTabUrl, presetUrls } from '~/logic/storage'

const inputUrl = ref(customNewTabUrl.value)
const showSaved = ref(false)
const errorMsg = ref('')

// URL 验证函数
function isValidUrl(url: string): boolean {
  if (!url || !url.trim())
    return true
  try {
    const parsed = new URL(url.trim().match(/^https?:\/\//i) ? url : `https://${url}`)
    return ['http:', 'https:'].includes(parsed.protocol)
  }
  catch {
    return false
  }
}

// 验证状态
const isValid = computed(() => isValidUrl(inputUrl.value))

// 选择预设网址
function selectPreset(url: string) {
  if (url) {
    inputUrl.value = url
  }
}

// 打开设置页
function openOptions() {
  browser.runtime.openOptionsPage()
}

// 监听输入变化，自动保存有效的 URL
watch(inputUrl, (newUrl) => {
  errorMsg.value = ''
  if (!newUrl || !newUrl.trim()) {
    customNewTabUrl.value = ''
    showSaved.value = true
    setTimeout(() => showSaved.value = false, 1500)
    return
  }
  if (isValidUrl(newUrl)) {
    customNewTabUrl.value = newUrl.trim()
    showSaved.value = true
    setTimeout(() => showSaved.value = false, 1500)
  }
  else {
    errorMsg.value = '请输入有效的 URL (http:// 或 https://)'
  }
})

// 同步外部变化
watch(customNewTabUrl, (newUrl) => {
  if (newUrl !== inputUrl.value)
    inputUrl.value = newUrl
}, { immediate: true })
</script>

<template>
  <main class="w-[320px] px-4 py-5 text-center text-gray-700">
    <!-- Logo 点击打开设置页 -->
    <div class="cursor-pointer hover:opacity-80 transition-opacity" @click="openOptions">
      <Logo />
    </div>
    <div class="text-lg font-medium mt-2">
      XGNewTab
    </div>
    <SharedSubtitle />

    <div class="relative mt-3">
      <input
        v-model="inputUrl"
        class="w-full px-3 py-2 border rounded-lg transition-colors"
        :class="[
          isValid
            ? 'border-gray-300 focus:border-blue-500'
            : 'border-red-400 focus:border-red-500',
        ]"
        type="url"
        placeholder="https://example.com"
      >
      <transition name="fade">
        <span
          v-if="showSaved"
          class="absolute right-2 top-1/2 -translate-y-1/2 text-green-500 text-sm"
        >
          已保存
        </span>
      </transition>
    </div>

    <p v-if="errorMsg" class="text-red-500 text-xs text-left mt-1">
      {{ errorMsg }}
    </p>

    <!-- 说明文字 -->
    <p class="text-xs text-gray-400 mt-2 text-left">
      {{ customNewTabUrl ? '打开新标签页时将跳转到此网址' : '留空则显示引导页' }}
    </p>

    <!-- 预设网址 -->
    <div v-if="presetUrls.length > 0" class="mt-3 pt-3 border-t border-gray-200">
      <p class="text-xs text-gray-400 text-left mb-2">
        快速选择
      </p>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="(preset, index) in presetUrls"
          :key="index"
          class="px-3 py-1 text-xs rounded-full transition-colors bg-gray-100 hover:bg-blue-100 hover:text-blue-600"
          @click="selectPreset(preset.url)"
        >
          {{ preset.name }}
        </button>
      </div>
    </div>

    <!-- 底部设置入口 -->
    <div class="mt-4 pt-3 border-t border-gray-200">
      <button
        class="text-xs text-gray-400 hover:text-blue-500 transition-colors"
        @click="openOptions"
      >
        更多设置
      </button>
    </div>
  </main>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
