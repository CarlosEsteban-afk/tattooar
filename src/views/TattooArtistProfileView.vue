<template>
  <button @click="$router.back()" class="absolute left-4 top-10 text-2xl z-10 cursor-pointer">←</button>
        <div class="flex flex-col h-screen items-center">
        <div class="w-full max-w-4xl">
  <div class="flex flex-col h-screen items-center">
    <div class="w-full h-auto items-center bg-cover pb-2 pt-16 shadow-md">
      <div class="flex flex-wrap items-start justify-center gap-6 px-4 pb-2">
        <!-- Avatar + Info -->
        <div class="flex flex-col min-[360px]:flex-row gap-4 items-start min-w-[300px] max-w-[500px] w-full relative">
          <!-- Alias + Avatar -->
          <div class="flex flex-col items-center min-[360px]:items-center">
            <h1 class="text-md font-semibold mb-2 text-center min-[360px]:text-left">{{ user?.fullName }}</h1>
            <div class="w-20 h-20">
              <img src="/assets/avatar.png" alt="Avatar" class="rounded-full w-20 h-20 object-cover" />
            </div>
          </div>

          <!-- Perfil Info -->
          <div class="flex flex-col flex-1 relative w-full">
            <!-- Estilos -->
            <div class="flex items-center justify-between">
              <p class="text-sm">Estilos</p>
              <button v-if="isOwnProfile" @click="openStyleDrawer" class="text-lg font-bold text-purple-600">+</button>
            </div>
            <div class="overflow-x-auto whitespace-nowrap scrollbar-hide w-full flex">
              <span v-for="(style, index) in selectedStyles" :key="index"
                class="inline-block bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
                {{ style }}
              </span>
            </div>

            <!-- Ciudad -->
            <div class="flex items-center justify-between mt-2">
              <p class="text-sm">Ciudad</p>
              <button v-if="isOwnProfile" @click="openCityDrawer" class="text-lg font-bold text-purple-600">+</button>
            </div>
            <div class="overflow-x-auto whitespace-nowrap scrollbar-hide mt-1 w-full flex">
              <span v-for="(city, index) in selectedCities" :key="'badge-' + index"
                class="inline-block bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-2">
                {{ city }}
              </span>
            </div>

            <!-- Contacto -->
            <div class="mt-2">
              <p class="text-sm pb-1">Contacto</p>
              <div class="flex items-center gap-1 flex-wrap">
                <div class="flex items-center gap-1 text-sm bg-purple-800 text-white pb-0.5 px-2 rounded-full">
                  <MessageCircle class="w-4 h-4" />
                  <span>WhatsApp</span>
                </div>
                <div class="flex items-center gap-1 text-sm bg-purple-800 text-white pb-0.5 px-2 rounded-full">
                  <Instagram class="w-4 h-4" />
                  <span>Instagram</span>
                </div>
                <div class="flex items-center pl-1 gap-1 rounded-full">
                  <button v-if="canReport" @click="showReportModal = true"
                    class="flex z-10 bottom-0 right-0 hover:bg-red-500 text-red-500 items-center justify-center transition"
                    title="Reportar usuario">
                    <Flag class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Botón desactivar -->
            <button v-if="userStore.isAdmin" @click="showDeactivateModal = true"
              class="absolute z-10 bottom-0 right-0 bg-red-300 hover:bg-red-700 text-red-600 rounded-full p-3 shadow-md flex items-center justify-center transition"
              title="Desactivar usuario">
              <UserRoundX class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- Contenido desplazable -->
          <!-- Scrollable content section -->
          <div class="flex-1 overflow-y-auto flex flex-col pt-4 w-full px-4 scrollbar-hide">
            <!-- Disponibles -->
            <div class="mb-4">
              <div class="flex flex-row justify-between items-center mb-2">
                <p class="font-bold text-base">Disponibles</p>
                <button v-if="isOwnProfile" class="text-xl font-bold" @click="openDrawerFor('disponibles')">+</button>
              </div>
              <div class="grid grid-cols-1 min-[360px]:grid-cols-3 gap-4 max-h-[18rem] overflow-y-auto scrollbar-hide">
                <div v-for="(item, index) in disponibles" :key="'disponible-' + index" class="relative">
                  <img :src="item.image" :alt="item.title" class="object-cover w-full h-32 rounded-lg shadow-md" />
                  <p class="absolute bottom-1 left-1 text-white bg-black bg-opacity-50 px-2 rounded text-xs">
                    {{ item.title }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Portafolio -->
            <div>
              <div class="flex flex-row justify-between items-center mb-2">
                <p class="font-bold text-base">Portafolio</p>
                <button v-if="isOwnProfile" class="text-xl font-bold" @click="openDrawerFor('portafolio')">+</button>
              </div>
              <div class="grid grid-cols-1 min-[360px]:grid-cols-3 gap-4 max-h-[18rem] overflow-y-auto scrollbar-hide">
                <div v-for="(item, index) in portafolio" :key="'portafolio-' + index" class="relative">
                  <img :src="item.image" :alt="item.title" class="object-cover w-full h-32 rounded-lg shadow-md" />
                  <p class="absolute bottom-1 left-1 text-white bg-black bg-opacity-50 px-2 rounded text-xs">
                    {{ item.title }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Componentes -->
  <TopBanner />
  <AddDesignDrawer :visible="showDrawer" @close="showDrawer = false" @save="addNewDesign" />
  <AddCityDrawer :visible="showCityDrawer" :initial="selectedCities" @close="showCityDrawer = false"
    @confirm="updateSelectedCities" />
  <AddStyleDrawer :visible="showStyleDrawer" v-model="selectedStyles" @close="showStyleDrawer = false" />

  <!-- Modal desactivación -->
  <div v-if="showDeactivateModal"
    class="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg p-4 w-80 max-w-md">
      <h2 class="text-xl font-semibold mb-4">¿Desactivar usuario?</h2>
      <p class="text-sm text-center text-gray-600 mb-6">
        Esta acción desactivará al usuario. Puede ser reactivado desde el panel de administración ¿Deseas continuar?
      </p>
      <div class="flex justify-end space-x-4">
        <button @click="showDeactivateModal = false" class="px-2 py-1 text-red-600 rounded hover:bg-gray-300">
          Cancelar
        </button>
        <button @click="confirmDeactivate" class="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700">
          Confirmar
        </button>
      </div>
    </div>
  </div>

  <!-- Modal reporte -->
  <div v-if="showReportModal" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg p-4 w-80 max-w-md">
      <h2 class="text-lg font-semibold mb-3">¿Reportar usuario?</h2>
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
        <button @click="confirmReport" class="px-4 py-1 bg-purple-900 text-sm text-white rounded hover:bg-red-700">
          Confirmar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from '../services/api'
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '../stores/UserStore'
import TopBanner from '../components/TopBanner.vue'
import AddDesignDrawer from '../components/AddDesignDrawer.vue'
import AddCityDrawer from '../components/AddCityDrawer.vue'
import AddStyleDrawer from '../components/AddStyleDrawer.vue'
import { UserRoundX, Instagram, MessageCircle, Flag } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const selectedStyles = ref([...userStore.user?.cities || []])
const selectedCities = ref([])

const showStyleDrawer = ref(false)
const showDrawer = ref(false)
const showCityDrawer = ref(false)
const showDeactivateModal = ref(false)
const showReportModal = ref(false)

const currentSection = ref('disponibles')

function openDrawerFor(section) {
  currentSection.value = section
  showDrawer.value = true
}

function updateSelectedCities(newCities) {
  selectedCities.value = [...newCities]

  if (userStore.user?.id) {
    api.put(`/users/me`, {
      cities: selectedCities.value,
    }).then(() => {
      console.log('Ciudades actualizadas')
      userStore.user.cities = selectedCities.value // 🔁 actualiza también el store
    }).catch(err => {
      console.log(api.defaults.headers)
      console.error('Error al actualizar ciudades', err)
    })
  }
}

function openCityDrawer() {
  showCityDrawer.value = true
}
function openStyleDrawer() {
  showStyleDrawer.value = true
}

function confirmDeactivate() {
  // Acción para desactivar usuario
}
function confirmReport() {
  // Acción para reportar usuario
}

function addNewDesign(design) {
  if (currentSection.value === 'disponibles') {
    disponibles.push(design)
  } else if (currentSection.value === 'portafolio') {
    portafolio.push(design)
  }
}

const isOwnProfile = computed(() => userStore.isTattooer && route.params.id == userStore.user?.id)
const canReport = computed(() => userStore.isAuthenticated && !userStore.isAdmin && route.params.id != userStore.user?.id)
const user = computed(() => userStore.user)

const disponibles = [
  { title: 'Disponible 1', image: '/assets/disponible1.jpg' },
  { title: 'Disponible 2', image: '/assets/disponible2.jpg' },
  { title: 'Disponible 3', image: '/assets/disponible3.jpg' },
  { title: 'Disponible 4', image: '/assets/disponible4.jpg' },
  { title: 'Disponible 5', image: '/assets/disponible5.jpg' },
  { title: 'Disponible 6', image: '/assets/disponible6.jpg' },
  { title: 'Disponible 7', image: '/assets/disponible7.jpg' },
  { title: 'Disponible 8', image: '/assets/disponible8.jpg' }
]

const portafolio = [
  { title: 'Portafolio 1', image: '/assets/portafolio1.jpg' },
  { title: 'Portafolio 2', image: '/assets/portafolio2.jpg' },
  { title: 'Portafolio 3', image: '/assets/portafolio3.jpg' },
  { title: 'Portafolio 4', image: '/assets/portafolio4.jpg' },
  { title: 'Portafolio 5', image: '/assets/portafolio5.jpg' },
  { title: 'Portafolio 6', image: '/assets/portafolio6.jpg' },
  { title: 'Portafolio 7', image: '/assets/portafolio7.jpg' },
  { title: 'Portafolio 8', image: '/assets/portafolio8.jpg' }
]
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
