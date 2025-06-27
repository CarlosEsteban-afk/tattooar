<template>
  <button @click="$router.back()" class="absolute left-4 top-10 text-2xl z-10 cursor-pointer">←</button>

  <div class="flex flex-col h-screen items-center">

    <div class="flex-1 overflow-y-auto flex flex-col pt-4 w-full px-4 max-w-6xl pt-15">
      <div class="flex flex-col justify-center items-center">
        <p class="font-bold text-center">Tatuadores</p>
        <Searchbar class="p-4" @apply-filters="applyFilters" @search="searchTerm = $event" />
      </div>

      <div class="mb-12 pt-4">
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-w-md mx-auto">
          <div
            v-for="(item, index) in tattooArtists"
            :key="'tatuador-' + index"
            class="relative cursor-pointer"
            @click="gotoArtistProfile(item._id)"
          >
            <img
              :src="item.profileImageUrl || '/assets/avatar.png'"
              :alt="item.username"
              class="object-cover aspect-square w-full shadow-sm"
            />
            <p class="absolute bottom-1 left-1 text-white bg-black bg-opacity-50 px-2 rounded text-xs">
              {{ item.username }}
            </p>
          </div>

          <div v-if="tattooArtists.length === 0" class="col-span-3 text-center text-gray-500">
            No se encontraron tatuadores.
            <br />
            Ajusta tu búsqueda o filtros.
          </div>
        </div>
      </div>
    </div>
  </div>
  <TopBanner />
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import TopBanner from '../components/TopBanner.vue';
import Searchbar from '../components/Searchbar.vue';
import api from '../services/api';

const router = useRouter();
const tattooArtists = ref([]);

const searchTerm = ref('');
const cityFilters = ref([]);
const styleFilters = ref([]);

const gotoArtistProfile = (id) => {
  router.push({ name: 'TattooProfile', params: { id } });
};

const fetchTattooers = async () => {
  try {
    const { data } = await api.get('/users/tattooers', {
      params: {
        search: searchTerm.value,
        city: cityFilters.value.length ? cityFilters.value[0] : undefined, // puedes adaptarlo si quieres enviar múltiples
        style: styleFilters.value.length ? styleFilters.value[0] : undefined,
      }
    });
    tattooArtists.value = data;
  } catch (error) {
    console.error('Error al cargar tatuadores:', error);
  }
};

// Reacciona a cambios en búsqueda
watch(searchTerm, () => {
  fetchTattooers();
});

// Función para aplicar filtros desde el Searchbar
const applyFilters = ({ cities, styles }) => {
  cityFilters.value = cities;
  styleFilters.value = styles;
  fetchTattooers();
};

onMounted(() => {
  fetchTattooers();
});
</script>


<style scoped>
/* Puedes agregar estilos para la grid si deseas */
</style>
