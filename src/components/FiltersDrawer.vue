<template>
  <div class="fixed inset-0 z-50 pointer-events-none">
    <!-- Fondo oscuro con transición de fade -->
    <transition name="fade">
      <div
        v-if="visible"
        class="absolute inset-0 bg-black/50 z-0 pointer-events-auto"
        @click="$emit('close')"
      ></div>
    </transition>

    <!-- Drawer con transición de slide-up -->
    <transition name="slide-up">
      <div
        v-if="visible"
        class="absolute bottom-0 left-0 right-0 bg-white shadow-lg z-10 transform pointer-events-auto"
      >
        <div class="p-4 h-80 overflow-y-auto">
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-lg font-semibold">Filtros</h3>
            <button
              @click="$emit('close')"
              class="text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
          </div>

          <div class="mb-4">
            <label class="block mb-1 text-sm font-medium text-gray-700">Ciudad</label>
            <CitySearchInput />
          </div>

          <p class="text-sm text-gray-600">Filtros</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import CitySearchInput from './CitySearchInput.vue';

defineProps({
  visible: Boolean
});
</script>

<style scoped>
/* Transición del drawer: de abajo hacia arriba y viceversa */
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
.slide-up-enter-to,
.slide-up-leave-from {
  transform: translateY(0%);
}
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease-in-out;
}

/* Transición del fondo oscuro: fade in y fade out */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}
</style>
