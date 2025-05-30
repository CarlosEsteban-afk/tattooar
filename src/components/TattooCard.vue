<template>
  <div class="rounded-xl border border-gray-200 bg-white shadow p-0 max-w-xs mx-auto flex flex-col h-full">
    <!-- Header-->
       <div class="rounded-t-xl p-3 flex items-center justify-between relative" style="background-color: #2E076B;">
    <div>
        <h2 class="text-white text-base font-semibold truncate">{{ title }}</h2>
        <div class="flex gap-2 mt-1">
          <span
            v-for="filter in filters"
            :key="filter"
            class="bg-purple-200 text-purple-800 text-xs px-2 py-0.5 rounded"
          >
            {{ filter }}
          </span>
        </div>
      </div>
      <!-- Solo muestra el número de reportes si es userReport o tattooReport -->
      <span
        v-if="type === 'userReport' || type === 'tattooReport'"
        class="absolute top-3 right-3 bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded flex items-center gap-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="inline" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path d="M12 9v4" />
          <circle cx="12" cy="17" r="1" />
          <circle cx="12" cy="12" r="10" />
        </svg>
        {{ reports || 3 }} reportes
      </span>
    </div>
    <!-- Imagen -->
    <div class="w-full aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
      <img :src="img" alt="tatuaje" class="object-contain w-full h-full" />
    </div>
    <!-- Descripción -->
    <div class="p-4 flex-1 flex flex-col">
      <div class="mb-2">
        <span
          v-if="category"
          class="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded mr-2"
        >
          {{ category }}
        </span>
        <span class="text-sm text-gray-700">{{ description }}</span>
      </div>
      <div class="flex items-center text-xs text-gray-500 gap-2 mb-4">
        <span>Propietario: {{ author }}</span>
        <span>•</span>
        <span>{{ date }}</span>
      </div>
      <div class="flex gap-2 mt-auto">
  <slot name="actions"></slot>
</div>
    </div>
    <span class="absolute bottom-3 right-3 bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded">AR</span>
  </div>
</template>

<script setup>
import defaultTatuImg from "../assets/tatu.jpg";

defineProps({
  title: String,
  author: String,
  description: String,
  date: {
    type: String,
    default: new Date().toLocaleDateString(),
  },
  filters: {
    type: Array,
    default: () => [],
  },
  category: String,
  reports: Number,
  type: String,
  img: {
    type: String,
    default: defaultTatuImg,
  },
});
</script>