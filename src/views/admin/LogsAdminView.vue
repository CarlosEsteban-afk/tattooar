<template>
  <div class="flex min-h-screen bg-gray-50">
    <AdminSidebar @logout="logout" class="h-full" />
    <main class="pl-68 flex-1 bg-gray-50 p-6 overflow-y-auto">
      <Topbar title="Visualización de Logs" :notificationCount="3" />
      <br />
      <!-- Barra de búsqueda -->
      <div class="flex items-center gap-2 mb-6">
        <div class="relative w-full max-w-md">
          <input v-model="search" type="text" placeholder="Buscar logs..."
            class="form-input w-full rounded-lg border-gray-300 shadow-md bg-white text-gray-800 pr-10" />
          <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
        </div>
      </div>

      <!-- Tabla de logs estilo AdminUsersView -->
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-300 bg-white">
        <table class="w-full text-sm text-left text-black font-semibold">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 font-bold">
            <tr>
              <th scope="col" class="px-6 py-3">Descripción</th>
              <th scope="col" class="px-6 py-3">Autor</th>
              <th scope="col" class="px-6 py-3">Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in filteredLogs" :key="log.id"
              class="odd:bg-white even:bg-gray-50 border-b border-gray-200 hover:bg-purple-50 transition">
              <td class="px-6 py-4 font-bold text-gray-900 whitespace-nowrap">
                {{ log.description }}
              </td>
              <td class="px-6 py-4 text-gray-800">
                {{ log.user?.fullName || 'Desconocido' }}
              </td>
              
              <td class="px-6 py-4 text-gray-800">
                {{ formatDate(log.timestamp) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup>
import axios from "axios";
import Topbar from '../../components/TopBar.vue'
import AdminSidebar from '../../components/AdminSidebar.vue'
import { ref, computed, onMounted } from 'vue'

const search = ref("")

const logs = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:4000/v1/logs/");
    logs.value = response.data;
    console.log("Logs obtenidos:", logs.value);
  } catch (error) {
    console.error("Error al obtener logs:", error);
  }
});



function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
/*
const logs = ref([
  { id: 1, description: "Inicio de sesión exitoso", user: "admin@tattooar.cl", timestamp: "2025-05-20 10:00" },
  { id: 2, description: "Usuario 'tattoo_juan' creado", user: "superadmin", timestamp: "2025-05-20 10:30" },
  { id: 3, description: "Se eliminó el tatuaje 'Águila realista'", user: "admin_maria", timestamp: "2025-05-20 11:15" },
  { id: 4, description: "Cambio de contraseña para 'cliente123'", user: "sistema", timestamp: "2025-05-20 11:45" },
  { id: 5, description: "Actualización de perfil: tattoo_luna", user: "tattoo_luna", timestamp: "2025-05-20 12:00" },
  { id: 6, description: "Intento fallido de login", user: "192.168.1.44", timestamp: "2025-05-20 12:10" },
  { id: 7, description: "Nuevo tatuaje subido: 'Rosa negra'", user: "tattoo_ana", timestamp: "2025-05-20 13:00" },
  { id: 8, description: "Rol actualizado: tattoo_miguel -> admin", user: "superadmin", timestamp: "2025-05-20 13:20" },
  { id: 9, description: "Usuario 'cliente_pepe' desactivado", user: "admin_lucia", timestamp: "2025-05-20 14:00" },
  { id: 10, description: "Inicio de sesión exitoso", user: "tattoo_camila", timestamp: "2025-05-20 14:30" }
])
*/

// Busqueda de logs
const filteredLogs = computed(() =>
  logs.value.filter(t =>
    t.description.toLowerCase().includes(search.value.toLowerCase())
  )
)
</script>
