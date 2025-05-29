<!-- src/components/Topbar.vue -->
<template>
  <header class="flex justify-between items-center bg-white shadow px-6 py-4">
        <!-- <img src="/public/assets/Banner.png" alt="admin banner" class="h-12" />-->
    <h1 class="text-xl font-bold text-gray-800">{{ title }}</h1>

    <!-- Notififaciones y Tipo usuario -->
    <div class="flex items-center gap-6">
      <div class="relative">
        <div class="flex">
          <button @click="toggleMenu" class="relative">
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
              class="lucide lucide-bell-ring-icon lucide-bell-ring"
            >
              <path d="M10.268 21a2 2 0 0 0 3.464 0" />
              <path d="M22 8c0-2.3-.8-4.3-2-6" />
              <path
                d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"
              />
              <path d="M4 2C2.8 3.7 2 5.7 2 8" />
            </svg>
            <span
              v-if="notificationCount > 0"
              class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1"
            >
              {{ notificationCount }}
            </span>
          </button>
          <div
            v-if="showMenu"
            class="absolute right-12 mt-8 w-64 bg-white border rounded shadow-lg z-50"
          >
            <div
              v-if="notifications.length === 0"
              class="p-4 text-gray-500 text-sm"
            >
              No tienes notificaciones
            </div>
            <ul v-else>
              <li
                v-for="n in notifications"
                :key="n.id"
                class="hover:bg-gray-100 cursor-pointer px-4 py-2 text-sm"
                @click="goToNotification(n)"
              >
                <img
                  :src= "getImgUrl(n.urlImagen)"
                  alt="Notification Image"
                  class="w-8 h-8 rounded-full inline-block mr-2"
                />
                <strong class="text-gray-800">{{ n.nombreTatuaje }}</strong>
                <br>
                {{ n.text }}
              </li>
            </ul>
          </div>

          <div class="flex items-center gap-2">
            <i class="fas fa-user text-gray-600"></i>
            <nbsp></nbsp>
            <span class="text-gray-700 font-medium">Admin</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";


const showMenu = ref(false);
const router = useRouter();

const notifications = ref([
  {
    id: 1,
    text: "Nuevo reporte",
    route: "/admin/reports/1",
    nombreTatuaje: "Tatuaje de dragón",
    urlImagen: "../assets/tatu.jpg",
  },
  {
    id: 2,
    text: "Solicitud de contacto",
    route: "/admin/reports/2",
    nombreTatuaje: "TatumiGod1998",
    urlImagen: "../assets/doc.png",
  },
  {
    id: 3,
    text: "Documento de reclamo",
    route: "/admin/reports/3",
    nombreTatuaje: "GerardPique123",
    urlImagen: "../assets/reclamo.webp",
  },
  
]);
function getImgUrl(path) {
  return new URL(path, import.meta.url).href;
}
function toggleMenu() {
  showMenu.value = !showMenu.value;
}

function goToNotification(notification) {
  showMenu.value = false;
  router.push(notification.route);
}

defineProps({
  title: String,
  notificationCount: {
    type: Number,
    default: 0,
  },
});
</script>
