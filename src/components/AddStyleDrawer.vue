<script setup>
import { ref, watch } from 'vue'
import SearchbarMultiselect from '../components/SearchbarMultiselect.vue'

const props = defineProps({
  visible: Boolean,
  modelValue: Array
})

const emit = defineEmits(['close', 'update:modelValue'])

const selected = ref([])

watch(() => props.modelValue, (val) => {
  selected.value = [...val]
}, { immediate: true })

function confirm() {
  emit('update:modelValue', selected.value)
  emit('close')
}
</script>

<template>
  <div class="fixed inset-0 z-50 pointer-events-none">
    <!-- Overlay -->
    <transition name="fade">
      <div
        v-if="visible"
        class="absolute inset-0 bg-black/50 backdrop-blur-xs pointer-events-auto"
        @click="$emit('close')"
      ></div>
    </transition>

    <!-- Drawer panel -->
    <transition name="slide-up">
      <div
        v-if="visible"
        class="absolute bottom-0 left-0 right-0 bg-white shadow-lg z-10 pointer-events-auto"
      >
        <div class="p-4 h-96 flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-center mb-2">
              <h3 class="text-lg font-semibold">Añadir estilo</h3>
              <button
                @click="$emit('close')"
                class="text-gray-500 hover:text-gray-700 text-xl"
              >
                ×
              </button>
            </div>

            <SearchbarMultiselect
              :options="[
                'Realismo', 'Tradicional', 'Neo Tradicional', 'Tribal',
                'Geométrico', 'Acuarela', 'Blackwork', 'Minimalista',
                'Fineline', 'Lettering'
              ]"
              v-model="selected"
              placeholder="Buscar estilo..."
              accent="blue"
              empty-message="Los estilos seleccionados aparecerán aquí"
            />
          </div>

          <button
            @click="confirm"
            class="w-full bg-purple-900 text-white py-2 rounded-lg mt-4 hover:bg-purple-700"
          >
            Confirmar
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

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
