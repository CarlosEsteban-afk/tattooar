<template>
  <div class="flex h-screen">
    <Sidebar />

    <main class="flex-1 bg-gray-50 p-6 overflow-y-auto">
      <h1 class="text-2xl font-bold mb-4">Administración de Tatuajes</h1>

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
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import Sidebar from '../../components/Sidebar.vue'
import TattooCard from '../../components/TattooCard.vue'
import { ref, computed } from 'vue'

const search = ref("")

const tattoos = ref([
  { id: 1, title: "Flor de loto.png", author: "María González" },
  { id: 2, title: "Dragón tribal.png", author: "Carlos Mendoza" },
  { id: 3, title: "Mandala mano.png", author: "Laura Pérez" },
  { id: 4, title: "Lobo realista.png", author: "Javier Ruiz" },
  { id: 5, title: "Brújula viajera.png", author: "Ana Torres" },
  { id: 6, title: "Tigre japonés.png", author: "Luis Soto" },
  { id: 7, title: "Ojo de Horus.png", author: "Cecilia Díaz" },
])

const filteredTattoos = computed(() =>
  tattoos.value.filter(t =>
    t.title.toLowerCase().includes(search.value.toLowerCase())
  )
)
</script>
