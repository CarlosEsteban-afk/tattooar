<template>
  <div class="fixed inset-0 z-50 pointer-events-none">
    <!-- Fondo oscuro con transición de fade -->
    <transition name="fade">
      <div v-if="visible" class="absolute inset-0 bg-black/50 z-0 pointer-events-auto" @click="$emit('close')"></div>
    </transition>

    <!-- Drawer con transición de slide-up -->
    <transition name="slide-up">
      <div v-if="visible"
        class="absolute bottom-0 left-0 right-0 bg-white shadow-lg z-10 transform pointer-events-auto">
        <div class="p-4 h-96 overflow-y-auto flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-semibold">Filtros</h3>
              <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700 text-xl">
                ×
              </button>
            </div>

            <div class="mb-4">
              <label for="city-select" class="block mb-1 text-sm font-medium text-gray-700">Ciudad</label>
              <SearchbarMultiSelect id="city-select" :options="cityOptions" v-model="selectedCities"
                placeholder="Buscar ciudad..." accent="purple"
                empty-message="Las ciudades seleccionadas aparecerán aquí" />
            </div>

            <div class="mb-4">
              <label for="style-select" class="block mb-1 text-sm font-medium text-gray-700">Estilo</label>
              <SearchbarMultiSelect id="style-select" :options="styleOptions" v-model="selectedStyles"
                placeholder="Buscar estilo..." accent="purple"
                empty-message="Los estilos seleccionados aparecerán aquí" />
            </div>
          </div>

          <button @click="confirm" class="w-full bg-purple-900 text-white py-2 rounded-lg hover:bg-purple-700">
            Aplicar filtros
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SearchbarMultiSelect from './SearchbarMultiselect.vue'

const props = defineProps({
  visible: Boolean
})
const emit = defineEmits(['close', 'apply'])

const selectedCities = ref([])
const selectedStyles = ref([])

const cityOptions = [
  'Santiago', 'Valparaíso', 'Viña del Mar', 'Concepción', 'La Serena',
  'Antofagasta', 'Temuco', 'Rancagua', 'Puerto Montt', 'Iquique',
  'Talca', 'Arica', 'Copiapó', 'Chillán', 'Punta Arenas',
  'Los Ángeles', 'Curicó', 'Osorno', 'Quilpué', 'San Fernando'
]

const styleOptions = [
  'Realismo', 'Tradicional', 'Neo Tradicional', 'Tribal',
  'Geométrico', 'Acuarela', 'Blackwork', 'Minimalista',
  'Fineline', 'Lettering'
]

function confirm() {
  emit('apply', {
    cities: selectedCities.value,
    styles: selectedStyles.value
  })
  emit('close')
}
</script>

<style scoped>
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
