<script setup lang="ts">
// import { storageDemo } from '~/logic/storage'
import { customNewTabUrl } from '~/logic/storage'
// function openOptionsPage() {
//   browser.runtime.openOptionsPage()
// }
</script>

<template>
  <main class="w-full px-4 py-5 text-center text-gray-700">
    <Logo />
    <div>XGNewTab</div>
    <SharedSubtitle />

    <input v-model="customNewTabUrl" class="w-full mt-2 px-2 py-1 rounded" type="text" placeholder="https://...com" />
    <!-- <button class="btn mt-2" @click="openOptionsPage">
      Open Options
    </button>
    <div class="mt-2">
      <span class="opacity-50">Storage:</span> {{ storageDemo }}
    </div> -->
  </main>
</template>
