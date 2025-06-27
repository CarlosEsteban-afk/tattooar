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
          <input
            v-model="search"
            type="text"
            placeholder="Buscar reportes..."
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
        <select
          v-model="filterType"
          class="bg-[#2E076B] text-white hover:bg-[#38158A] focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-7 py-2.5 text-center inline-flex items-center"
        >
          <option value="">Seleccione tipo de reporte</option>
          <option value="userReport">Reportes Usuario</option>
          <option value="tattooReport">Reportes Tatuaje</option>
          <option value="reclaim">Reclamos</option>
        </select>
      </div>

      <!-- Grid de tarjetas -->
      <div class="overflow-x-auto">
        <div class="grid grid-cols-4 gap-6">
          <TattooCard
            v-for="report in filteredReports"
            :key="report.id"
            :name="report.reason"
            :author="report.author"
            :user_id="report.reports_id"
            :description="report.description"
            :styles="report.styles"
            :updatedAt="formatDate(report.date)"
            :type="report.type"
            :designURL="report.designURL"
            :reportCount="report.reportCount"
            :state="report.state"
            class="max-w-xs w-full"
          >
            <template #actions>
              <div class="flex flex-col items-start mb-2">
                <div v-if="report.type === 'design'">
                  <!-- Botones de acción  Tatuaje-->
                  <div class="flex gap-1 mt-auto">
                    <button
                      v-if="report.state !== 'resuelto'"
                      class="flex items-center gap-1 px-1 py-0.5 bg-green-100 text-green-700 rounded text-[10px] hover:bg-green-200"
                      @click="resolveReport(report._id)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-check-icon lucide-check"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Resolver reporte
                    </button>
                    <button
                      v-else-if="report.state === 'resuelto'"
                      class="flex items-center gap-1 px-1 py-0.5 bg-gray-100 text-gray-700 rounded text-[10px] hover:bg-green-200"
                      @click="resolveReport(report._id)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-pencil-icon lucide-pencil"
                      >
                        <path
                          d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
                        />
                        <path d="m15 5 4 4" />
                      </svg>
                      Marcar pendiente
                    </button>
                    <button
                      class="flex items-center gap-1 px-1 py-0.5 bg-yellow-100 text-yellow-700 rounded text-[10px] hover:bg-yellow-200"
                      @click="suspendTattoo(report.reports_id)"
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
                    <button
                      class="flex items-center gap-1 px-1 py-0.5 bg-blue-100 text-blue-700 rounded text-[10px] hover:bg-blue-200 w-full"
                      @click="goToProfile(report.reports_id)"
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
                  </div>
                </div>

                <div v-else-if="report.type === 'tattooer'">
                  <!-- Botones de acción Reporte Usuario -->
                  <div class="flex gap-1 mt-auto">
                    <button
                      v-if="report.state !== 'resuelto'"
                      class="flex items-center gap-1 px-1 py-0.5 bg-green-100 text-green-700 rounded text-[10px] hover:bg-green-200"
                      @click="resolveReport(report._id)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-check-icon lucide-check"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Resolver reporte
                    </button>

                    <button
                      v-else-if="report.state === 'resuelto'"
                      class="flex items-center gap-1 px-1 py-0.5 bg-gray-100 text-gray-700 rounded text-[10px] hover:bg-green-200"
                      @click="resolveReport(report._id)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-pencil-icon lucide-pencil"
                      >
                        <path
                          d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
                        />
                        <path d="m15 5 4 4" />
                      </svg>
                      Marcar pendiente
                    </button>

                    <button
                      class="flex items-center gap-1 px-1 py-0.5 bg-yellow-100 text-yellow-700 rounded text-[10px] hover:bg-yellow-200"
                      @click="suspendTattooer(report.reports_id)"
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
                      Suspender tatuador
                    </button>
                    <button
                      class="flex items-center gap-1 px-1 py-0.5 bg-blue-100 text-blue-700 rounded text-[10px] hover:bg-blue-200 w-full"
                      @click="goToProfile(report.reports_id)"
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
                  </div>
                </div>
              </div>
            </template>
          </TattooCard>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import axios from "axios";
import TattooCard from "../../components/TattooCard.vue";
import Topbar from "../../components/TopBar.vue";
import AdminSidebar from "../../components/AdminSidebar.vue";
import { ref, computed, onMounted } from "vue";
import tatuadoraImg from "../../assets/tatuadora.jpg";
import doc from "../../assets/tatu.jpg";
import reclamo from "../../assets/reclamo.webp";

const reports = ref([]);
const router = useRouter();

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:4000/v1/reports/");
    const reportsData = response.data;
    // Para cada reporte, busca el nombre del usuario si hay user_id
    const reportsWithNames = await Promise.all(
      reportsData.map(async (report) => {
        if (report.user_id) {
          try {
            const userRes = await axios.get(`http://localhost:4000/v1/users/${report.user_id}`);
            return { ...report, author: userRes.data.fullName };
          } catch (e) {
            return { ...report, author: "Desconocido" };
          }
        } else {
          return { ...report, author: "Desconocido" };
        }
      })
    );
    reports.value = reportsWithNames;
    console.log("reportes obtenidos:", reports.value);
  } catch (error) {
    console.error("Error al obtener reportes:", error);
  }
});

const goToProfile = (author) => {
  // Aquí puedes poner el id que desees, en este caso 1
  console.log("Ir   al perfil del tatuador:", author);
  router.push({ name: "UserDetail", params: { id: author } });
};

const suspendTattoo = async (id) => {
  try {
    await axios.put("http://localhost:4000/v1/admin/designs/bantattoo/" + id);
    // Vuelve a pedir la lista de reportes
    console.log("Tatuaje suspendido con éxito:", id);
    const response = await axios.get("http://localhost:4000/v1/reports/");
    reports.value = response.data;
    alert("Cambio de estado de tatuaje realizado con éxito");
  } catch (error) {
    console.error("Error al suspender el tatuaje:", error);
    alert("Error al suspender el tatuaje");
  }
};

const suspendTattooer = async (id) => {
  try {
    await axios.put("http://localhost:4000/v1/admin/users/toggle-state/" + id);
    // Vuelve a pedir la lista de reportes
    console.log("Tatuador suspendido con éxito:", id);
    const response = await axios.get("http://localhost:4000/v1/reports/");
    reports.value = response.data;
    alert("Cambio de estado de tatuador realizado con éxito");
  } catch (error) {
    console.error("Error al suspender el tatuador:", error);
    alert("Error al suspender el tatuador");
  }
};


const resolveReport = async (id) => {
  try {
    await axios.put("http://localhost:4000/v1/reports/updateReport/" + id);
    console.log("estado reporte cambiado con éxito:", id);
    // Vuelve a pedir la lista de reportes
    const response = await axios.get("http://localhost:4000/v1/reports/");
    reports.value = response.data;
    alert("Cambio de estado de reporte realizado con éxito");
  } catch (error) {
    console.error("Error al resolver el reporte:", error);
    alert("Error al resolver el reporte");
  }
};

/*
const reports = ref([
  {
    id: 1,
    reason: "Flor de loto.png",
    author: "María González",
    description: "Tuvimos problemas con el contenido de esta imagen porque soy catolica",
    styles: ["Religioso", "Flor"],
    updatedAt: "2023-10-01",
    type: "design",
    designURL: doc,
    reportCount: 2,
    state: "pending",
    
  },
  {
    id: 2,
    reason: "Raquelota125",
    author: "Carlos Mendoza",
    description: "Esta tatuadora infringe las normas de la comunidad por su simbolismo",
    styles: [],
    updatedAt: "2023-10-02",
    type: "tattooer",
    designURL: tatuadoraImg,
    reportCount: 1,
    state: "pending"
  },
  {
    id: 3,
    reason: "Busco empleo con ustedes",
    author: "Laura Pérez",
    description: "Hola, me gustaría trabajar con ustedes como tatuadora",
    styles: [],
    updatedAt: "2023-10-03",
    type: "claim",
    designURL: doc,
    reportCount: 3,
    state: "resolved",
  },
  {
    id: 4,
    reason: "Bug Encontrado",
    author: "Javier Ruiz",
    description: "Se ha encontrado un bug en la aplicación",
    styles: [],
    updatedAt: "2023-10-04",
    type: "reclaim",
    designURL: reclamo,
    reportCount: 1,
    state: "rejected"
  },
  {
    id: 5,
    name: "Brújula viajera.png",
    author: "Ana Torres",
    description: "Este tatuaje es inapropiado para nuestra comunidad",
    styles: ["Brújula", "Viaje"],
    updatedAt: "2023-10-05",
    type: "tattooReport",
    designURL: doc,
    reportCount: 2,
    state: "rejected"
  },
  {
    id: 6,
    name: "Tigre japonés.png",
    author: "Luis Soto",
    description: "Este tatuaje infringe las normas de la comunidad por su simbolismo",
    styles: ["Japonés", "Tigre"],
    updatedAt: "2023-10-06",
    type: "tattooReport",
    designURL: doc,
    reportCount: 1,
    state: "resolved"
  },
  {
    id: 7,
    name: "Ojo de Horus.png",
    author: "Cecilia Díaz",
    description: "Este tatuaje es ofensivo para algunas culturas y no es apropiado",
    styles: ["Egipcio", "Ojo"],
    updatedAt: "2023-10-07",
    type: "tattooReport",
    designURL: doc,
    reportCount: 4,
    state: "pending"
  },
]);
*/
const filterType = ref("");
const search = ref("");
const selectedFilters = ref([]);

const allAvailableFilters = computed(() => {
  const all = reports.value.flatMap((r) => r.styles || []);
  return [...new Set(all)];
});

const filteredReports = computed(() =>
  reports.value.filter(
    (r) =>
      r.reason &&
      r.reason.toLowerCase().includes(search.value.toLowerCase()) &&
      (filterType.value === "" || r.type === filterType.value) &&
      (selectedFilters.value.length === 0 ||
        selectedFilters.value.every((f) => r.styles.includes(f)))
  )
);

const toggleFilter = (filter) => {
  if (selectedFilters.value.includes(filter)) {
    selectedFilters.value = selectedFilters.value.filter((f) => f !== filter);
  } else {
    selectedFilters.value = [...selectedFilters.value, filter];
  }
};

const acceptReport = (id) => {
  // Lógica para aceptar el reporte
  alert(`Reporte ${id} aceptado`);
};
const rejectReport = (id) => {
  // Lógica para rechazar el reporte
  tattoos.value = tattoos.value.filter((t) => t.id !== id);
  alert(`Reporte ${id} rechazado y eliminado`);
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
