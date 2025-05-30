<template>
  <div class="flex h-screen">
    <AdminSidebar @logout="logout" class="h-full" />

    <main class="pl-68 flex-1 bg-gray-50 p-6 overflow-y-auto">
      <Topbar title="Administración de Tatuajes" :notificationCount="3" />
      <br />

      <!-- <h1 class="text-2xl font-bold mb-4">Administración de Tatuajes</h1> -->
      <div class="flex items-center gap-2 mb-6">
        <!-- Barra de búsqueda y filtro -->
        <div class="">
          <input
            v-model="search"
            type="text"
            placeholder="Buscar tatuajes..."
            class="form-input w-80 max-w-md rounded-lg border-gray-300 shadow-sm"
          />
        </div>
        <!-- dropdown menuuu-->
        <button
          id="dropdownBgHoverButton"
          data-dropdown-toggle="dropdownBgHover"
          class="bg-[#2E076B] text-white hover:bg-[#38158A] focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          type="button"
        >
          Filtros por etiquetas
          <svg
            class="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        <!-- Dropdown menu -->
        <div
          id="dropdownBgHover"
          class="z-10 hidden w-48 bg-white rounded-lg shadow-sm dark:bg-gray-700"
        >
          <ul
            class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownBgHoverButton"
          >
            <li v-for="filter in allAvailableFilters" :key="filter">
              <div
                class="flex items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <input
                  type="checkbox"
                  :id="'checkbox-item-' + filter"
                  :value="filter"
                  class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  :checked="selectedFilters.includes(filter)"
                  @change="toggleFilter(filter)"
                />
                <label
                  :for="'checkbox-item-' + filter"
                  class="w-full ms-2 text-sm font-medium text-gray-900 rounded-sm dark:text-gray-300"
                >
                  {{ filter }}
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- Grid de tarjetas -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <TattooCard
          v-for="tattoo in filteredTattoos"
          :key="tattoo.id"
          :title="tattoo.title"
          :author="tattoo.author"
          :filters="tattoo.filters"
          :date="tattoo.date"
        >
          <template #actions>
            <button
              class="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200 w-full"
              @click="goToProfile(tattoo.author)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path
                  d="M12 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z"
                />
              </svg>
              Ir a perfil tatuador
            </button>
            <button
              class="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs hover:bg-yellow-200 w-full mt-2"
              @click="suspendTattoo(tattoo.id)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m4.9 4.9 14.2 14.2" />
              </svg>
              Suspender tatuaje
            </button>
          </template>
        </TattooCard>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import Sidebar from "../../components/Sidebar.vue";
import TattooCard from "../../components/TattooCard.vue";
import Topbar from "../../components/TopBar.vue";
import AdminSidebar from "../../components/AdminSidebar.vue";
import { ref, computed } from "vue";

const search = ref("");

const deleteTattoo = (id) => {
  tattoos.value = tattoos.value.filter((t) => t.id !== id);
};
const router = useRouter();

const goToProfile = (author) => {
  // Aquí puedes poner el id que desees, en este caso 1
  router.push({ name: "UserDetail", params: { id: 1 } });
};
const suspendTattoo = (id) => {
  deleteTattoo(id);
  alert(`Tatuaje ${id} suspendido`);
};
const tattoos = ref([
  {
    id: 1,
    title: "Flor de loto.png",
    author: "María González",
    filters: ["floral", "colorido"],
    date: "2023-10-01",
    type: "userReport",
  },
  {
    id: 2,
    title: "Dragón tribal.png",
    author: "Carlos Mendoza",
    filters: ["Tribal", "Dragón"],
    date: "2023-10-03",
    type: "contact",
  },
  {
    id: 3,
    title: "Mandala mano.png",
    author: "Laura Pérez",
    filters: ["mandala", "mano"],
    date: "2023-10-02",
    type: "reclaim",
  },
  {
    id: 4,
    title: "Lobo realista.png",
    author: "Javier Ruiz",
    filters: ["realista", "lobo"],
    date: "2023-10-04",
    type: "userReport",
  },
  {
    id: 5,
    title: "Brújula viajera.png",
    author: "Ana Torres",
    filters: ["brújula", "viaje"],
    date: "2023-10-05",
    type: "tattooReport",
  },
  {
    id: 6,
    title: "Tigre japonés.png",
    author: "Luis Soto",
    filters: ["japonés", "tigre"],
    date: "2023-10-06",
    type: "reclaim",
  },
  {
    id: 7,
    title: "Ojo de Horus.png",
    author: "Cecilia Díaz",
    filters: ["egipcio", "ojo"],
    date: "2023-10-07",
    type: "report",
  },
  {
    id: 8,
    title: "Mariposa acuática.png",
    author: "Pedro Jiménez",
    filters: ["acuático", "mariposa"],
    date: "2023-10-08",
    type: "userReport",
  },
  {
    id: 9,
    title: "Cráneo mexicano.png",
    author: "Sofía López",
    filters: ["mexicano", "cráneo"],
    date: "2023-10-09",
    type: "userReport",
  },
  {
    id: 10,
    title: "Ángel guardián.png",
    author: "Andrés García",
    filters: ["ángel", "guardián"],
    date: "2023-10-10",
    type: "tattooReport",
  },
]);
const filterType = ref("");

const selectedFilters = ref([]);

// Obtener todos los filtros únicos
const allAvailableFilters = computed(() => {
  const all = tattoos.value.flatMap((t) => t.filters || []);
  return [...new Set(all)];
});

// Filtrado de tatuajes
const filteredTattoos = computed(() =>
  tattoos.value.filter(
    (t) =>
      t.title.toLowerCase().includes(search.value.toLowerCase()) &&
      (filterType.value === "" || t.type === filterType.value) &&
      (selectedFilters.value.length === 0 ||
        selectedFilters.value.every((f) => t.filters.includes(f)))
  )
);

const toggleFilter = (filter) => {
  if (selectedFilters.value.includes(filter)) {
    selectedFilters.value = selectedFilters.value.filter((f) => f !== filter);
  } else {
    selectedFilters.value = [...selectedFilters.value, filter];
  }
};
</script>
