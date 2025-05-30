<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs flex items-end justify-center"
      @click.self="closeDrawer"
    >
      <transition name="slide-up">
        <div
          class="bg-white w-full max-w-md shadow-lg p-6 overflow-y-auto rounded-t-xl max-h-[90vh]"
          @click.stop
        >
          <!-- Header -->
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl font-semibold text-gray-800">Agregar diseño</h2>
            <button @click="closeDrawer" class="text-gray-600 text-xl">×</button>
          </div>

          <!-- Contenido del drawer -->
          <div class="space-y-6">
            <div class="text-gray-600">
              Aquí puedes agregar el formulario o los campos necesarios para subir un nuevo diseño.
            </div>

            <!-- Placeholder de campos -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <input
                type="text"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Título del diseño"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Imagen</label>
              <input
                type="file"
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
              />
            </div>

            <!-- Botón de acción -->
            <button
              class="w-full bg-purple-700 hover:bg-purple-800 text-white py-2 rounded-lg font-semibold"
              @click="submitDesign"
            >
              Guardar diseño
            </button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  visible: Boolean,
})

const emit = defineEmits(['close', 'save'])

function closeDrawer() {
  emit('close')
}

function submitDesign() {
  // Aquí va la lógica para guardar el diseño
  alert('Diseño guardado')
  closeDrawer()
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
</style>
