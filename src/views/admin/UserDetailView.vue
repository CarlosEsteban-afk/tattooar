<template>
    <div class="flex min-h-screen bg-gray-100">
        <!-- Sidebar -->
        <Sidebar />

        <!-- Main Content -->
        <div class="flex-1 flex flex-col items-center">
            <!-- Header -->
            <div class="flex items-center justify-center relative p-4">
                <!-- Flecha para volver -->
                <button @click="goBack"
                    class="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded focus:outline-none"
                    aria-label="Volver">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-800" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <!-- Banner -->
                <img src="/assets/Banner.png" alt="Banner" class="h-16 mx-auto" />
            </div>

            <!-- Detalle de usuario -->
            <div class="max-w-3xl mx-auto p-6 w-full">
                <div v-if="user">
                    <!-- Header: Nombre, Imagen, Alias -->
                    <div class="flex items-center gap-6 mb-6">
                        <img :src="user.imagen || defaultImg" alt="Profile"
                            class="w-24 h-24 rounded-full object-cover border-2 border-purple-700" />
                        <div>
                            <h2 class="text-2xl font-bold">
                                {{ user.rol === 'Tatuador' ? user.nombre : user.alias }}
                            </h2>
                            <p v-if="user.rol === 'Tatuador'" class="text-gray-500">{{ user.nombre }} {{ user.apellido
                                }}</p>
                            <p v-else class="text-gray-500">{{ user.nombre }} {{ user.apellido }}</p>
                            <p class="text-sm text-gray-400">{{ user.correo }}</p>
                        </div>
                        <button @click="banUser"
                            class="ml-auto flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" stroke-width="2"
                                viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M17 17L7 7"></path>
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M9 15l6-6"></path>
                            </svg>
                            Desactivar usuario
                        </button>
                    </div>

                    <!-- Tatuador Detalle -->
                    <div v-if="user.rol === 'Tatuador'">
                        <!-- Info principal -->
                        <div class="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h3 class="font-semibold mb-1">Estilos</h3>
                                <div class="flex flex-wrap gap-2">
                                    <span v-for="estilo in user.estilos" :key="estilo"
                                        class="bg-purple-200 text-purple-800 px-2 py-1 rounded text-xs">
                                        {{ estilo }}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <h3 class="font-semibold mb-1">Ciudad(es)</h3>
                                <div class="flex flex-wrap gap-2">
                                    <span v-for="ciudad in user.ciudades" :key="ciudad"
                                        class="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs">
                                        {{ ciudad }}
                                    </span>
                                </div>
                            </div>
                            <div>
                                <h3 class="font-semibold mb-1">Contacto</h3>
                                <div class="flex gap-3 items-center">
                                    <a v-if="user.whatsapp" :href="`https://wa.me/${user.whatsapp}`" target="_blank"
                                        class="text-green-600 flex items-center">
                                        <svg class="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path
                                                d="M20.52 3.48A12 12 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.18-1.62A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.63-.5-5.18-1.44l-.37-.22-3.67.96.98-3.58-.24-.37A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.8c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.36-.01-.56-.01-.19 0-.5.07-.76.34-.26.27-1 1-.98 2.43.02 1.43 1.02 2.81 1.16 3 .14.19 2.01 3.07 4.88 4.19.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.65-.67 1.88-1.32.23-.65.23-1.21.16-1.32-.07-.11-.25-.18-.53-.32z" />
                                        </svg>
                                        WhatsApp
                                    </a>
                                    <a v-if="user.instagram" :href="`https://instagram.com/${user.instagram}`"
                                        target="_blank" class="text-pink-500 flex items-center">
                                        <svg class="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                            <path
                                                d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.41a4.92 4.92 0 0 1 1.77 1.03 4.92 4.92 0 0 1 1.03 1.77c.17.46.354 1.26.41 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.41 2.43a4.92 4.92 0 0 1-1.03 1.77 4.92 4.92 0 0 1-1.77 1.03c-.46.17-1.26.354-2.43.41-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.41a4.92 4.92 0 0 1-1.77-1.03 4.92 4.92 0 0 1-1.03-1.77c-.17-.46-.354-1.26-.41-2.43C2.212 15.784 2.2 15.4 2.2 12s.012-3.584.07-4.85c.056-1.17.24-1.97.41-2.43a4.92 4.92 0 0 1 1.03-1.77 4.92 4.92 0 0 1 1.77-1.03c.46-.17 1.26-.354 2.43-.41C8.416 2.212 8.8 2.2 12 2.2zm0-2.2C8.736 0 8.332.012 7.052.07 5.77.128 4.87.312 4.1.53a7.07 7.07 0 0 0-2.57 1.62A7.07 7.07 0 0 0 .53 4.1c-.218.77-.402 1.67-.46 2.95C.012 8.332 0 8.736 0 12c0 3.264.012 3.668.07 4.948.058 1.28.242 2.18.46 2.95a7.07 7.07 0 0 0 1.62 2.57 7.07 7.07 0 0 0 2.57 1.62c.77.218 1.67.402 2.95.46C8.332 23.988 8.736 24 12 24s3.668-.012 4.948-.07c1.28-.058 2.18-.242 2.95-.46a7.07 7.07 0 0 0 2.57-1.62 7.07 7.07 0 0 0 1.62-2.57c.218-.77.402-1.67.46-2.95.058-1.28.07-1.684.07-4.948s-.012-3.668-.07-4.948c-.058-1.28-.242-2.18-.46-2.95a7.07 7.07 0 0 0-1.62-2.57A7.07 7.07 0 0 0 19.9.53c-.77-.218-1.67-.402-2.95-.46C15.668.012 15.264 0 12 0z" />
                                            <path
                                                d="M12 5.838A6.162 6.162 0 1 0 18.162 12 6.162 6.162 0 0 0 12 5.838zm0 10.162A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.406-11.845a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z" />
                                        </svg>
                                        Instagram
                                    </a>
                                </div>
                            </div>
                        </div>

                        <!-- Diseños disponibles -->
                        <div class="mb-6">
                            <h3 class="font-semibold mb-2">Diseños disponibles</h3>
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div v-for="diseño in user.diseños" :key="diseño.id"
                                    class="bg-gray-100 rounded p-2 flex flex-col items-center">
                                    <img :src="diseño.imagen" alt="Diseño"
                                        class="w-20 h-20 object-cover rounded mb-2" />
                                    <span class="text-xs text-gray-700">{{ diseño.nombre }}</span>
                                </div>
                                <div v-if="!user.diseños || user.diseños.length === 0"
                                    class="col-span-full text-gray-400 text-center">
                                    No hay diseños disponibles.
                                </div>
                            </div>
                        </div>

                        <!-- Portafolio -->
                        <div>
                            <h3 class="font-semibold mb-2">Portafolio</h3>
                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div v-for="img in user.portafolio" :key="img"
                                    class="bg-gray-100 rounded p-2 flex items-center justify-center">
                                    <img :src="img" alt="Portafolio" class="w-24 h-24 object-cover rounded" />
                                </div>
                                <div v-if="!user.portafolio || user.portafolio.length === 0"
                                    class="col-span-full text-gray-400 text-center">
                                    No hay imágenes en el portafolio.
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Cliente Detalle -->
                    <div v-else>
                        <div class="mb-6">
                            <h3 class="font-semibold mb-1">Alias</h3>
                            <p class="text-gray-700">{{ user.alias }}</p>
                        </div>
                        <div class="mb-6">
                            <h3 class="font-semibold mb-1">Nombre</h3>
                            <p class="text-gray-700">{{ user.nombre }} {{ user.apellido }}</p>
                        </div>
                        <div class="mb-6">
                            <h3 class="font-semibold mb-1">Correo electrónico</h3>
                            <p class="text-gray-700">{{ user.correo }}</p>
                        </div>
                    </div>
                </div>
                <div v-else class="text-center text-gray-400 py-12">
                    Usuario no encontrado.
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import Sidebar from '../../components/Sidebar.vue'

// Mock de usuarios (reemplaza por fetch real en producción)
const users = [
    {
        id: 1,
        rol: 'Tatuador',
        nombre: 'Carlos',
        apellido: 'Mora',
        correo: 'carlos70@gmail.com',
        imagen: 'https://randomuser.me/api/portraits/men/32.jpg',
        estilos: ['Realismo', 'Tradicional', 'Geométrico'],
        ciudades: ['Santiago', 'Valparaíso'],
        whatsapp: '56912345678',
        instagram: 'carlostattoo',
        diseños: [
            { id: 1, nombre: 'Rosa', imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=256&q=80' },
            { id: 2, nombre: 'Dragón', imagen: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=256&q=80' }
        ],
        portafolio: [
            'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=256&q=80',
            'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=256&q=80'
        ]
    },
    {
        id: 2,
        rol: 'Cliente',
        alias: 'hector32',
        nombre: 'Hector',
        apellido: 'Salamanca',
        correo: 'hector32@gmail.com',
        imagen: 'https://randomuser.me/api/portraits/men/33.jpg'
    }
]

const defaultImg = 'https://ui-avatars.com/api/?name=User&background=7B6EAD&color=fff'

const route = useRoute()
const router = useRouter()
const user = ref(null)

user.value = users.find(u => u.id === Number(route.params.id))

function banUser() {
    alert('Usuario desactivado (mock)')
}

function goBack() {
    router.push({ name: 'AdminUsers' })
}
</script>