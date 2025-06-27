<!-- src/components/Topbar.vue -->
<template>
  <header
    class="flex justify-between items-center bg-white shadow-sm border border-gray-300 px-6 py-4 rounded-md"
  >
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
                @mouseenter="markAsRead(n)"
              >
                <img
                  :src="getImgUrl(n.image)"
                  alt="Notification Image"
                  class="w-8 h-8 rounded-full inline-block mr-2"
                />
                <strong class="text-gray-800">{{ n.title }}</strong>
                <br />
                {{ n.description }} <br />
                <span class="text-gray-500 text-xs">{{ formatDate(n.createdAt) }}</span>
                <br />
                <span v-if="n.isRead === false" class="text-yellow-500 text-xs"
                  >Mensaje sin leer</span
                >
                <span v-else class="text-gray-500 text-xs">Leído</span>
              </li>
            </ul>
          </div>

          <div class="flex items-center gap-2">
            <i class="fas fa-user text-gray-600"></i>
            <span class="text-gray-700 font-medium">Admin</span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import api from "../services/api";

const showMenu = ref(false);
const notifications = ref([]); // Ahora es reactivo
const notificationCount = ref(0);
const router = useRouter();

async function getNotifications() {
  try {
    // Llama a la API usando axios
    const res = await api.get("/reports/notifications");
    console.log("Notificaciones:", res.data);
    notifications.value = res.data;
    notificationCount.value = res.data.length;
  } catch (e) {
    notifications.value = [];
    notificationCount.value = 0;
    // Puedes mostrar un error si lo deseas
  }
}

onMounted(() => {
  getNotifications();
});

function getImgUrl(path) {
  if (!path) return new URL("../assets/tatu.jpg", import.meta.url).href; // fallback
  // Si es url absoluta, retorna tal cual
  if (path && path.startsWith("http")) return path;
  return new URL(path, import.meta.url).href;
}
function toggleMenu() {
  showMenu.value = !showMenu.value;
}

function goToNotification(notification) {
  showMenu.value = false;
  router.push(notification.link);
}
function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
async function markAsRead(notification) {
  const notifId = notification.id || notification._id;
  if (notification.isRead || !notifId) return; // Evita llamadas innecesarias
  try {
    const res = await api.put(`/reports/notificationChange/${notifId}`);
    notification.isRead = true;
  } catch (e) {
    console.error('Error al marcar como leída:', e);
  }
}
defineProps({
  title: String,
});
</script>
