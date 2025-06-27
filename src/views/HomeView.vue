<template>
  <div class="flex items-center justify-center h-20 p-4 pt-8">
    <img src="/assets/Banner.png" />
  </div>
  <div class="relative" ref="sidebarRef">
    <SidebarButton @toggle="toggleSidebar" />
    <Sidebar :visible="showSidebar" />
  </div>
  <div class="flex items-center justify-center h-10">
    <Searchbar class="pl-2" @apply-filters="applyFilters" @search="searchTerm = $event" />
  </div>
  <div class="align-middle flex flex-wrap justify-center gap-4 pt-4">
    <CardFeed
      v-for="tattoo in tattooStore.filteredTattoos"
      :key="tattoo.id"
      :id="tattoo._id"
      :title="tattoo.title"
      :author="tattoo.author"
      :desc="tattoo.description"
      :image="tattoo.designURL"
      :styles="tattoo.styles || []"
      />
    </div>
  
  
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useTattooStore } from '../stores/DesignStore'
import { useFavoritesStore } from '../stores/FavoritesStore'
import Searchbar from '../components/Searchbar.vue'
import SidebarButton from '../components/SidebarButton.vue'
import Sidebar from '../components/Sidebar.vue'
import CardFeed from '../components/CardFeed.vue'

const tattooStore = useTattooStore()
const favoritesStore = useFavoritesStore()

const searchTerm = ref('')

// Sincronizar búsqueda con el store
watch(searchTerm, (val) => {
  tattooStore.searchQuery = val
})

// Aplicar filtros desde el drawer
function applyFilters({ cities, styles }) {
  tattooStore.cityFilters = cities
  tattooStore.styleFilters = styles
}
// Sidebar
const showSidebar = ref(false)
const sidebarRef = ref(null)
const toggleSidebar = () => {
  showSidebar.value = !showSidebar.value
}

const handleClickOutside = (event) => {
  if (showSidebar.value && sidebarRef.value && !sidebarRef.value.contains(event.target)) {
    showSidebar.value = false
  }
}

onMounted(async () => {
  document.addEventListener('click', handleClickOutside)
  await tattooStore.fetchTattoos()
  await favoritesStore.fetchFavorites() // 💡 Asegúrate de cargar los favoritos al inicio
})


onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>