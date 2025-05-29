<template>
  <div class="relative">
    <!-- Menú lateral -->
    <div class="fixed inset-y-0 left-0 w-64 shadow-lg transform transition-transform duration-300 ease-in-out z-20"
      :class="visible ? 'translate-x-0' : '-translate-x-full'">
      <!-- Fondo con imagen dentro del menú -->
      <div class="relative h-full bg-cover bg-center bg-no-repeat">

        <!-- Revisar drawers -->
        <!-- Contenido del menú -->
        <div class="relative z-20 p-4">
          <div class="border-b font-bold text-purple-800">Menú</div>
          <div class="flex flex-col mt-4 space-y-4">
            <button @click="goToHome" class="w-full text-left text-white hover:text-purple-300">Inicio</button>

            <button @click="goToMyTattoos" class="w-full text-left text-white hover:text-purple-300">Mis tatuajes</button>

            <button @click="goToTattooArtists" class="w-full text-left text-white hover:text-purple-300">Tatuadores</button>

            <button @click="goToLogin" class="w-full text-left text-white hover:text-purple-300">Iniciar sesión</button>

            <button @click="goToProfile" class="w-full text-left text-white hover:text-purple-300">Perfil</button>

            <button @click="goToFavorites" class="w-full text-left text-white hover:text-purple-300">Favoritos</button>

            <button @click="goToRegister" class="w-full text-left text-white hover:text-purple-300">Registrarse</button>

          </div>

        </div>
        <div class="absolute bottom-0 left-0 w-full p-4 justify-between flex items-center">
          <button class="color-red-500 text-red-500 ml-2">Cerrar Sesión</button>
          <button @click="gotoAbout" class="text-white m-2 mr-4 bg-purple-900 h-8 w-8 rounded-full">?</button>
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

const goToHome = () => router.push({ name: 'Home' })
const goToMyTattoos = () => router.push({ name: 'TattooProfile' })
const goToTattooArtists = () => router.push({ name: 'TattooArtists' })
const goToLogin = () => router.push({ name: 'Login' })
const goToProfile = () => router.push({ name: 'UserProfile' })
const goToFavorites = () => router.push({ name: 'Favorites' })
const goToRegister = () => router.push({ name: 'Register' })
const gotoAbout = () => router.push({ name: 'About' })
</script>

<style scoped>
.bg-cover {
  background-image: url('/assets/Sidebar-bg.png');
  background-size: cover;
  background-position: left;
}
</style>
