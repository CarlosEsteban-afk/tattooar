<!-- components/FormButton.vue -->
<template>
  <button :type="type"
    class="w-full py-3 font-semibold rounded transition focus:outline-none cursor-pointer focus:ring-2 focus:ring-offset-2"
    :class="[
      variant === 'primary'
        ? 'bg-purple-800 text-white hover:bg-purple-900 focus:ring-purple-500'
        : 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
    ]"
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  type: { type: String, default: 'submit' },
  variant: { type: String, default: 'primary' },
})
</script>
