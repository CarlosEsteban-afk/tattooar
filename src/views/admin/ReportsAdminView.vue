<template>
  <div class="flex h-screen">
    <AdminSidebar @logout="logout" class="h-full" />

    <main class="pl-68 flex-1 bg-gray-50 p-6 overflow-y-auto">
      <!-- Topbar aquí -->
      <Topbar title="Administración de Reportes" :notificationCount="3" />
      <br />

      <!-- <h1 class="text-2xl font-bold mb-4">Administración de Reportes</h1>-->

      <!-- Barra de búsqueda -->
      <div class="flex items-center gap-2 mb-6">
        <input
          v-model="search"
          type="text"
          placeholder="Buscar reporte..."
          class="form-input w-full max-w-md rounded-lg border-gray-300 shadow-sm"
        />
        <button class="p-2 text-white bg-gray-500 rounded hover:bg-gray-600">
          <i class="fas fa-filter"></i>
        </button>
      </div>

      <!-- Grid de tarjetas -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4"
      >
        <TattooCard
          v-for="tattoo in filteredTattoos"
          :key="tattoo.id"
          :title="tattoo.title"
          :author="tattoo.author"
          :description="tattoo.description"
          :filters="tattoo.filters"
          :date="tattoo.date"
        >
          <template #actions>
            <div class="flex flex-col items-start mb-2">
              <!-- Etiquetas -->
              <div class="flex mt-2 mb-2 gap-2">
               <span
        v-for="filter in tattoo.filters"
        :key="filter"
        class="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded"
      >
        {{ filter }}
      </span>
        
              </div>
              <!-- Botones de acción -->
              <button
                class="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs w-full"
                @click="acceptReport(tattoo.id)"
              >
                <div class="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-user-round-x-icon lucide-user-round-x"
                  >
                    <path d="M2 21a8 8 0 0 1 11.873-7" />
                    <circle cx="10" cy="8" r="5" />
                    <path d="m17 17 5 5" />
                    <path d="m22 17-5 5" />
                  </svg>
                  Suspender usuario
                </div>
              </button>
              <button
                class="mt-2 px-2 py-1 bg-yellow-400 text-gray-900 rounded hover:bg-yellow-500 text-xs w-full"
                @click="rejectReport(tattoo.id)"
              >
                <div class="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-pencil-off-icon lucide-pencil-off"
                  >
                    <path
                      d="m10 10-6.157 6.162a2 2 0 0 0-.5.833l-1.322 4.36a.5.5 0 0 0 .622.624l4.358-1.323a2 2 0 0 0 .83-.5L14 13.982"
                    />
                    <path
                      d="m12.829 7.172 4.359-4.346a1 1 0 1 1 3.986 3.986l-4.353 4.353"
                    />
                    <path d="m15 5 4 4" />
                    <path d="m2 2 20 20" />
                  </svg>
                  Suspender tatuaje
                </div>
              </button>
              <button
                class="mt-2 px-2 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 text-xs w-full"
                @click="rejectReport(tattoo.id)"
              >
                <div class="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-file-check-icon lucide-file-check"
                  >
                    <path
                      d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"
                    />
                    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                    <path d="m9 15 2 2 4-4" />
                  </svg>
                  Rechazar reporte
                </div>
              </button>
            </div>
          </template>
        </TattooCard>
      </div>
    </main>
  </div>
</template>

<script setup>
import Sidebar from "../../components/Sidebar.vue";
import TattooCard from "../../components/TattooCard.vue";
import Topbar from "../../components/TopBar.vue";
import AdminSidebar from "../../components/AdminSidebar.vue";
import { ref, computed } from "vue";

const search = ref("");

const deleteTattoo = (id) => {
  tattoos.value = tattoos.value.filter((t) => t.id !== id);
};

const tattoos = ref([
  {
    id: 1,
    title: "Flor de loto.png",
    author: "María González",
    description:
      "Tuvimos problemas con el contenido de esta imagen porque soy catolica",
    date: "2023-10-01",
    filters: ["Religioso", "Flor"]
  },
  {
    id: 2,
    title: "Dragón tribal.png",
    author: "Carlos Mendoza",
    description:
      "Este tatuaje infringe las normas de la comunidad por su simbolismo",
    date: "2023-10-02",
    filters: ["Tribal", "Dragón"]
  },
  {
    id: 3,
    title: "Mandala mano.png",
    author: "Laura Pérez",
    description:
      "Este tatuaje es ofensivo para algunas culturas y no es apropiado",
    date: "2023-10-03",
    filters: ["Mandala", "Mano"]
  },
  {
    id: 4,
    title: "Lobo realista.png",
    author: "Javier Ruiz",
    description: "Este tatuaje contiene contenido violento y no es aceptable",
    date: "2023-10-04",
    filters: ["Realista", "Lobo"]
  },
  {
    id: 5,
    title: "Brújula viajera.png",
    author: "Ana Torres",
    description: "Este tatuaje es inapropiado para nuestra comunidad",
    date: "2023-10-05",
    filters: ["Brújula", "Viaje"]
  },
  {
    id: 6,
    title: "Tigre japonés.png",
    author: "Luis Soto",
    description:
      "Este tatuaje infringe las normas de la comunidad por su simbolismo",
    date: "2023-10-06",
    filters: ["Japonés", "Tigre"]
  },
  {
    id: 7,
    title: "Ojo de Horus.png",
    author: "Cecilia Díaz",
    description:
      "Este tatuaje es ofensivo para algunas culturas y no es apropiado",
    date: "2023-10-07",
    filters: ["Egipcio", "Ojo"]
  },
]);

const filteredTattoos = computed(() =>
  tattoos.value.filter((t) =>
    t.title.toLowerCase().includes(search.value.toLowerCase())
  )
);
const acceptReport = (id) => {
  // Lógica para aceptar el reporte
  alert(`Reporte ${id} aceptado`);
};
const rejectReport = (id) => {
  // Lógica para rechazar el reporte
  tattoos.value = tattoos.value.filter((t) => t.id !== id);
  alert(`Reporte ${id} rechazado y eliminado`);
};
</script>





