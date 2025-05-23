<template>
  <div class="relative w-90 h-40 mx-auto flex items-center gap-2">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Buscar..."
      class="flex-1 h-8 px-4 py-2 rounded border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-violet-500"
    />
    <button
      @click="$emit('toggle-filters')"
      class="px-3 py-2 rounded hover:bg-violet-800 transition"
    >
      x
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
</script>
