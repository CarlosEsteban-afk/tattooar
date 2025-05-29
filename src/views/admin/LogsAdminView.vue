<template>
  <div class="flex h-screen">
    <Sidebar />

    <main class="flex-1 bg-gray-50 p-6 overflow-y-auto">

         <Topbar title="Visualización de logs" :notificationCount="3" />
      <br />
       <!-- <h1 class="text-2xl font-bold mb-4">Visualización de logs</h1>--> 

      <!-- Barra de búsqueda -->
      <div class="flex items-center gap-2 mb-6">
        <input
          v-model="search"
          type="text"
          placeholder="Buscar Logs..."
          class="form-input w-full max-w-md rounded-lg border-gray-300 shadow-sm"
        />
        <button class="p-2 text-white bg-gray-500 rounded hover:bg-gray-600">
          <i class="fas fa-filter"></i>
        </button>
      </div>

      <!-- Grid de tarjetas -->
      

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Descripción
                </th>
                <th scope="col" class="px-6 py-3">
                    Autor
                </th>
                <th scope="col" class="px-6 py-3">
                    Fecha
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="log in filteredLogs" :key="log.id"
                class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{ log.title }}
                </th>
                <td class="px-6 py-4">
                    {{ log.author }}
                </td>
                <td class="px-6 py-4">
                    {{ log.date }}
                </td>
            </tr>
        </tbody>
    </table>
</div>

    </main>
  </div>
</template>

<script setup>
import Sidebar from '../../components/Sidebar.vue'
import Topbar from '../../components/TopBar.vue'
import { ref, computed } from 'vue'

const search = ref("")

const logs = ref([
  { id: 1, title: "Inicio de sesión exitoso", author: "admin@tattooar.cl", date: "2025-05-20 10:00" },
  { id: 2, title: "Usuario 'tattoo_juan' creado", author: "superadmin", date: "2025-05-20 10:30" },
  { id: 3, title: "Se eliminó el tatuaje 'Águila realista'", author: "admin_maria", date: "2025-05-20 11:15" },
  { id: 4, title: "Cambio de contraseña para 'cliente123'", author: "sistema", date: "2025-05-20 11:45" },
  { id: 5, title: "Actualización de perfil: tattoo_luna", author: "tattoo_luna", date: "2025-05-20 12:00" },
  { id: 6, title: "Intento fallido de login", author: "192.168.1.44", date: "2025-05-20 12:10" },
  { id: 7, title: "Nuevo tatuaje subido: 'Rosa negra'", author: "tattoo_ana", date: "2025-05-20 13:00" },
  { id: 8, title: "Rol actualizado: tattoo_miguel -> admin", author: "superadmin", date: "2025-05-20 13:20" },
  { id: 9, title: "Usuario 'cliente_pepe' desactivado", author: "admin_lucia", date: "2025-05-20 14:00" },
  { id: 10, title: "Inicio de sesión exitoso", author: "tattoo_camila", date: "2025-05-20 14:30" }
])


// Busqueda de logs
const filteredLogs = computed(() =>
  logs.value.filter(t =>
    t.title.toLowerCase().includes(search.value.toLowerCase())
  )
)
</script>