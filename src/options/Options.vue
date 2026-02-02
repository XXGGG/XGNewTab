<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import deleteIcon from '~/assets/close.svg'
import logo from '~/assets/XGNewTab.svg'
import { customNewTabUrl, presetUrls } from '~/logic/storage'

const inputUrl = ref(customNewTabUrl.value)
const showSaved = ref(false)
const errorMsg = ref('')

// 新增预设的表单
const newPresetName = ref('')
const newPresetUrl = ref('')

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

const isValid = computed(() => isValidUrl(inputUrl.value))
const isNewPresetValid = computed(() => isValidUrl(newPresetUrl.value) && newPresetUrl.value.trim() !== '')

// 更新预设名称
function updatePresetName(index: number, name: string) {
  const newPresets = [...presetUrls.value]
  newPresets[index] = { ...newPresets[index], name }
  presetUrls.value = newPresets
}

// 更新预设URL
function updatePresetUrl(index: number, url: string) {
  const newPresets = [...presetUrls.value]
  newPresets[index] = { ...newPresets[index], url }
  presetUrls.value = newPresets
}

// 删除预设
function deletePreset(index: number) {
  const newPresets = [...presetUrls.value]
  newPresets.splice(index, 1)
  presetUrls.value = newPresets
}

// 添加新预设
function addPreset() {
  if (!newPresetName.value.trim() || !newPresetUrl.value.trim() || !isNewPresetValid.value)
    return

  presetUrls.value = [...presetUrls.value, {
    name: newPresetName.value.trim(),
    url: newPresetUrl.value.trim(),
  }]

  // 重置表单
  newPresetName.value = ''
  newPresetUrl.value = ''
}

// 在新标签页打开网址
function openUrl(url: string) {
  if (url && url.trim()) {
    window.open(url, '_blank')
  }
}

// 设为自动跳转网址
function setAsAutoRedirect(url: string) {
  if (url && url.trim()) {
    inputUrl.value = url.trim()
    customNewTabUrl.value = url.trim()
    showSaved.value = true
    setTimeout(() => showSaved.value = false, 2000)
  }
}

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
    errorMsg.value = '请输入有效的 URL'
  }
})

watch(customNewTabUrl, (newUrl) => {
  if (newUrl !== inputUrl.value)
    inputUrl.value = newUrl
}, { immediate: true })
</script>

<template>
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <img :src="logo" class="w-16 h-16 mx-auto mb-4" alt="XGNewTab">
    <h1 class="text-2xl font-bold mb-2">
      XGNewTab
    </h1>
    <SharedSubtitle />

    <div class="max-w-2xl mx-auto mt-6">
      <!-- 自定义新标签页 URL -->
      <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-6">
        <label class="block text-left text-sm font-medium mb-3">
          新标签页跳转网址
        </label>
        <div class="relative">
          <input
            v-model="inputUrl"
            class="w-full px-4 py-3 border rounded-lg transition-colors text-base bg-white dark:bg-gray-700"
            :class="[
              isValid
                ? 'border-gray-300 focus:border-blue-500 dark:border-gray-600'
                : 'border-red-400 focus:border-red-500',
            ]"
            type="url"
            placeholder="https://example.com"
          >
          <transition name="fade">
            <span
              v-if="showSaved"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 text-sm font-medium"
            >
              已保存
            </span>
          </transition>
        </div>
        <p v-if="errorMsg" class="mt-2 text-red-500 text-sm text-left">
          {{ errorMsg }}
        </p>
        <p class="mt-2 text-xs text-gray-500 dark:text-gray-400 text-left">
          {{ customNewTabUrl ? `✓ 打开新标签页时将跳转到：${customNewTabUrl}` : 'ℹ️ 留空则显示引导页面，引导用户设置跳转网址' }}
        </p>
      </div>

      <!-- 预设网址管理 -->
      <div class="pt-6 border-t border-gray-200 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <p class="text-sm font-medium text-left">
            快捷网址管理
          </p>
          <p class="text-xs text-gray-400">
            点击绿色按钮快速设置为跳转网址
          </p>
        </div>

        <!-- 预设列表 -->
        <div class="space-y-3">
          <div
            v-for="(preset, index) in presetUrls"
            :key="index"
            class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {{ preset.name.charAt(0) }}
            </div>
            <input
              :value="preset.name"
              class="w-32 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              placeholder="名称"
              @input="updatePresetName(index, ($event.target as HTMLInputElement).value)"
            >
            <input
              :value="preset.url"
              class="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              placeholder="https://example.com"
              @input="updatePresetUrl(index, ($event.target as HTMLInputElement).value)"
            >
            <button
              class="p-2 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors group"
              :class="{ 'bg-green-100 dark:bg-green-900/30': customNewTabUrl === preset.url }"
              :title="customNewTabUrl === preset.url ? '当前自动跳转网址' : '设为自动跳转'"
              @click="setAsAutoRedirect(preset.url)"
            >
              <svg class="w-5 h-5 transition-colors" :class="customNewTabUrl === preset.url ? 'text-green-600' : 'text-gray-500 group-hover:text-green-600'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </button>
            <button
              class="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors group"
              title="访问此网址"
              @click="openUrl(preset.url)"
            >
              <svg class="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
            <button
              class="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              title="删除"
              @click="deletePreset(index)"
            >
              <img
                :src="deleteIcon"
                class="w-5 h-5"
                alt="删除"
              >
            </button>
          </div>

          <!-- 新增行 -->
          <div class="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-dashed border-green-200 dark:border-green-800">
            <div class="w-8 h-8 bg-green-400 rounded flex items-center justify-center text-white text-lg flex-shrink-0" />
            <input
              v-model="newPresetName"
              class="w-32 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
              placeholder="名称"
            >
            <input
              v-model="newPresetUrl"
              class="flex-1 px-3 py-2 text-sm border rounded-lg bg-white dark:bg-gray-700"
              :class="[isNewPresetValid || !newPresetUrl ? 'border-gray-300 dark:border-gray-600' : 'border-red-400']"
              placeholder="https://example.com"
            >
            <button
              class="px-4 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
              :disabled="!newPresetName.trim() || !isNewPresetValid"
              @click="addPreset"
            >
              添加
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-10 text-gray-400 dark:text-gray-500 text-sm">
      <span>v1.0.0</span>
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

input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>
