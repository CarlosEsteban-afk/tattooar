<template>
    <div>
        <!-- Botón hamburguesa en móvil - Ahora con posición fija en la parte superior -->
        <button @click="toggleSidebar"
            class="fixed top-4 left-4 z-[100] md:hidden p-2 bg-purple-700 rounded-md text-white focus:outline-none shadow-md">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                stroke-linecap="round" stroke-linejoin="round">
                <path v-if="!isOpen" d="M4 6h16M4 12h16M4 18h16" />
                <path v-else d="M18 6L6 18M6 6l12 12" />
            </svg>
        </button>

        <!-- Overlay para móvil cuando el sidebar está abierto - Ahora más claro -->
        <div v-if="isOpen && !isDesktop" @click="closeSidebar"
            class="fixed inset-0 bg-black bg-opacity-70 z-40 transition-opacity duration-300 ease-in-out"></div>

        <!-- Sidebar -->
        <div v-show="isOpen || isDesktop"
            class="fixed md:relative z-50 top-0 left-0 w-64 h-full bg-purple-900 text-white shadow-lg transition-all duration-300 ease-in-out transform"
            :class="{ 'translate-x-0': isOpen, '-translate-x-full md:translate-x-0': !isOpen }">
            <div class="p-6">
                <div class="flex items-center justify-center mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                        <line x1="16" y1="8" x2="2" y2="22"></line>
                        <line x1="17.5" y1="15" x2="9" y2="15"></line>
                    </svg>
                </div>
            </div>

            <nav class="mt-10 overflow-y-auto max-h-[calc(100vh-200px)]">
                <div @click="navigateTo('usuarios')"
                    class="px-6 py-4 flex items-center hover:bg-purple-800 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <span>Usuarios</span>
                </div>

                <div @click="navigateTo('tatuajes')"
                    class="px-6 py-4 flex items-center hover:bg-purple-800 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path
                            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span>Tatuajes</span>
                </div>


                <div @click="navigateTo('logs')"
     class="px-6 py-4 flex items-center hover:bg-purple-800 cursor-pointer">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>

    <span>Logs</span>
</div>


            </nav>

            <div class="absolute bottom-0 w-full">
                <button @click="$emit('logout')"
                    class="flex items-center justify-center w-full bg-red-600 hover:bg-red-700 text-white py-3">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Cerrar Sesión
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { initFlowbite } from 'flowbite'

const isOpen = ref(false)
const isDesktop = ref(false)

const toggleSidebar = () => {
    isOpen.value = !isOpen.value
}

const closeSidebar = () => {
    if (!isDesktop.value) {
        isOpen.value = false
    }
}

const navigateTo = (route) => {
    // Aquí puedes implementar la navegación real con vue-router
    console.log(`Navegando a ${route}`)

    // Cerrar el sidebar en móvil después de navegar
    if (!isDesktop.value) {
        isOpen.value = false
    }
}

const handleResize = () => {
    isDesktop.value = window.innerWidth >= 768

    // En escritorio, el sidebar siempre está visible
    if (isDesktop.value) {
        isOpen.value = true
    }
}

onMounted(() => {
    initFlowbite()
    handleResize()
    window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* Aseguramos que la transición sea suave */
.transform {
    transition-property: transform;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 300ms;
}
</style>