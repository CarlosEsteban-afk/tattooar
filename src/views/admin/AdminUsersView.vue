<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg sm:pl-64">
        <div class="flex flex-col md:flex-row min-h-screen bg-gray-50">
            <!-- Main Content -->
            <div class="flex-1 overflow-auto w-full">
                <div class="p-4 md:p-4 pt-6 md:pt-6 sm:pt-6">
                    <!-- Sidebar -->
                    <AdminSidebar @logout="logout" />
                    <TopBar title="Administración de Usuarios" :notificationCount="3" />
                    <br />
                    <!-- Searchbar y filtros en una sola fila -->
                    <div class="flex flex-col md:flex-row justify-between gap-4 mb-6">
                        <div class="relative w-full max-w-md">
                            <input v-model="searchTerm" type="text" placeholder="Buscar usuarios..."
                                class="form-input w-full rounded-lg border-gray-300 shadow-md bg-white text-gray-800 pr-10" />
                            <span
                                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            </span>
                        </div>
                        <!-- Filtros sobre la tabla -->
                        <div class="flex flex-wrap gap-2 items-center">
                            <label class="text-sm font-medium">Estado:</label>
                            <div class="relative">
                                <select v-model="filterEstado"
                                    class="bg-[#2E076B] text-white hover:bg-[#38158A] focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
                                    <option value="">Todos</option>
                                    <option value="Activo">Activo</option>
                                    <option value="Inactivo">Inactivo</option>
                                </select>
                            </div>
                            <label class="text-sm font-medium ml-2">Rol:</label>
                            <div class="relative">
                                <select v-model="filterRol"
                                    class="bg-[#2E076B] text-white hover:bg-[#38158A] focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
                                    <option value="">Todos</option>
                                    <option value="Tatuador">Tatuador</option>
                                    <option value="Cliente">Cliente</option>
                                    <!-- Agrega más roles si tienes -->
                                </select>
                            </div>
                        </div>
                    </div>

                    <!-- Tabla de usuarios estilo logs -->
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg border border-gray-300">
                        <table class="w-full text-sm text-left text-black">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-6 py-3">Alias</th>
                                    <th scope="col" class="px-6 py-3 hidden md:table-cell">Correo</th>
                                    <th scope="col" class="px-6 py-3 hidden sm:table-cell">Nombre</th>
                                    <th scope="col" class="px-6 py-3 hidden lg:table-cell">Apellido</th>
                                    <th scope="col" class="px-6 py-3">Estado</th>
                                    <th scope="col" class="px-6 py-3 hidden sm:table-cell">Rol</th>
                                    <th scope="col" class="px-6 py-3">Detalle</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-if="loadError">
                                    <td colspan="7" class="text-center py-8 text-red-500 text-xl">
                                        No se pudieron cargar los usuarios
                                    </td>
                                </tr>
                                <tr v-else-if="filteredUsers.length === 0">
                                    <td colspan="7" class="text-center py-8 text-gray-500 text-lg">
                                        No hay usuarios para mostrar
                                    </td>
                                </tr>
                                <tr v-for="(user, index) in filteredUsers" :key="user.id"
                                    class="odd:bg-white even:bg-gray-50 border-b border-gray-200 hover:bg-purple-50 transition">
                                    <td class="px-6 py-4 whitespace-nowrap text-xs md:text-sm">
                                        <div class="flex space-x-2">
                                            <div class="ml-0">
                                                <div class="text-sm font-medium text-gray-900">{{ user.alias }}</div>
                                                <div class="text-xs text-gray-400 md:hidden">
                                                    {{ user.correo }}
                                                </div>
                                                <div class="text-xs text-gray-400 sm:hidden">
                                                    {{ user.nombre }} {{ user.apellido }}
                                                </div>
                                                <div class="text-xs text-gray-400 sm:hidden">
                                                    {{ user.rol }}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-xs md:text-sm hidden md:table-cell">
                                        {{ user.correo }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-xs md:text-sm hidden sm:table-cell">
                                        {{ user.nombre }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-xs md:text-sm hidden lg:table-cell">
                                        {{ user.apellido }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-xs md:text-sm">
                                        <span
                                            :class="user.estado === 'Activo' ? 'text-green-500 font-semibold' : 'text-red-500 font-semibold'">
                                            {{ user.estado }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-xs md:text-sm hidden sm:table-cell">
                                        {{ user.rol }}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-xs md:text-sm">
                                        <div class="flex space-x-4">
                                            <button @click="goToUserDetail(user.id)"
                                                class="text-purple-700 hover:text-purple-900 border rounded-sm cursor-pointer p-1"
                                                title="Ver detalle">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 m-1" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { initFlowbite } from 'flowbite'
import AdminSidebar from '../../components/AdminSidebar.vue'
import TopBar from '../../components/TopBar.vue'

onMounted(() => {
    initFlowbite()
    fetchUsers()
})

const router = useRouter()
const users = ref([])
const loadError = ref(false)
const filterEstado = ref('')
const filterRol = ref('')

async function fetchUsers() {
    try {
        const response = await fetch('http://localhost:3002/users')
        if (!response.ok) throw new Error('Error al obtener los usuarios')
        users.value = await response.json()
        loadError.value = false
    } catch (error) {
        console.error('Error al cargar usuarios:', error)
        loadError.value = true
    }
}

// Estado para búsqueda
const searchTerm = ref('')

// Usuarios filtrados por término de búsqueda
const filteredUsers = computed(() => {
    let result = users.value
    if (filterEstado.value) {
        result = result.filter(u => u.estado === filterEstado.value)
    }
    if (filterRol.value) {
        result = result.filter(u => u.rol === filterRol.value)
    }
    if (searchTerm.value) {
        const term = searchTerm.value.toLowerCase()
        result = result.filter(user =>
            Object.values(user).some(val =>
                String(val).toLowerCase().includes(term)
            )
        )
    }
    return result
})

function goToUserDetail(userId) {
    router.push({ name: 'UserDetail', params: { id: userId } })
}

function logout() {
    // Acción de logout simulada
    alert('Sesión cerrada')
}
</script>