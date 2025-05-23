<template>
  <div class="rounded-lg overflow-hidden shadow bg-white">
    <div class="w-full h-32 bg-gray-200 flex items-center justify-center">
      <!-- Placeholder image -->
      <img
        src="https://flowbite.com/docs/images/blog/image-1.jpg"
        alt="tatuaje"
        class="object-cover w-full h-full"
      />
    </div>
    <div class="p-3">
      <h2 class="text-sm font-semibold truncate">{{ title }}</h2>
      <p class="text-xs text-gray-600">{{ author }}</p>
    </div>
  </div>
</template>

<script setup>
  


defineProps({
  title: String,
  author: String
})
</script>
