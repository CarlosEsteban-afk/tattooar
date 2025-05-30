<template>
  <a
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
    class="bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-100 transition"
    title="Ver en AR"
  >
    AR
  </a>
</template>

<script setup>
const props = defineProps({
  url: {
    type: String,
    required: true
  }
})
</script>
