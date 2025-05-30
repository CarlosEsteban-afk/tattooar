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
        <div class="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 gap-2">
          <div
            v-for="(item, index) in favoritesStore.favorites"
            :key="'favorite-' + index"
            class="relative cursor-pointer"
            @click="gotoArtistProfile(item.author.id)"
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

  <TopBanner />
</template>

<script setup>
import { useRouter } from 'vue-router'
import TopBanner from '../components/TopBanner.vue'
import { useFavoritesStore } from '../stores/FavoritesStore'

const router = useRouter()
const favoritesStore = useFavoritesStore()

const gotoArtistProfile = (id) => {
  router.push({ name: 'TattooProfile', params: { id } })
}
</script>
