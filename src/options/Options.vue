<script setup lang="ts">
import logo from '~/assets/logo.svg'
// import { storageDemo } from '~/logic/storage'
import { customNewTabUrl } from '~/logic/storage'
</script>

<template>
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <img :src="logo" class="icon-btn mx-2 text-2xl" alt="extension icon">
    <div>XGNewTab</div>
    <!-- <div>Options</div> -->
    <SharedSubtitle />

    <input v-model="customNewTabUrl" class="w-60 border border-gray-400 rounded px-2 py-1 mt-2" placeholder="https://...com">

    <div class="mt-4">
      Powered by Vite <pixelarticons-zap class="align-middle inline-block" />
    </div>
  </main>
</template>
