<template>
  <transition name="fade">
    <div v-if="visible" class="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs flex items-end justify-center"
      @click.self="closeDrawer">
      <transition name="slide-up">
        <div class="bg-white w-full max-w-md shadow-lg p-6 overflow-y-auto rounded-t-xl max-h-[90vh]" @click.stop>
          <!-- Header -->
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-2xl font-semibold text-gray-800">Agregar diseño</h2>
            <button @click="closeDrawer" class="text-gray-600 text-xl">×</button>
          </div>

          <!-- Formulario -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Título</label>
              <input v-model="title" type="text"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Título del diseño" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
              <textarea v-model="description"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Descripción del diseño"></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Imagen</label>
              <input @change="onFileChange" type="file" accept="image/*"
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Estilos (opcional)</label>
              <input v-model="stylesInput" type="text"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Separar estilos por coma: Realismo, Acuarela" />
            </div>

            <button :disabled="loading"
              class="w-full bg-purple-700 hover:bg-purple-800 text-white py-2 rounded-lg font-semibold flex items-center justify-center"
              @click="submitDesign">
              <span v-if="!loading">Guardar diseño</span>
              <span v-else>Cargando...</span>
            </button>

            <p v-if="errorMessage" class="text-red-600 text-sm text-center">{{ errorMessage }}</p>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'
import api from '../services/api'

const props = defineProps({
  visible: Boolean,
  section: { type: String, default: 'disponibles' } // para saber si es diseño o portafolio
})

const emit = defineEmits(['close', 'save'])

const title = ref('')
const description = ref('')
const file = ref(null)
const stylesInput = ref('')
const loading = ref(false)
const errorMessage = ref('')

function closeDrawer() {
  emit('close')
  resetForm()
}

function onFileChange(e) {
  file.value = e.target.files[0]
}

function resetForm() {
  title.value = ''
  description.value = ''
  file.value = null
  stylesInput.value = ''
  errorMessage.value = ''
}

async function submitDesign() {
  if (!title.value || !file.value) {
    errorMessage.value = 'El título y la imagen son obligatorios.'
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    const formData = new FormData()
    formData.append('name', title.value)
    formData.append('description', description.value)
    formData.append('styles', stylesInput.value.split(',').map(s => s.trim()).filter(s => s))
    formData.append('image', file.value)

    const endpoint = props.section === 'portafolio' ? '/designs/portfolio' : '/designs'
    const { data } = await api.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    emit('save', data)
    closeDrawer()
  } catch (err) {
    console.error('Error al subir diseño:', err)
    errorMessage.value = 'Hubo un error al subir el diseño.'
  } finally {
    loading.value = false
  }
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
