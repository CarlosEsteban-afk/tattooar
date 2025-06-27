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
        <p>{{ userStore.user?.fullName || 'Nombre Apellido' }}</p>
        <p>{{ userStore.user?.email || 'email@ejemplo.com' }}</p>
      </div>
      <div>
        <img src="/assets/ornament.png" alt="ornament" class="rounded" />
      </div>
      <div v-if="isTattooerOwnProfile">
        <div>
          <p>Instagram</p>
          <input v-model="editableInstagram" @blur="updateSocialMedia" class="w-90 rounded" type="text"
            placeholder="@user1234" />
        </div>
        <div>
          <p>Whatsapp</p>
          <input v-model="editableWhatsapp" @blur="updateSocialMedia" class="w-90 rounded" type="text"
            placeholder="wa.me/1234567890" />
        </div>
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
import { ref, computed } from 'vue';
import TopBanner from '../components/TopBanner.vue';
import { useUserStore } from '../stores/UserStore';
import api from '../services/api';

const router = useRouter();
const goToResetPassword = () => router.push({ name: 'ResetPassword' })

const userStore = useUserStore()
const editableInstagram = ref(userStore.user?.socialMedia?.instagram || "")
const editableWhatsapp = ref(userStore.user?.socialMedia?.whatsapp || "")

const isTattooerOwnProfile = computed(() => {
  return userStore.user?.role === 'tattooer' && userStore.user?.id
})

function updateSocialMedia() {
  api.put('/users/me', {
    socialMedia: {
      instagram: editableInstagram.value,
      whatsapp: editableWhatsapp.value
    } 
  })
  .then(() => {
    console.log('Redes sociales actualizadas')
        if (!userStore.user.socialMedia) {
      userStore.user.socialMedia = {}  // Asegura que el objeto exista
    }
    userStore.user.socialMedia.instagram = editableInstagram.value
    userStore.user.socialMedia.whatsapp = editableWhatsapp.value
  })
  .catch(handleApiError)
}
function handleApiError(err) {
  if (err.isAuthError) {
    console.warn('Sesión expirada, redirigiendo al login');
    router.push({ name: 'Login' });
  } else {
    console.error('Error de API:', err);
  }
}
</script>