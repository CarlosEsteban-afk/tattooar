<template>
  <div class="w-90 flex items-center gap-2">
    <!-- Search Input -->
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Buscar..."
      class="flex-1 h-8 px-4 py-2 rounded border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-violet-500"
    />

    <!-- Filter Button -->
    <button
      @click="isDrawerOpen = true"
      class="bg-violet-500 text-white w-2 h-8 px-4 py-2 rounded shadow hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500">
      
    </button>
    
    <!-- Bottom Drawer -->
    <FiltersDrawer :visible="isDrawerOpen" @close="isDrawerOpen = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FiltersDrawer from './FiltersDrawer.vue'

const searchQuery = ref('')
const isDrawerOpen = ref(false)
</script>
