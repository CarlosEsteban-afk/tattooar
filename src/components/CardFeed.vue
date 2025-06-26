<template>
    <div class="card overflow-hidden shadow bg-white">
        <div class="p-3 justify-between flex items-center">
            <button @click="goToProfile" class="flex items-center">
                <img src="/assets/avatar.png" alt="Avatar" class="rounded-full w-6 h-6" />
                <h2 class="text-xs text-gray-600 pl-2">{{ author }}</h2>
            </button>
            <div class="flex items-center pl-1 gap-1 rounded-full">
                <button @click="showReportModal = true"
                    class="flex bottom-0 right-0 hover:bg-red-500 text-red-500 items-center justify-center transition"
                    title="Reportar usuario">
                    <Flag class="w-4 h-4" />
                </button>
            </div>
        </div>
        <div class="relative bg-gray-200 flex items-center justify-center aspect-square w-full">
            <img :src="image" :alt="desc" class="" />
            <div @click="openARView" class="absolute top-2 right-2 bg-white border border-gray-300 rounded-full p-2 shadow hover:bg-gray-100 transition" title="Ver en AR">
                AR
            </div>
        </div>
        <div class="p-3 flex justify-between items-start">
            <div class="flex-1">
                <h2 class="text-sm font-semibold truncate">{{ title }}</h2>
                <p class="text-xs text-gray-600">{{ desc }}</p>
            </div>
            <button @click="toggleLike"
                class="flex items-center text-purple-900 hover:text-purple-700 transition ml-2 mt-1">
                <Heart class="w-4 h-4" :fill="isLiked ? 'currentColor' : 'none'"
                    :stroke="isLiked ? 'currentColor' : 'currentColor'" />
            </button>
        </div>

    </div>
    <!-- Modal reporte -->
    <div v-if="showReportModal"
        class="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center">
        <div class="bg-white rounded-lg shadow-lg p-4 w-80 max-w-md">
            <h2 class="text-lg font-semibold mb-3">¿Reportar imagen?</h2>
            <p class="text-sm text-gray-600 mb-2">
                Ingresa el motivo del reporte. Esta acción enviará una notificación al administrador.
            </p>
            <textarea
                class="w-full h-24 p-2 mb-2 text-md border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                placeholder="Escribe tu motivo aquí..."></textarea>
            <div class="flex justify-end space-x-4">
                <button @click="showReportModal = false" class="px-2 text-sm text-red-600 rounded hover:bg-gray-300">
                    Cancelar
                </button>
                <button @click="confirmReport"
                    class="px-4 py-1 bg-purple-900 text-sm text-white rounded hover:bg-red-700">
                    Confirmar
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { Flag, Heart } from 'lucide-vue-next'
import { useFavoritesStore } from '../stores/FavoritesStore';
import ARButton from './ARButton.vue';

const favoritesStore = useFavoritesStore()
const router = useRouter()

const isLiked = computed(() => favoritesStore.isFavorite(props.id))

const toggleLike = () => {
    favoritesStore.toggleFavorite(props.id)
}

const showReportModal = ref(false)
const confirmReport = () => {
    // Aquí puedes agregar la lógica para enviar el reporte al administrador
    console.log('Reporte enviado');
    showReportModal.value = false;
}

const goToProfile = () => {
    router.push({ name: 'TattooProfile', params: { id: props.id } })
}
const openARView = () => {
    router.push({ 
        name: 'ARView', 
        params: { id: props.id },
    })
}
const props = defineProps({
    id: {
        type: String,
        required: true
    },
    title: String,
    author: String,
    desc: {
        type: String,
        default: 'Descripción del tatuaje'
    },
    image: {
        type: String,
        default: '/assets/default-tattoo.jpg'
    }
})
</script>

<style scoped>
.card {
    width: 340px;
    height: fit-content;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    justify-self: center;
}
</style>