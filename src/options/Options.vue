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
    const parsed = new URL(url)
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

watch(inputUrl, (newUrl) => {
  errorMsg.value = ''
  if (!newUrl || !newUrl.trim()) {
    customNewTabUrl.value = ''
    return
  }
  if (isValidUrl(newUrl)) {
    customNewTabUrl.value = newUrl
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

    <div class="max-w-lg mx-auto mt-6">
      <label class="block text-left text-sm font-medium mb-2">
        新标签页网址
      </label>
      <div class="relative">
        <input
          v-model="inputUrl"
          class="w-full px-4 py-3 border rounded-lg transition-colors text-base"
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

      <!-- 预设网址管理 -->
      <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p class="text-sm font-medium text-left mb-3">
          快捷网址
        </p>

        <!-- 预设列表 - 每行一个 -->
        <div class="space-y-2">
          <div
            v-for="(preset, index) in presetUrls"
            :key="index"
            class="flex items-center gap-2"
          >
            <input
              :value="preset.name"
              class="w-24 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg"
              placeholder="名称"
              @input="updatePresetName(index, ($event.target as HTMLInputElement).value)"
            >
            <input
              :value="preset.url"
              class="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg"
              placeholder="https://example.com"
              @input="updatePresetUrl(index, ($event.target as HTMLInputElement).value)"
            >
            <img
              :src="deleteIcon"
              class="w-6 h-6 cursor-pointer hover:opacity-70 transition-opacity"
              @click="deletePreset(index)"
            >
          </div>

          <!-- 新增行 -->
          <div class="flex items-center gap-2">
            <input
              v-model="newPresetName"
              class="w-24 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg"
              placeholder="名称"
            >
            <input
              v-model="newPresetUrl"
              class="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg"
              :class="[isNewPresetValid || !newPresetUrl ? '' : 'border-red-400']"
              placeholder="https://example.com"
            >
            <button
              class="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              :disabled="!newPresetName.trim() || !isNewPresetValid"
              @click="addPreset"
            >
              Add
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
</style>
