<template>
  <div class="ar-view">
    <div class="absolute top-4 right-4 z-10">
      <a href="/" class="text-white bg-purple-900 hover:bg-purple-700 px-4 py-2 rounded">
        Volver
      </a>
    </div>
    <iframe
      v-if="tattoo?.image"
      :src="iframeSrc"
      class="w-full h-screen border-0"
    ></iframe>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useTattooStore } from '../stores/DesignStore'
import { computed } from 'vue'

const route = useRoute()
const tattooId = Number(route.params.id)
const tattooStore = useTattooStore()
const tattoo = computed(() => tattooStore.getTattooById(tattooId))

const iframeSrc = computed(() => {
  const base = import.meta.env.BASE_URL
  const img = tattoo.value?.image || ''
  return `${base}ar.html?img=${encodeURIComponent(img)}`
})
</script>

<style>
.ar-view {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
}
iframe {
  display: block;
}
</style>
