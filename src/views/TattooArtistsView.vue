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
        <Searchbar class="p-4" />
      </div>
      <!-- Grid Section -->
      <div>
        <div class="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-2">
          <div
            v-for="(item, index) in tattooArtists"
            :key="'tatuador-' + index"
            class="relative cursor-pointer"
            @click="gotoArtistProfile(item.id)"
          >
            <img
              :src="item.image"
              :alt="item.title"
              class="object-cover w-full h-32 shadow-sm"
            />
            <p
              class="absolute bottom-1 left-1 text-white bg-black bg-opacity-50 px-2 rounded text-xs"
            >
              {{ item.title }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import TopBanner from '../components/TopBanner.vue'
import Searchbar from '../components/Searchbar.vue'

const router = useRouter()

const gotoArtistProfile = (id) => {
  router.push({ name: 'TattooProfile', params: { id } })
}

//Imágenes de ejemplo para el perfil del tatuador
const tattooArtists = [
  { id: 1, title: 'Tatuador 1', image: '/assets/artist1.jpg' },
  { id: 2, title: 'Tatuador 2', image: '/assets/artist2.jpg' },
  { id: 3, title: 'Tatuador 3', image: '/assets/artist3.jpg' },
  { id: 4, title: 'Tatuador 4', image: '/assets/artist4.jpg' },
  { id: 5, title: 'Tatuador 5', image: '/assets/artist5.jpg' },
  { id: 6, title: 'Tatuador 6', image: '/assets/artist6.jpg' },
  { id: 7, title: 'Tatuador 7', image: '/assets/artist7.jpg' },
  { id: 8, title: 'Tatuador 8', image: '/assets/artist8.jpg' },
  { id: 9, title: 'Tatuador 9', image: '/assets/artist9.jpg' },
  { id: 10, title: 'Tatuador 10', image: '/assets/artist10.jpg' },
  { id: 11, title: 'Tatuador 11', image: '/assets/artist11.jpg' },
  { id: 12, title: 'Tatuador 12', image: '/assets/artist12.jpg' },
]
</script>

<style scoped></style>
