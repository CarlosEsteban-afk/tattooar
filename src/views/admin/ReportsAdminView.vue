<template>
  <div class="flex h-screen">
    <AdminSidebar @logout="logout" class="h-full" />

    <main class="pl-68 flex-1 bg-gray-50 p-6 overflow-y-auto">
      <!-- Topbar aquí -->
      <Topbar title="Administración de Reportes" :notificationCount="3" />
      <br />

      <!-- <h1 class="text-2xl font-bold mb-4">Administración de Reportes</h1>-->

      <!-- Barra de búsqueda y filtro -->
      <div class="flex items-center gap-2 mb-6">
        <div class="relative w-full max-w-md">
          <input v-model="search" type="text" placeholder="Buscar reportes..."
            class="form-input w-full rounded-lg border-gray-300 shadow-md bg-white text-gray-800 pr-10" />
          <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
        </div>
        <select v-model="filterType"
          class="bg-[#2E076B] text-white hover:bg-[#38158A] focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-7 py-2.5 text-center inline-flex items-center">
          <option value="">Seleccione tipo de reporte</option>
          <option value="userReport">Reportes Usuario</option>
          <option value="tattooReport">Reportes Tatuaje</option>
          <option value="contact">Solicitudes de contacto</option>
          <option value="reclaim">Reclamos</option>
        </select>
      </div>

      <!-- Grid de tarjetas -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <TattooCard v-for="tattoo in filteredTattoos" :key="tattoo.id" :title="tattoo.title" :author="tattoo.author"
          :description="tattoo.description" :filters="tattoo.filters" :date="tattoo.date" :type="tattoo.type"
          :img="tattoo.tatuImg">
          <template #actions>
            <div class="flex flex-col items-start mb-2">

              <!-- Botones de acción -->
              <div class="flex gap-2 mt-auto">
                <button
                  class="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path d="M18 6L6 18" />
                    <path d="M6 6l12 12" />
                  </svg>
                  Suspender usuario
                </button>
                <button
                  class="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs hover:bg-yellow-200"
                  @click="$emit('delete')">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="m4.9 4.9 14.2 14.2" />
                  </svg>
                  Suspender tatuaje
                </button>
                <button
                  class="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Rechazar reporte
                </button>
              </div>

            </div>
          </template>
        </TattooCard>
      </div>
    </main>
  </div>
</template>

<script setup>
import TattooCard from "../../components/TattooCard.vue";
import Topbar from "../../components/TopBar.vue";
import AdminSidebar from "../../components/AdminSidebar.vue";
import { ref, computed } from "vue";
import tatuadoraImg from "../../assets/tatuadora.jpg";
import doc from "../../assets/doc.png";
import reclamo from "../../assets/reclamo.webp";
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
    filters: ["Religioso", "Flor"],
    type: "userReport",
  },
  {
    id: 2,
    title: "Raquelota125",
    author: "Carlos Mendoza",
    description:
      "Esta tatuadora infringe las normas de la comunidad por su simbolismo",
    date: "2023-10-02",
    type: "contact",
    tatuImg: tatuadoraImg,
  },
  {
    id: 3,
    title: "Busco empleo con ustedes",
    author: "Laura Pérez",
    description: " Hola, me gustaría trabajar con ustedes como tatuadora",
    date: "2023-10-03",
    type: "reclaim",
    tatuImg: doc,
  },
  {
    id: 4,
    title: "Bug Encontrado",
    author: "Javier Ruiz",
    description: "Se ha encontrado un bug en la aplicación",
    date: "2023-10-04",
    type: "userReport",
    tatuImg: reclamo,
  },
  {
    id: 5,
    title: "Brújula viajera.png",
    author: "Ana Torres",
    description: "Este tatuaje es inapropiado para nuestra comunidad",
    date: "2023-10-05",
    filters: ["Brújula", "Viaje"],
    type: "tattooReport",
  },
  {
    id: 6,
    title: "Tigre japonés.png",
    author: "Luis Soto",
    description:
      "Este tatuaje infringe las normas de la comunidad por su simbolismo",
    date: "2023-10-06",
    filters: ["Japonés", "Tigre"],
    type: "reclaim",
  },
  {
    id: 7,
    title: "Ojo de Horus.png",
    author: "Cecilia Díaz",
    description:
      "Este tatuaje es ofensivo para algunas culturas y no es apropiado",
    date: "2023-10-07",
    filters: ["Egipcio", "Ojo"],
    type: "report",
  },
]);

const filterType = ref("");
const filteredTattoos = computed(() =>
  tattoos.value.filter(
    (t) =>
      t.title.toLowerCase().includes(search.value.toLowerCase()) &&
      (filterType.value === "" || t.type === filterType.value)
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
