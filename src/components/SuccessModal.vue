<!-- components/SuccessModal.vue -->
<template>
  <div v-if="show" tabindex="-1" aria-hidden="true"
    class="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black/40 flex items-center justify-center">
    <div class="relative bg-white rounded-lg shadow-lg max-w-sm w-full p-6 text-center">
      <!-- Decoración -->
      <img src="/assets/left-modal.png" class="absolute top-0 left-0 w-12 h-12" />
      <img src="/assets/right-modal.png" class="absolute top-0 right-0 w-12 h-12" />

      <p class="text-lg font-medium mt-4 mb-6">{{ message }}</p>
      <p class="text-md  mb-6">{{ subMessage }}</p>

      <button @click="onConfirm"
        class="px-6 py-1 bg-purple-800 text-white rounded text-sm hover:bg-purple-900 transition">
        Ingresar
      </button>

      <img src="/assets/bottom-modal.png" class="mx-auto mt-4" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  message: {
    type: String,
    default: '¡Acción completada exitosamente!',
  },
  subMessage: {
    type: String,
    default: '',
  },
  onConfirm: Function
})
</script>
