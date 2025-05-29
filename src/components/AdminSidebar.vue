<template>
  <!-- Botón Hamburguesa para móviles -->
  <button
    v-if="!isOpen"
    @click="toggleSidebar"
    type="button"
    class="inline-flex items-left p-2 mb-3 md:mb-5 text-sm text-[#F0F0F0] rounded-sm bg-[#2E076B] sm:hidden hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-black-200 cursor-pointer"
  >
    <span class="sr-only">Abrir menú</span>
    <svg
      class="w-6 h-6"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clip-rule="evenodd"
        fill-rule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
      ></path>
    </svg>
  </button>
  <!-- Overlay para móviles -->
  <div
    v-if="isOpen && !isDesktop"
    class="fixed inset-0 z-30 bg-black/40 cursor-pointer"
    @click="closeSidebar"
  ></div>
  <!-- Sidebar -->
  <aside
    id="default-sidebar"
    :class="[
      'fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-[#2E076B]',
      isOpen ? 'translate-x-0' : '-translate-x-full',
      'sm:translate-x-0',
    ]"
    aria-label="Sidebar"
  >
    <div class="flex flex-col justify-start h-full pb-4 bg-[#2E076B]">
      <!-- Logo -->
      <div class="justify-center bg-[#7B6EAD] py-5">
        <img src="/assets/Banner.png" alt="Banner" />
      </div>
      <ul class="gap-2 px-3 text-lg flex flex-col">
        <!-- Inicio -->
        <li>
          <button
            @click="navigateToDashboard()"
            class="flex items-center gap-1 w-full p-2 mt-4 text-[#F0F0F0] rounded-sm hover:bg-[#38158A] group cursor-pointer"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-layout-dashboard-icon lucide-layout-dashboard"
            >
              <rect width="7" height="9" x="3" y="3" rx="1" />
              <rect width="7" height="5" x="14" y="3" rx="1" />
              <rect width="7" height="9" x="14" y="12" rx="1" />
              <rect width="7" height="5" x="3" y="16" rx="1" />
            </svg>
            <span class="mx-2 whitespace-nowrap">Estadísticas generales</span>
          </button>
        </li>

        <!-- Usuarios -->
        <li>
          <button
            @click="navigateToUsers()"
            class="flex items-center w-full p-2 text-[#F0F0F0] rounded-sm hover:bg-[#38158A] group cursor-pointer"
            type="button"
          >
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
              class="lucide lucide-circle-user-round-icon lucide-circle-user-round"
            >
              <path d="M18 20a6 6 0 0 0-12 0" />
              <circle cx="12" cy="10" r="4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            <span class="mx-3 whitespace-nowrap">Usuarios</span>
          </button>
        </li>

        <!-- Tatuajes -->
        <li>
          <button
            @click="navigateToTattoos()"
            class="flex items-center w-full p-2 text-[#F0F0F0] rounded-sm hover:bg-[#38158A] group cursor-pointer"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              class="text-white transform rotate-45"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"
              />
              <path
                d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"
              />
              <path d="m2.3 2.3 7.286 7.286" />
              <circle cx="11" cy="11" r="2" />
            </svg>
            <span class="mx-3 whitespace-nowrap">Tatuajes</span>
          </button>
        </li>

        <!-- Logs -->
        <li>
          <button
            @click="navigateToLogs()"
            class="flex items-center w-full p-2 text-[#F0F0F0] rounded-sm hover:bg-[#38158A] group cursor-pointer"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              class="text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M10.268 21a2 2 0 0 0 3.464 0" />
              <path
                d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"
              />
            </svg>
            <span class="mx-3 whitespace-nowrap">Logs</span>
          </button>
        </li>

        <!-- Reportes -->
        <li>
          <button
            @click="navigateToReports()"
            class="flex items-center w-full p-2 text-[#F0F0F0] rounded-sm hover:bg-[#38158A] group cursor-pointer"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-flag-triangle-right-icon lucide-flag-triangle-right"><path d="M7 22V2l10 5-10 5"/></svg>
            <span class="mx-3 whitespace-nowrap">Reportes</span>
          </button>
        </li>
      </ul>
      <!-- Botón cerrar sesión -->
      <div class="mt-auto px-3 flex justify-end flex-col">
        <button
          @click="handleLogout"
          class="flex items-center justify-center p-2 text-white rounded-sm hover:bg-red-700 transition-colors duration-200 w-full text-center cursor-pointer"
          type="button"
        >
          <svg
            class="w-5 h-5 mr-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 16 16"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"
            />
          </svg>
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  </aside>

  <!-- Modal de confirmación de cierre de sesión -->
  <div
    v-if="showLogoutModal"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    @click="showLogoutModal = false"
  >
    <div class="bg-white rounded-lg p-6 max-w-xs w-full" @click.stop>
      <p class="mb-4 text-center text-lg">
        ¿Está seguro que desea cerrar sesión?
      </p>
      <div class="flex justify-end gap-2">
        <button
          @click="showLogoutModal = false"
          class="px-4 py-2 bg-gray-300 rounded cursor-pointer"
        >
          Cancelar
        </button>
        <button
          @click="confirmLogout"
          class="px-4 py-2 bg-[#B90000] text-white rounded cursor-pointer"
        >
          Aceptar
        </button>
      </div>
    </div>
  </div>

  <!-- Modal de éxito de cierre de sesión -->
  <div
    v-if="showLogoutSuccess"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
  >
    <div class="bg-white rounded-lg p-6 max-w-xs w-full">
      <p class="mb-4 text-center text-lg text-green-700">
        ¡Sesión cerrada correctamente!
      </p>
      <div class="flex justify-center">
        <button
          @click="goToLanding"
          class="px-4 py-2 bg-purple-700 text-white rounded cursor-pointer"
        >
          Aceptar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { initFlowbite } from "flowbite";

onMounted(() => {
  initFlowbite();
  handleResize();
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});

const emit = defineEmits(["logout"]);
const router = useRouter();
const isOpen = ref(false);
const isDesktop = ref(false);
const showLogoutModal = ref(false);
const showLogoutSuccess = ref(false);

const navigateToUsers = () => {
  router.push({ name: "AdminUsersView" });
};
const navigateToTattoos = () => {
  router.push({ name: "AdminTattoos" });
};
const navigateToLogs = () => {
  router.push({ name: "AdminLogs" });
};
const navigateToDashboard = () => {
  router.push({ name: "DashboardAdminView" });
};
const navigateToReports = () => {
  router.push({ name: "AdminReports" });
};
const toggleSidebar = () => {
  isOpen.value = !isOpen.value;
};
const closeSidebar = () => {
  isOpen.value = false;
};
const handleResize = () => {
  isDesktop.value = window.innerWidth >= 640; // sm breakpoint
  if (isDesktop.value) isOpen.value = true;
  else isOpen.value = false;
};

function handleLogout() {
  showLogoutModal.value = true;
}

function confirmLogout() {
  showLogoutModal.value = false;
  showLogoutSuccess.value = true;
}

function goToLanding() {
  showLogoutSuccess.value = false;
  router.push({ name: "Home" });
} 
</script>
