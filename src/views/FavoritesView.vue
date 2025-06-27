<template>
  <button @click="$router.back()" class="absolute left-4 top-10 text-2xl z-10 cursor-pointer">←</button>

  <div class="flex flex-col h-screen items-center">
    <!-- Main Scrollable Content -->
    <div class="flex-1 overflow-y-auto flex flex-col pt-4 w-full px-4 max-w-6xl pt-15">
      <div class="flex flex-col justify-center">
        <p class="font-bold text-center">Tatuajes favoritos</p>
      </div>

      <!-- Grid Section -->
      <div class="mb-12 pt-4">
        <div class="grid grid-cols-3 gap-2 max-w-md mx-auto">
          <div v-for="(tattoo, index) in favoriteTattoos" :key="'favorite-' + index" class="relative cursor-pointer"
            @click="gotoArtistProfile(tattoo.id)">
            <img :src="tattoo.designURL" :alt="tattoo.name" class="object-cover aspect-square w-full shadow-sm" />
            <p class="absolute bottom-1 left-1 text-white bg-black bg-opacity-50 px-2 rounded text-xs">
              {{ tattoo.name }}
            </p>
          </div>

          <div v-if="favoritesStore.getFavorites().length === 0" class="col-span-3 text-center text-gray-500">
            No tienes tatuajes favoritos aún.
            <br />
            Explora y guarda tus diseños favoritos.

          </div>
        </div>
      </div>
    </div>
  </div>

  <TopBanner />
</template>

<script setup>
import { useRouter } from 'vue-router'
import TopBanner from '../components/TopBanner.vue'
import { useFavoritesStore } from '../stores/FavoritesStore'
import { useTattooStore } from '../stores/DesignStore'
import { computed } from 'vue'

const router = useRouter()
const favoritesStore = useFavoritesStore()
const tattooStore = useTattooStore()


const gotoArtistProfile = (id) => {
  router.push({ name: 'TattooProfile', params: { id } })
}


const favoriteTattoos = computed(() =>
  favoritesStore.getFavorites()
    .map(id => tattooStore.getTattooById(id))
    .filter(Boolean) // elimina los null o undefined
)

const openARView = (id) => {
  router.push({ name: 'ARView', params: { id } })
}

</script>
