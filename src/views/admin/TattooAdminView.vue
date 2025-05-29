
<template>
  <div class="flex h-screen">
    <AdminSidebar @logout="logout" class="h-full" />

    <main class="pl-68 flex-1 bg-gray-50 p-6 overflow-y-auto">

        <Topbar title="Administración de Tatuajes" :notificationCount="3" />
      <br />

     <!-- <h1 class="text-2xl font-bold mb-4">Administración de Tatuajes</h1> --> 

      <!-- Barra de búsqueda -->
      <div class="flex items-center gap-2 mb-6">
        <input
          v-model="search"
          type="text"
          placeholder="Buscar tatuajes..."
          class="form-input w-full max-w-md rounded-lg border-gray-300 shadow-sm"
        />
        <button class="p-2 text-white bg-gray-500 rounded hover:bg-gray-600">
          <i class="fas fa-filter"></i>
        </button>
      </div>

      <!-- Grid de tarjetas -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <TattooCard
          v-for="tattoo in filteredTattoos"
          :key="tattoo.id"
          :title="tattoo.title"
          :author="tattoo.author"
          :filters="tattoo.filters"
          :date="tattoo.date"
           @delete="deleteTattoo(tattoo.id)"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import Sidebar from '../../components/Sidebar.vue'
import TattooCard from '../../components/TattooCard.vue'
import Topbar from '../../components/TopBar.vue'
import AdminSidebar from '../../components/AdminSidebar.vue'
import { ref, computed } from 'vue'

const search = ref("")

const deleteTattoo = (id) => {
  tattoos.value = tattoos.value.filter(t => t.id !== id)
}

const tattoos = ref([
  { id: 1, title: "Flor de loto.png", author: "María González", filters: ["floral", "colorido"], date: "2023-10-01" }, 
  { id: 2, title: "Dragón tribal.png", author: "Carlos Mendoza", filters: ["Tribal", "Dragón"], date: "2023-10-03" },
  { id: 3, title: "Mandala mano.png", author: "Laura Pérez", filters: ["mandala", "mano"], date: "2023-10-02" },
  { id: 4, title: "Lobo realista.png", author: "Javier Ruiz", filters: ["realista", "lobo"], date: "2023-10-04" },
  { id: 5, title: "Brújula viajera.png", author: "Ana Torres", filters: ["brújula", "viaje"], date: "2023-10-05" },
  { id: 6, title: "Tigre japonés.png", author: "Luis Soto", filters: ["japonés", "tigre"], date: "2023-10-06" },
  { id: 7, title: "Ojo de Horus.png", author: "Cecilia Díaz", filters: ["egipcio", "ojo"], date: "2023-10-07" },
  { id: 8, title: "Mariposa acuática.png", author: "Pedro Jiménez", filters: ["acuático", "mariposa"], date: "2023-10-08" },
  { id: 9, title: "Cráneo mexicano.png", author: "Sofía López", filters: ["mexicano", "cráneo"], date: "2023-10-09" },
  { id: 10, title: "Ángel guardián.png", author: "Andrés García", filters: ["ángel", "guardián"], date: "2023-10-10" }
])

const filteredTattoos = computed(() =>
  tattoos.value.filter(t =>
    t.title.toLowerCase().includes(search.value.toLowerCase())
  )
)
</script>
