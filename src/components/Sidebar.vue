<template>
    <!-- Botón Hamburguesa para móviles -->
    <button @click="toggleSidebar" type="button"
        class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-[#B1A9D1] rounded-lg sm:hidden hover:bg-[#2E076B] focus:outline-none focus:ring-2 focus:ring-gray-200">
        <span class="sr-only">Abrir menú</span>
        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd" fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
            </path>
        </svg>
    </button>

    <!-- Sidebar -->
    <aside id="default-sidebar" :class="[
        'fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-[#2E076B]',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        'sm:translate-x-0'
    ]" aria-label="Sidebar">
        <div class="flex flex-col justify-between h-full px-3 py-4 bg-[#2E076B]">
            <!-- Menú principal -->
            <ul class="space-y-2 font-medium">
                <!-- Logo -->
                <li class="mb-4">
                    <img src="/assets/Logo.png" alt="Logo" class="mx-auto w-24 h-auto" />
                </li>

                <!-- Usuarios -->
                <li>
                    <button @click="navigateToUsers('/tattooar/admin/users')"
                        class="flex items-center w-full p-2 text-[#F0F0F0] rounded-lg hover:bg-[#38158A] group"
                        type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                            class="lucide lucide-circle-user-round-icon lucide-circle-user-round">
                            <path d="M18 20a6 6 0 0 0-12 0" />
                            <circle cx="12" cy="10" r="4" />
                            <circle cx="12" cy="12" r="10" />
                        </svg>
                        <span class="ms-3 whitespace-nowrap">Usuarios</span>
                    </button>
                </li>

                <!-- Tatuajes -->
                <li>
                    <button @click="navigateToTattoos('/tattooar/admin/tattoos')"
                        class="flex items-center w-full p-2 text-[#F0F0F0] rounded-lg hover:bg-[#38158A] group"
                        type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white transform rotate-45"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path
                                d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z" />
                            <path
                                d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18" />
                            <path d="m2.3 2.3 7.286 7.286" />
                            <circle cx="11" cy="11" r="2" />
                        </svg>
                        <span class="ms-3 whitespace-nowrap">Tatuajes</span>
                    </button>
                </li>

                <!-- Logs -->
                <li>
                    <button @click="navigateToLogs('/tattooar/admin/logs')"
                        class="flex items-center w-full p-2 text-[#F0F0F0] rounded-lg hover:bg-[#38158A] group"
                        type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round">
                            <path d="M10.268 21a2 2 0 0 0 3.464 0" />
                            <path
                                d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
                        </svg>
                        <span class="ms-3 whitespace-nowrap">Logs</span>
                    </button>
                </li>

                <!-- Botón cerrar sesión -->
                <div class="mt-4">
                    <button @click="navigateToHome('/tattooar/')"
                        class="flex items-center justify-center p-2 text-white bg-[#B90000] rounded-lg hover:bg-red-700 transition-colors duration-200 w-full text-center"
                        type="button">
                        <svg class="w-5 h-5 mr-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 16 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3" />
                        </svg>
                        <span>Cerrar Sesión</span>
                    </button>
                </div>
            </ul>
        </div>
    </aside>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { initFlowbite } from 'flowbite'

onMounted(() => {
    initFlowbite()
    handleResize()
    window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
})

const router = useRouter()
const isOpen = ref(false)
const isDesktop = ref(false)

const navigateToUsers = () => {
    router.push({ name: 'AdminUsersView' })
}
const navigateToTattoos = () => {
    router.push({ name: 'AdminTattoos' })
}
const navigateToLogs = () => {
    router.push({ name: 'AdminLogs' })
}
const navigateToHome = () => {
    router.push({ name: 'LandingView' })
}
const toggleSidebar = () => {
    isOpen.value = !isOpen.value
}



const handleResize = () => {
    isDesktop.value = window.innerWidth >= 768

    // En escritorio, el sidebar siempre está visible
    if (isDesktop.value) {
        isOpen.value = true
    }
}




</script>

<style scoped></style>