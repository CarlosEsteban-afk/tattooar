<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg sm:pl-64">
    <div class="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <!-- Main Content -->
      <div class="flex-1 overflow-auto w-full">
        <div class="p-4 md:p-4 pt-6 md:pt-6 sm:pt-6">
          <AdminSidebar @logout="logout" class="h-full" />

          <main class="flex-1 bg-gray-50 overflow-y-auto">
            <Topbar title="Administración de Tatuajes" :notificationCount="3" />
            <br />

            <!-- <h1 class="text-2xl font-bold mb-4">Administración de Tatuajes</h1> -->
            <div class="flex items-center gap-2 mb-6">
              <!-- Barra de búsqueda y filtro -->
              <div class="relative w-full max-w-md">
                <input
                  v-model="search"
                  type="text"
                  placeholder="Buscar tatuajes..."
                  class="form-input w-full rounded-lg border-gray-300 shadow-md bg-white text-gray-800 pr-10"
                />
                <span
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </span>
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
            <div class="grid grid-cols-4 gap-6">
              <TattooCard
                v-for="tattoo in filteredTattoos"
                :key="tattoo.id"
                :name="tattoo.name"
                :author="tattoo.author"
                :styles="tattoo.styles"
                :updatedAt="formatDate(tattoo.updatedAt)"
                :type="tattoo.type"
                :designURL="tattoo.designURL"
                :state="tattoo.state"
              >
                <template #actions>
                  <button
                    class="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200 w-full"
                    @click="goToProfile(tattoo.author._id)"
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
                    @click="suspendTattoo(tattoo._id)"
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
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRouter } from "vue-router";
import TattooCard from "../../components/TattooCard.vue";
import Topbar from "../../components/TopBar.vue";
import AdminSidebar from "../../components/AdminSidebar.vue";
import { ref, computed, onMounted } from "vue";
import TatuIMG from "../../assets/tatu.jpg";
import { useUserStore } from "../../stores/UserStore";
import api from "../../services/api";

const userStore = useUserStore();
const token = userStore.token;

const search = ref("");

const tattoos = ref([]);

onMounted(async () => {
  try {
    console.log("Token utilizado:", token);
    const response = await api.get("admin/designs", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Token utilizado:", token);
    tattoos.value = response.data;
    console.log("Tatuajes obtenidos:", tattoos.value);
  } catch (error) {
    console.error("Error al obtener los tatuajes:", error);
  }
});

const deleteTattoo = (id) => {
  tattoos.value = tattoos.value.filter((t) => t.id !== id);
};
const router = useRouter();

const goToProfile = (author) => {
  // Aquí puedes poner el id que desees, en este caso 1
  console.log("Ir al perfil del tatuador:", author);
  router.push({ name: "UserDetail", params: { id: author } });
};

const suspendTattoo = async (id) => {
console.log("entrando al metodo suspendTattoo con id:", id);
  try {
    await api.put(`/admin/designs/bantattoo/${id}`);
    // Vuelve a pedir la lista de tatuajes
    const response = await api.get("/admin/designs");
    tattoos.value = response.data;
  } catch (error) {
    console.error("Error al suspender el tatuaje:", error);
    alert("Error al suspender el tatuaje");
  }
};
/*const tat
toos = ref([
  {
    id: 1,
    name: "Flor de loto.png",
    author: "María González",
    styles: ["floral", "colorido"],
    updatedAt: "2023-10-01",
    type: "userReport",
    designURL: TatuIMG,
    state: "activo"
  },
  {
    id: 2,
    name: "Dragón tribal.png",
    author: "Carlos Mendoza",
    styles: ["Tribal", "Dragón"],
    updatedAt: "2023-10-03",
    type: "contact",
    designURL: TatuIMG,
    state: "activo"
  },
  {
    id: 3,
    name: "Mandala mano.png",
    author: "Laura Pérez",
    styles: ["mandala", "mano"],
    updatedAt: "2023-10-02",
    type: "reclaim",
    designURL: TatuIMG,
    state: "activo"
  },
  {
    id: 4,
    name: "Lobo realista.png",
    author: "Javier Ruiz",
    styles: ["realista", "lobo"],
    updatedAt: "2023-10-04",
    type: "userReport",
    designURL: TatuIMG,
    state: "activo"
  },
  {
    id: 5,
    name: "Brújula viajera.png",
    author: "Ana Torres",
    styles: ["brújula", "viaje"],
    updatedAt: "2023-10-05",
    type: "tattooReport",
    designURL: TatuIMG,
    state: "activo"
  },
  {
    id: 6,
    name: "Tigre japonés.png",
    author: "Luis Soto",
    styles: ["japonés", "tigre"],
    updatedAt: "2023-10-06",
    type: "reclaim",
    designURL: TatuIMG,
    state: "activo"
  },
  {
    id: 7,
    name: "Ojo de Horus.png",
    author: "Cecilia Díaz",
    styles: ["egipcio", "ojo"],
    updatedAt: "2023-10-07",
    type: "report",
    designURL: TatuIMG,
    state: "activo"
  },
  {
    id: 8,
    name: "Mariposa acuática.png",
    author: "Pedro Jiménez",
    styles: ["acuático", "mariposa"],
    updatedAt: "2023-10-08",
    type: "userReport",
    designURL: TatuIMG,
    state: "activo"
  },
  {
    id: 9,
    name: "Cráneo mexicano.png",
    author: "Sofía López",
    styles: ["mexicano", "cráneo"],
    updatedAt: "2023-10-09",
    type: "userReport",
    designURL: TatuIMG,
    state: "activo"
  },
  {
    id: 10,
    name: "Ángel guardián.png",
    author: "Andrés García",
    styles: ["ángel", "guardián"],
    updatedAt: "2023-10-10",
    type: "tattooReport",
    designURL: TatuIMG,
    state: "activo"
  },
]);
*/
const filterType = ref("");

const selectedFilters = ref([]);

// Obtener todos los filtros únicos
const allAvailableFilters = computed(() => {
  const all = tattoos.value.flatMap((t) => t.styles || []);
  return [...new Set(all)];
});

// Filtrado de tatuajes
const filteredTattoos = computed(() =>
  tattoos.value.filter(
    (t) =>
      t.name.toLowerCase().includes(search.value.toLowerCase()) &&
      (filterType.value === "" || t.type === filterType.value) &&
      (selectedFilters.value.length === 0 ||
        selectedFilters.value.every((f) => t.styles.includes(f)))
  )
);

const toggleFilter = (filter) => {
  if (selectedFilters.value.includes(filter)) {
    selectedFilters.value = selectedFilters.value.filter((f) => f !== filter);
  } else {
    selectedFilters.value = [...selectedFilters.value, filter];
  }
};

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
</script>
