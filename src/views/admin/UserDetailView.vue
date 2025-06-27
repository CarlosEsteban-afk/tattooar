<template>
    <div class="min-h-screen bg-gray-50 flex flex-col md:flex-row">
        <div class="flex-1 flex flex-col w-full sm:pl-64">
            <div class="p-2 md:p-8 pt-6 justify-center">
                <AdminSidebar @logout="logout" />
                <TopBar title="Detalle de usuario" :notificationCount="3" />
                <div class="flex justify-center items-center mt-4">
                    <div
                        class="w-full max-w-5xl bg-white rounded-2xl shadow-xl border border-gray-200 p-4 md:p-10 flex flex-col gap-4">
                        <div v-if="user" class="flex flex-col md:flex-row gap-8 items-start">
                            <!-- Columna izquierda: Imagen y acciones -->
                            <div class="flex flex-col items-center gap-2 w-full md:w-1/3">
                                <div class="relative mb-1">
                                    <img :src="user.profileImageUrl || defaultImg" alt="Profile"
                                        class="w-28 h-28 md:w-40 md:h-40 rounded-full object-cover border-4 border-purple-400 shadow-lg" />
                                    <span class="absolute bottom-2 right-2 px-2 py-1 rounded-full text-xs font-semibold"
                                        :class="user.status === 'active' ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-red-100 text-red-700 border border-red-300'">
                                        {{ user.status === 'active' ? 'Activo' : 'Inactivo' }}
                                    </span>
                                </div>
                                <h2 class="text-lg md:text-2xl font-bold text-center text-[#2E076B] tracking-tight">
                                    {{ user.fullName }}
                                </h2>
                                <p class="text-gray-600 text-center font-medium text-sm md:text-base">@{{ user.username
                                    }}</p>
                                <p class="text-xs md:text-sm text-gray-400 text-center mb-1">{{ user.email }}</p>
                                <div class="flex gap-2 flex-wrap justify-center mb-1">
                                    <span
                                        class="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 border border-purple-200">
                                        {{ user.role === 'tattooer' ? 'Tatuador' : user.role }}
                                    </span>
                                    <span v-if="user.reportCount > 0"
                                        class="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
                                        {{ user.reportCount }} reportes
                                    </span>
                                </div>
                                <!-- Botones de acción compactos -->
                                <div class="flex gap-2 w-full justify-center mb-2 mt-2">
                                    <button @click="toggleUserStatus"
                                        :title="user.status === 'active' ? 'Desactivar usuario' : 'Activar usuario'"
                                        class="flex items-center justify-center px-3 py-2 rounded-lg font-semibold transition duration-150 shadow-sm text-white text-xs md:text-sm"
                                        :class="user.status === 'active' ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'">
                                        <svg v-if="user.status === 'active'" class="w-4 h-4 md:w-5 md:h-5 mr-1"
                                            fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                                            stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M17 17L7 7"></path>
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <path d="M9 15l6-6"></path>
                                        </svg>
                                        <svg v-else class="w-4 h-4 md:w-5 md:h-5 mr-1" fill="none" stroke="currentColor"
                                            stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
                                            stroke-linejoin="round">
                                            <path d="M12 4v16m8-8H4"></path>
                                        </svg>
                                        <span class="hidden md:inline">{{ user.status === 'active' ? 'Desactivar' :
                                            'Activar' }}</span>
                                    </button>
                                    <button @click="goToEditUser(user._id)" title="Editar usuario"
                                        class="flex items-center justify-center px-3 py-2 rounded-lg bg-[#2E076B] hover:bg-purple-900 text-white font-semibold shadow-sm transition duration-150 text-xs md:text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 md:w-5 md:h-5 mr-1"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                            <path
                                                d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
                                        </svg>
                                        <span class="hidden md:inline">Editar</span>
                                    </button>
                                    <button @click="goBack" title="Volver"
                                        class="flex items-center justify-center px-3 py-2 rounded-lg bg-purple-100 hover:bg-purple-200 text-[#2E076B] font-semibold shadow-sm transition duration-150 text-xs md:text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 md:w-5 md:h-5 mr-1"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                                        </svg>
                                        <span class="hidden md:inline">Volver</span>
                                    </button>
                                </div>
                            </div>
                            <!-- Columna derecha: Info secundaria -->
                            <div class="flex-1 w-full md:w-2/3 flex flex-col gap-4">
                                <!-- Datos para TATTOOER -->
                                <template v-if="user.role === 'tattooer'">
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <h3 class="font-semibold mb-1 text-[#2E076B] text-sm">Estilos</h3>
                                            <div class="flex flex-wrap gap-2">
                                                <span v-for="estilo in user.styles" :key="estilo"
                                                    class="bg-purple-200 text-purple-800 px-2 py-1 rounded text-xs font-medium border border-purple-300">
                                                    {{ estilo }}
                                                </span>
                                                <span v-if="!user.styles || user.styles.length === 0"
                                                    class="text-gray-400">Sin estilos</span>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 class="font-semibold mb-1 text-[#2E076B] text-sm">Ciudad(es)</h3>
                                            <div class="flex flex-wrap gap-2">
                                                <span v-for="ciudad in user.cities" :key="ciudad"
                                                    class="bg-[#E9E6F7] text-[#2E076B] px-2 py-1 rounded text-xs font-medium border border-[#B1A9D1]">
                                                    {{ ciudad }}
                                                </span>
                                                <span v-if="!user.cities || user.cities.length === 0"
                                                    class="text-gray-400">Sin ciudades</span>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- Redes sociales -->
                                    <div>
                                        <h3 class="font-semibold mb-1 text-[#2E076B] text-sm">Redes sociales</h3>
                                        <div class="flex gap-3 items-center flex-wrap">
                                            <a v-if="user.socialMedia?.whatsapp"
                                                :href="`https://wa.me/${user.socialMedia.whatsapp}`" target="_blank"
                                                class="text-green-600 flex items-center hover:underline text-xs md:text-sm">
                                                <svg class="w-4 h-4 md:w-5 md:h-5 mr-1" fill="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path
                                                        d="M20.52 3.48A12 12 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.18-1.62A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.63-.5-5.18-1.44l-.37-.22-3.67.96.98-3.58-.24-.37A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.8c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.19.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.36-.01-.56-.01-.19 0-.5.07-.76.34-.26.27-1 1-.98 2.43.02 1.43 1.02 2.81 1.16 3 .14.19 2.01 3.07 4.88 4.19.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.65-.67 1.88-1.32.23-.65.23-1.21.16-1.32-.07-.11-.25-.18-.53-.32z" />
                                                </svg>
                                                WhatsApp
                                            </a>
                                            <a v-if="user.socialMedia?.instagram"
                                                :href="`https://instagram.com/${user.socialMedia.instagram}`"
                                                target="_blank"
                                                class="text-pink-500 flex items-center hover:underline text-xs md:text-sm">
                                                <svg class="w-4 h-4 md:w-5 md:h-5 mr-1" fill="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path
                                                        d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.41a4.92 4.92 0 0 1 1.77 1.03 4.92 4.92 0 0 1 1.03 1.77c.17.46.354 1.26.41 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.41 2.43a4.92 4.92 0 0 1-1.03 1.77 4.92 4.92 0 0 1-1.77 1.03c-.46.17-1.26.354-2.43.41-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.41a4.92 4.92 0 0 1-1.77-1.03 4.92 4.92 0 0 1-1.03-1.77c-.17-.46-.354-1.26-.41-2.43C2.212 15.784 2.2 15.4 2.2 12s.012-3.584.07-4.85c.056-1.17.24-1.97.41-2.43a4.92 4.92 0 0 1 1.03-1.77 4.92 4.92 0 0 1 1.77-1.03c.46-.17 1.26-.354 2.43-.41C8.416 2.212 8.8 2.2 12 2.2zm0-2.2C8.736 0 8.332.012 7.052.07 5.77.128 4.87.312 4.1.53a7.07 7.07 0 0 0-2.57 1.62A7.07 7.07 0 0 0 .53 4.1c-.218.77-.402 1.67-.46 2.95C.012 8.332 0 8.736 0 12c0 3.264.012 3.668.07 4.948.058 1.28.242 2.18.46 2.95a7.07 7.07 0 0 0 1.62 2.57 7.07 7.07 0 0 0 2.57 1.62c.77.218 1.67.402 2.95.46C8.332 23.988 8.736 24 12 24s3.668-.012 4.948-.07c1.28-.058 2.18-.242 2.95-.46a7.07 7.07 0 0 0 2.57-1.62 7.07 7.07 0 0 0 1.62-2.57c.218-.77.402-1.67.46-2.95.058-1.28.07-1.684.07-4.948s-.012-3.668-.07-4.948c-.058-1.28-.242-2.18-.46-2.95a7.07 7.07 0 0 0-1.62-2.57A7.07 7.07 0 0 0 19.9.53c-.77-.218-1.67-.402-2.95-.46C15.668.012 15.264 0 12 0z" />
                                                    <path
                                                        d="M12 5.838A6.162 6.162 0 1 0 18.162 12 6.162 6.162 0 0 0 12 5.838zm0 10.162A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm6.406-11.845a1.44 1.44 0 1 0 1.44 1.44 1.44 1.44 0 0 0-1.44-1.44z" />
                                                </svg>
                                                Instagram
                                            </a>
                                            <a v-if="user.socialMedia?.facebook"
                                                :href="`https://facebook.com/${user.socialMedia.facebook}`"
                                                target="_blank"
                                                class="text-blue-600 flex items-center hover:underline text-xs md:text-sm">
                                                <svg class="w-4 h-4 md:w-5 md:h-5 mr-1" fill="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path
                                                        d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
                                                </svg>
                                                Facebook
                                            </a>
                                            <span
                                                v-if="!user.socialMedia || (!user.socialMedia.whatsapp && !user.socialMedia.instagram && !user.socialMedia.facebook)"
                                                class="text-gray-400 text-xs md:text-sm">Sin redes sociales</span>
                                        </div>
                                    </div>
                                    <!-- Diseños -->
                                    <div>
                                        <h3 class="font-semibold mb-2 text-[#2E076B] text-sm">Diseños disponibles</h3>
                                        <div v-if="designs && designs.length > 0">
                                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                <div v-for="diseño in designs" :key="diseño._id"
                                                    class="bg-[#7B6EAD] rounded-xl p-2 flex flex-col items-center shadow">
                                                    <img :src="diseño.designURL" alt="Diseño"
                                                        class="w-full h-24 md:h-32 object-cover rounded mb-1" />
                                                    <span
                                                        class="text-xs text-white font-medium truncate w-full text-center"></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else class="text-gray-400 text-center text-xs">No hay diseños
                                            disponibles.</div>
                                    </div>
                                    <!-- Portafolio -->
                                    <div>
                                        <h3 class="font-semibold mb-2 text-[#2E076B] text-sm">Portafolio</h3>
                                        <div v-if="user.portfolio && user.portfolio.length > 0">
                                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                <div v-for="img in user.portfolio" :key="img"
                                                    class="bg-[#7B6EAD] rounded-xl p-2 flex items-center justify-center shadow hover:scale-105 transition-transform duration-150">
                                                    <img :src="img" alt="Portafolio"
                                                        class="w-full h-24 md:h-32 object-cover rounded" />
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else class="text-gray-400 text-center text-xs">No hay imágenes en el
                                            portafolio.</div>
                                    </div>
                                </template>
                                <!-- Datos para CLIENT -->
                                <template v-else-if="user.role === 'client'">
                                    <div>
                                        <h3 class="font-semibold mb-2 text-[#2E076B] text-sm">Favoritos</h3>
                                        <div v-if="user.favorites && user.favorites.length > 0">
                                            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                <template v-for="fav in user.favorites" :key="fav.id || fav._id">
                                                    <div
                                                        class="bg-[#7B6EAD] rounded-xl p-2 flex flex-col items-center shadow">
                                                        <img :src="fav.imagen || fav.imageUrl" alt="Favorito"
                                                            class="w-full h-24 md:h-32 object-cover rounded mb-1" />
                                                        <span
                                                            class="text-xs text-white font-medium truncate w-full text-center">{{
                                                            fav.nombre || fav.name }}</span>
                                                    </div>
                                                </template>
                                            </div>
                                        </div>
                                        <div v-else class="text-gray-400 text-center text-xs">No hay favoritos.</div>
                                    </div>
                                </template>
                                <!-- Datos para ADMIN -->
                                <template v-else-if="user.role === 'admin'">
                                    <div class="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                                        <h3 class="font-semibold text-[#2E076B] text-sm mb-2">Administrador</h3>
                                        <p class="text-xs text-[#2E076B]">Este usuario tiene acceso completo al panel de
                                            administración.</p>
                                    </div>
                                </template>
                                <!-- Fecha de creación y otros datos -->
                                <div
                                    class="w-full mt-2 text-xs text-gray-500 flex flex-col md:flex-row md:justify-between gap-2 border-t pt-2">
                                    <div>
                                        <span v-if="user.createdAt">Registrado el {{ formatDate(user.createdAt)
                                            }}</span>
                                        <span v-else>Fecha de registro desconocida</span>
                                    </div>
                                    <div v-if="user.updatedAt">
                                        Última actualización: {{ formatDate(user.updatedAt) }}
                                    </div>
                                    <div class="flex flex-wrap gap-3 mt-1 md:mt-0">
                                        <span v-if="user.favorites && user.favorites.length > 0">Favoritos: {{
                                            user.favorites.length }}</span>
                                        <span v-if="designs && designs.length > 0">Diseños: {{ designs.length }}</span>
                                        <span v-if="user.reportCount && user.reportCount > 0">Reportes: {{
                                            user.reportCount }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-else class="text-center text-gray-400 py-12">
                            Usuario no encontrado.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import AdminSidebar from '../../components/AdminSidebar.vue'
import TopBar from '../../components/TopBar.vue'
import api from '../../services/api'

const defaultImg = 'https://ui-avatars.com/api/?name=User&background=7B6EAD&color=fff'

const route = useRoute()
const router = useRouter()
const user = ref(null)
const designs = ref([])

onMounted(async () => {
    try {
        const id = route.params.id
        const res = await api.get(`admin/users/${id}`)
        user.value = res.data

        // Si el usuario tiene diseños, obtén los datos completos
        if (user.value.designs && user.value.designs.length > 0) {
            const designIds = user.value.designs.map(d => typeof d === 'object' && d.$oid ? d.$oid : d)
            const designPromises = designIds.map(id => api.get(`designs/${id}`))
            const designResponses = await Promise.all(designPromises)
            designs.value = designResponses.map(r => r.data)
        }
    } catch (e) {
        user.value = null
    }
})

async function toggleUserStatus() {
    const nuevoEstado = user.value.status === 'active' ? 'inactive' : 'active'
    const confirmMsg = user.value.status === 'active'
        ? `¿Estás seguro de que quieres desactivar a ${user.value.fullName}?`
        : `¿Deseas activar nuevamente a ${user.value.fullName}?`
    if (!confirm(confirmMsg)) return

    try {
        const res = await api.put(`admin/users/${user.value._id}`, {
            status: nuevoEstado
        })
        user.value.status = nuevoEstado
        alert(`Usuario ${nuevoEstado === 'active' ? 'activado' : 'desactivado'} correctamente.`)
    } catch (e) {
        alert('Hubo un error al actualizar el estado.')
    }
}

function goBack() {
    router.push({ name: 'AdminUsersView' })
}

function logout() { }

function goToEditUser(id) {
    router.push({ name: 'EditUserView', params: { id } })
}

function formatDate(dateStr) {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>