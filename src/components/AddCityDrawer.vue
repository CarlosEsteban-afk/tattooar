<template>
  <div class="fixed inset-0 z-50 pointer-events-none">
    <transition name="fade">
      <div
        v-if="visible"
        class="absolute inset-0 bg-black/50 backdrop-blur-xs z-0 pointer-events-auto"
        @click="$emit('close')"
      ></div>
    </transition>

    <transition name="slide-up">
      <div
        v-if="visible"
        class="absolute bottom-0 left-0 right-0 bg-white shadow-lg z-10 transform pointer-events-auto"
      >
        <div class="p-4 h-80 overflow-y-auto flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-center mb-2">
              <h3 class="text-lg font-semibold">Añadir ciudad</h3>
              <button @click="$emit('close')" class="text-gray-500 hover:text-gray-700 text-xl">×</button>
            </div>

            <!-- City Search Input (Reemplazado con SearchSelect) -->
            <SearchbarMultiselect
              :options="cityOptions"
              v-model="cities"
              placeholder="Buscar ciudad..."
              accent="purple"
              empty-message="Las ciudades seleccionadas aparecerán aquí"
            />
          </div>

          <button
            class="mt-4 px-4 py-2 bg-purple-900 text-white rounded-lg hover:bg-purple-700"
            @click="confirmSelection"
          >
            Confirmar
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import SearchbarMultiselect from '../components/SearchbarMultiselect.vue'
import { Search } from 'lucide-react'

const props = defineProps({
  visible: Boolean,
  initial: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['close', 'confirm'])

const cities = ref([...props.initial])

const cityOptions = [
  'Santiago', 'Valparaíso', 'Viña del Mar', 'Concepción', 'La Serena',
  'Antofagasta', 'Temuco', 'Rancagua', 'Puerto Montt', 'Iquique',
  'Talca', 'Arica', 'Copiapó', 'Chillán', 'Punta Arenas',
  'Los Ángeles', 'Curicó', 'Osorno', 'Quilpué', 'San Fernando'
]


watch(() => props.initial, (newVal) => {
  cities.value = [...newVal]
})

function confirmSelection() {
  emit('confirm', cities.value)
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
