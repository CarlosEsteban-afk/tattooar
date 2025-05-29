<template>
  <div
    class="rounded-xl border border-gray-200 bg-white shadow p-4 max-w-xs mx-auto"
  >
    <!-- Header -->
    <div class="flex items-center justify-between mb-2">
      <div class="flex items-center gap-2">
        <img
          src="https://i.pravatar.cc/32"
          alt="avatar"
          class="w-8 h-8 rounded-full"
        />
        <div>
          <div class="text-xs font-semibold text-gray-800">{{ author }}</div>
          <div class="text-[11px] text-gray-400">{{ date }}</div>
        </div>
      </div>
      <span class="font-bold text-xs text-gray-500">AR</span>
    </div>
    <!-- Imagen -->
    <div
      class="w-full aspect-square bg-gray-100 flex items-center justify-center rounded-lg mb-2 overflow-hidden"
    >
      <img :src="tatuImg" alt="tatuaje" class="object-contain w-full h-full" />
    </div>
    <!-- Título -->
    <h2 class="mb-3 text-sm font-semibold truncate">{{ title }}</h2>
    <!-- Descripción -->
    <div class="text-sm text-gray-700 mb-2">{{ description }}</div>
    <!-- Etiquetas y acciones -->
    <div class="flex items-center justify-between">
      <slot name="actions">
        <div class="flex flex-col items-start mb-2">
          <div class="flex gap-2">
            <span
              v-for="filter in filters"
              :key="filter"
              class="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded"
            >
              {{ filter }}
            </span>
          </div>
          <button
            class="mt-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs w-full"
            @click="$emit('delete')"
          >
            <div class="flex">
              <div class="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-ban-icon lucide-ban"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m4.9 4.9 14.2 14.2" />
                </svg>
              </div>

              Desactivar tatuaje
            </div>
          </button>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup>
import tatuImg from "../assets/tatu.jpg";

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
});
</script>
