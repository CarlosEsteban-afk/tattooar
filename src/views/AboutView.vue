<template>
    <button @click="$router.back()" class="absolute left-4 top-10 text-2xl z-10 cursor-pointer">
        ←
    </button>
    <div
        class="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md text-gray-800 flex flex-col min-h-screen text-center pt-15">
        <div class="flex-grow">
            <h2 class="text-2xl font-bold mb-8 ">Acerca de TattooAR</h2>
            <div class="mb-8">
                <h3 class="text-lg font-semibold mb-2">Créditos de Desarrollador</h3>
                <ul class="list-disc list-inside space-y-1">
                    <li>Carlos Peña</li>
                    <li>Benjamin Serrano</li>
                    <li>Camila Infante</li>
                    <li>Carlos Iturra</li>
                </ul>
            </div>

            <div class="mb-4">
                <p><span class="font-semibold">Versión:</span> 1.0.0</p>
            </div>
        </div>

        <!-- Footer -->
        <div class="space-y-4">
            <button
                @click="$router.push('/report')"
                class="w-full h-10 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors">
                Reportar incidente
            </button>
            <button
                @click="showModal = true"
                class="w-full h-10 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                Eliminar cuenta
            </button>
            <p class="text-sm text-gray-500 text-center mt-6">
                © 2025 TattooAR. Todos los derechos reservados.
            </p>
        </div>
    </div>

    <!-- Modal de confirmación -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h3 class="text-lg font-semibold mb-4">¿Estás seguro de que deseas eliminar tu cuenta?</h3>
            <p class="text-sm text-gray-600 mb-6">Esta acción no se puede deshacer.</p>
            <div class="flex justify-end space-x-4">
                <button
                    @click="showModal = false"
                    class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
                    Cancelar
                </button>
                <button
                    @click="confirmDelete"
                    class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                    Confirmar
                </button>
            </div>
        </div>
    </div>

    <TopBanner />
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import TopBanner from '../components/TopBanner.vue'

const router = useRouter()
const showModal = ref(false)

const confirmDelete = () => {
  // Aquí podrías llamar a una API para eliminar la cuenta si es necesario
  router.push({ name: 'Home' })
}
</script>
