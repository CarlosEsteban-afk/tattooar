<template>
  <div class="relative">
    <!-- Menú lateral -->
    <div class="fixed inset-y-0 left-0 w-64 shadow-lg transform transition-transform duration-300 ease-in-out z-20"
      :class="visible ? 'translate-x-0' : '-translate-x-full'">
      <!-- Fondo con imagen dentro del menú -->
      <div class="relative h-full bg-cover bg-center bg-no-repeat">
        <!-- Capa oscura transparente -->
        <div class="absolute inset-0 bg-black/25 z-10"></div>

        <!-- Contenido del menú -->
        <div class="relative z-20 p-4">
          <div class="border-b font-bold text-purple-800">Menú</div>

          <button @click="goToHome" class="w-full text-left text-white hover:text-purple-300">Inicio</button>

          <button @click="goToMyTattoos" class="w-full text-left text-white hover:text-purple-300">Mis tatuajes</button>

          <button @click="goToTattooArtists"
            class="w-full text-left text-white hover:text-purple-300">Tatuadores</button>

          <button @click="goToLogin" class="w-full text-left text-white hover:text-purple-300">Iniciar sesión</button>

          <button @click="goToProfile" class="w-full text-left text-white hover:text-purple-300">Perfil</button>

          <button @click="goToFavorites" class="w-full text-left text-white hover:text-purple-300">Favoritos</button>

          <button @click="goToRegister" class="w-full text-left text-white hover:text-purple-300">Registrarse</button>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

defineProps({
  visible: {
    type: Boolean,
    required: true
  }
})

const router = useRouter()

const goToHome = () => router.push({ name: 'Login' })
const goToMyTattoos = () => router.push({ name: 'TattooProfile' })
const goToTattooArtists = () => router.push({ name: 'TattooArtists' })
const goToLogin = () => router.push({ name: 'Login' })
const goToProfile = () => router.push({ name: 'Profile' })
const goToFavorites = () => router.push({ name: 'Favorites' })
const goToRegister = () => router.push({ name: 'Register' })
</script>

<style scoped>
.bg-cover {
  background-image: url('/assets/Sidebar-bg.png');
  background-size: cover;
  background-position: left;
}
</style>
