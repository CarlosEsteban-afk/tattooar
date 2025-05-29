<template>
  <div class="rounded-lg overflow-hidden shadow bg-white">
    <div class="w-full h-32 bg-gray-200 flex items-center justify-center">
      <!-- Placeholder image -->
      <img
        :src="tatuImg"
        alt="tatuaje"
        class="object-cover w-full h-full"
      />
    </div>
    <div class="p-3">
      <h2 class="text-sm font-semibold truncate">{{ title }}</h2>
      <br>
      <p class="text-xs text-gray-600">{{ author }}</p>
      <br>
      <p class="text-xs text-gray-600">{{ date }}</p>
      <br>
      <p class="text-xs text-gray-600">{{ description }}</p>
      <br>
      <slot name="actions">
<button
        class="mt-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
        @click="$emit('delete')"
      >
        Borrar
      </button>
       
      </slot>   
      
    </div>
  </div>
</template>

<script setup>
import tatuImg from '../assets/tatu.jpg';


defineProps({
  title: String,
  author: String,
  description: String,
  date: {
    type: String,
    default: new Date().toLocaleDateString()
  }
})
</script>
