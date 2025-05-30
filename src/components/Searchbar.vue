<template>
  <div class="w-90 flex items-center gap-2">
    <!-- Input de búsqueda (puede estar funcional o solo decorativo) -->
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Buscar..."
      class="flex-1 h-8 py-2 rounded border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-violet-500"
      @keydown.enter="emit('search', searchQuery)"
    />

    <!-- Botón para abrir filtros -->
    <button
      @click="isDrawerOpen = true"
      class="bg-white text-violet-900 w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-600"
    >
      <SlidersHorizontal class="w-4 h-4" />
    </button>

    <!-- Drawer de filtros -->
    <FiltersDrawer
      :visible="isDrawerOpen"
      @close="isDrawerOpen = false"
      @apply="applyFilters"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FiltersDrawer from './FiltersDrawer.vue'
import { SlidersHorizontal } from 'lucide-vue-next'

const emit = defineEmits(['apply-filters', 'search'])

const searchQuery = ref('')
const isDrawerOpen = ref(false)

function applyFilters(payload) {
  emit('apply-filters', payload)
}
</script>
