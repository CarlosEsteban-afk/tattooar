<template>
    <div class="min-h-screen bg-gray-50 relative">
        <div class="container mx-auto px-4 pt-16 max-w-2xl">
            <!-- Header -->
            <div class="text-center relative">
                <button @click="$router.back()" class="absolute left-4 text-2xl z-10 cursor-pointer">
                    ←
                </button>
                <h1 class="text-xl font-bold text-gray-800">Reportar Problema</h1>
                <p class="text-gray-600 text-sm mb-2">Ayúdanos a mejorar TattooAR reportando cualquier problema técnico</p>
            </div>

            <div class="bg-white shadow-lg rounded-lg p-6 space-y-4">
                <!-- Issue Type -->
                <div class="space-y-2">
                    <label class="text-md py-1 font-semibold border-purple-800 text-gray-800">Tipo de Problema</label>
                    <select v-model="selectedIssueType" class="w-full text-sm p-2 border rounded">
                        <option disabled value="">Selecciona el tipo de problema</option>
                        <option v-for="type in issueTypes" :key="type" :value="type">{{ type }}</option>
                    </select>
                </div>

                <!-- Description -->
                <div class="space-y-1">
                    <label for="description" class="text-md font-semibold text-gray-800">Descripción del
                        Problema</label>
                    <textarea id="description" v-model="description"
                        placeholder="Describe detalladamente el problema que experimentaste..."
                        class="w-full text-sm min-h-[120px] p-2 border border-purple-800 rounded resize-none"></textarea>
                    <p class="text-xs text-gray-500">Incluye todos los detalles relevantes</p>
                </div>

                <!-- Screenshot Upload -->
                <div class="space-y-2">
                    <label class="text-md font-semibold text-gray-800">Captura de Pantalla (Opcional)</label>
                    <div
                        class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors cursor-pointer">
                        <div class="flex flex-col items-center space-y-2">
                            <div class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                                <Camera class="w-8 h-8 text-gray-400" />
                            </div>
                            <p class="text-gray-600">Adjuntar Imagen</p>
                            <button class="bg-purple-900 text-white px-4 py-1 rounded hover:bg-purple-700">
                                <Upload class="inline w-4 h-4 mr-2" />
                                Examinar
                            </button>
                        </div>
                    </div>
                    <p class="text-sm text-gray-500">Adjunta una captura de pantalla del problema si es posible</p>
                </div>

                <!-- Action Buttons -->
                <div class="flex flex-col sm:flex-row gap-4 pt-6">
                    <button @click="$router.back()"
                        class="flex-1 bg-purple-900 hover:bg-purple-00 text-white py-2 text-md font-semibold rounded">
                        Enviar Reporte
                    </button>
                    <button @click="$router.back()"
                        class="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 text-md font-semibold rounded">
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    </div>
    <TopBanner />
</template>

<script setup>
import { ref } from 'vue'
import { Camera, Upload } from 'lucide-vue-next'
import TopBanner from '../components/TopBanner.vue'


const issueTypes = [
    'Problema de carga',
    'Error de AR',
    'Fallo de cámara',
    'Problema de guardado',
    'Error de interfaz',
    'Otro',
]

const priorities = ['Baja', 'Media', 'Alta', 'Crítica']

const selectedIssueType = ref('')
const selectedPriority = ref('')
const description = ref('')
const steps = ref('')
const device = ref('')
const osVersion = ref('')
const appVersion = ref('1.0.0')
const email = ref('')

const submitReport = () => {
    // Lógica de envío del reporte
    console.log('Reporte enviado:', {
        selectedIssueType: selectedIssueType.value,
        selectedPriority: selectedPriority.value,
        description: description.value,
        steps: steps.value,
        device: device.value,
        osVersion: osVersion.value,
        appVersion: appVersion.value,
        email: email.value,
    })
}

const cancelReport = () => {
    // Lógica para cancelar y resetear el formulario
    selectedIssueType.value = ''
    selectedPriority.value = ''
    description.value = ''
    steps.value = ''
    device.value = ''
    osVersion.value = ''
    appVersion.value = '1.0.0'
    email.value = ''
}
</script>
