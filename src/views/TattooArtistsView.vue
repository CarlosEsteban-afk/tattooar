<template>
  <TopBanner />
  <button @click="$router.back()" class="absolute left-4 top-10 text-2xl z-10 cursor-pointer">
    ←
  </button>
  <div>
    <!-- Main Scrollable Content -->
    <div class="overflow-y-auto w-full px-4 max-w-6xl pt-15">
      <!-- Tatuadores Section -->
      <div class="flex flex-col justify-center">
        <p class="font-bold text-center">Tatuadores</p>
        <Searchbar class="p-4" @search="fetchTattooers" />
      </div>
      <!-- Grid Section -->
      <div>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          <div
            v-for="(item, index) in tattooArtists"
            :key="'tatuador-' + index"
            class="relative cursor-pointer"
            @click="gotoArtistProfile(item._id)"
          >
            <img
              :src="item.profileImageUrl || '/assets/avatar.png'"
              :alt="item.username"
              class="object-cover w-full h-32 shadow-sm"
            />
            <p
              class="absolute bottom-1 left-1 text-white bg-black bg-opacity-50 px-2 rounded text-xs"
            >
              {{ item.username }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import TopBanner from '../components/TopBanner.vue'
import Searchbar from '../components/Searchbar.vue'
import api from '../services/api'

const router = useRouter()
const tattooArtists = ref([])

const gotoArtistProfile = (id) => {
  router.push({ name: 'TattooProfile', params: { id } })
}

const fetchTattooers = async (search = '') => {
  try {
    const { data } = await api.get('/users/tattooers', {
      params: { search }
    })
    tattooArtists.value = data
  } catch (error) {
    console.error('Error al cargar tatuadores:', error)
  }
}

onMounted(() => {
  fetchTattooers()
})
</script>

<style scoped>
/* Puedes agregar estilos para la grid si deseas */
</style>
Z