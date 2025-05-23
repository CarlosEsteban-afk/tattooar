<template>
    <div class="flex items-center justify-center h-20">
        <img src="/assets/Banner.png" />
    </div>
    <div class="relative">
        <SidebarButton @toggle="toggleSidebar" />
        <Sidebar :visible="showSidebar" />
        <div v-if="showSidebar" @click="toggleSidebar"
            class="fixed inset-0 bg-black/40 z-40 transition-all"></div>
    </div>
    <div class="flex items-center justify-center h-10">
        <Searchbar />
    </div>
    <div class="align-middle flex flex-wrap justify-center gap-4 pt-4">
        <CardFeed 
        v-for="tattoo in tattoos"
          :id="tattoo.id"
          :title="tattoo.title"
          :author="tattoo.author"/>
    </div>
    <div>
        <a class="text-purple-600 hover:underline cursor-pointer" @click="goToLogin">Iniciar Sesión</a>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Searchbar from '../components/Searchbar.vue'
import { ref } from 'vue'
import SidebarButton from '../components/SidebarButton.vue'
import Sidebar from '../components/Sidebar.vue'
import CardFeed from '../components/CardFeed.vue'
import { computed } from 'vue'


// Datos de ejemplo para los tatuajes
const tattoos = ref([
  { id: 1, title: "Flor de loto.png", author: "María González", desc: "Descripción del tatuaje" },
  { id: 2, title: "Dragón tribal.png", author: "Carlos Mendoza", desc: "Descripción del tatuaje" },
  { id: 3, title: "Mandala mano.png", author: "Laura Pérez", desc: "Descripción del tatuaje" },
  { id: 4, title: "Lobo realista.png", author: "Javier Ruiz", desc: "Descripción del tatuaje" },
  { id: 5, title: "Brújula viajera.png", author: "Ana Torres", desc: "Descripción del tatuaje" },
  { id: 6, title: "Tigre japonés.png", author: "Luis Soto", desc: "Descripción del tatuaje" },
  { id: 7, title: "Ojo de Horus.png", author: "Cecilia Díaz", desc: "Descripción del tatuaje" },
])

/* const filteredTattoos = computed(() =>
  tattoos.value.filter(t =>
    t.title.toLowerCase().includes(search.value.toLowerCase())
  )
) */

const showSidebar = ref(false)
const toggleSidebar = () => {
    showSidebar.value = !showSidebar.value
}

</script>