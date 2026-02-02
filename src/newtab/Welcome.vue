<script setup lang="ts">
import logo from '~/assets/XGNewTab.svg'
import { presetUrls } from '~/logic/storage'

// 快速设置跳转网址
function setRedirectUrl(url: string) {
  if (url && url.trim()) {
    // 保存到 storage
    browser.storage.local.set({ customNewTabUrl: url.trim() }).then(() => {
      // 立即跳转
      window.location.replace(url.trim())
    })
  }
}

// 打开设置页
function openOptions() {
  browser.runtime.openOptionsPage()
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8">
    <div class="max-w-2xl w-full">
      <!-- Logo 和标题 -->
      <div class="text-center mb-12">
        <img :src="logo" class="w-24 h-24 mx-auto mb-6" alt="XGNewTab">
        <h1 class="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-3">
          欢迎使用 XGNewTab
        </h1>
        <p class="text-gray-500 dark:text-gray-400 text-lg">
          自定义你的新标签页跳转网址
        </p>
      </div>

      <!-- 快速选择区域 -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-6">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6 text-center">
          选择一个网址开始
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <button
            v-for="(preset, index) in presetUrls"
            :key="index"
            class="group p-6 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 border-2 border-transparent hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200"
            @click="setRedirectUrl(preset.url)"
          >
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                {{ preset.name.charAt(0) }}
              </div>
              <div class="text-left flex-1">
                <div class="text-base font-medium text-gray-700 dark:text-gray-300 mb-1">
                  {{ preset.name }}
                </div>
                <div class="text-sm text-gray-500 dark:text-gray-500 truncate">
                  {{ preset.url }}
                </div>
              </div>
              <svg class="w-6 h-6 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>

        <!-- 自定义按钮 -->
        <div class="text-center pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            class="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
            @click="openOptions"
          >
            自定义其他网址
          </button>
          <p class="text-sm text-gray-400 dark:text-gray-500 mt-3">
            或者在扩展图标的弹出窗口中快速设置
          </p>
        </div>
      </div>

      <!-- 底部说明 -->
      <div class="text-center text-sm text-gray-400 dark:text-gray-500">
        <p>选择后，每次打开新标签页都会自动跳转到该网址</p>
        <p class="mt-1">
          你随时可以在设置中更改
        </p>
      </div>
    </div>

    <!-- 版本号 -->
    <div class="fixed bottom-6 text-xs text-gray-400 dark:text-gray-600">
      XGNewTab v1.0.0
    </div>
  </div>
</template>

<style scoped>
button {
  transition: all 0.2s ease;
}
</style>
