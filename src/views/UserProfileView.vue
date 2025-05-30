<template>
  <TopBanner />
  <button @click="$router.back()" class="absolute left-4 top-10 text-2xl z-10 cursor-pointer">
    ←
  </button>
  <div class="flex flex-col h-screen items-center">
    <!-- Main scrollable content -->
    <div class="flex-1 overflow-y-auto flex flex-col items-center bg-cover pt-20">
      <h1>Mi perfil</h1>
      <img src="/assets/avatar.png" alt="Avatar" class="rounded-full w-32 h-32 mb-4" />
      <div class="flex flex-col items-center">
        <p>Nombre Apellido</p>
        <p>email@ejemplo.com</p>
      </div>
      <div>
        <img src="/assets/ornament.png" alt="ornament" class="rounded" />
      </div>
      <div>
        <p>Instagram</p>
        <input class="w-90 rounded" type="text" placeholder="@user1234" />
      </div>
      <div>
        <p>Whatsapp</p>
        <input class="w-90 rounded" type="text" placeholder="wa.me/1234567890" />
      </div>
    </div>

    <!-- Bottom button -->
    <div class="p-4">
      <button @click="goToResetPassword" class="w-80 text-red-500 py-2 rounded">
        Cambiar contraseña
      </button>
    </div>
  </div>

</template>
<script setup>
import { useRouter } from 'vue-router';
import TopBanner from '../components/TopBanner.vue';


const router = useRouter();
const goToResetPassword = () => router.push({ name: 'ResetPassword' })
</script>