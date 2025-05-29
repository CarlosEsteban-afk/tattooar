<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg sm:pl-64">
        <div class="flex flex-col md:flex-row min-h-screen bg-purple-200">
            <!-- Main Content -->
            <div class="flex-1 overflow-auto w-full">
                <div class="p-4 md:p-6 pt-6 md:pt-6 sm:pt-6">
                    <!-- Sidebar -->
                    <AdminSidebar @logout="logout" />
                    <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <h1 class="text-5xl md:text-5xl font-regular" style="font-family: 'Pirata One', cursive">
                            Administrar Usuarios
                        </h1>
                    </div>

                    <div class="bg-[#7B6EAD] rounded-lg p-4 md:p-6 shadow-lg">
                        <!-- Searchbar -->
                        <div class="flex flex-col md:flex-row justify-between gap-4 mb-6">
                            <div class="relative w-full md:w-1/3">
                                <input type="text" v-model="searchTerm" placeholder="Buscar usuario..."
                                    class="w-full pl-3 pr-10 bg-white py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600" />
                                <button class="absolute right-0 top-0 h-full px-3 text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <!-- Users Table -->
                        <div class="overflow-x-auto mx-4 md:mx-0">
                            <div class="inline-block min-w-full align-middle">
                                <div class="overflow-hidden shadow-md">
                                    <table class="min-w-full">
                                        <thead class="text-white">
                                            <tr>
                                                <th scope="col"
                                                    class="px-4 py-3 text-left text-xs md:text-sm font-medium tracking-wider">
                                                    Alias
                                                </th>
                                                <th scope="col"
                                                    class="px-4 py-3 text-left text-xs md:text-sm font-medium tracking-wider hidden md:table-cell">
                                                    Correo
                                                </th>
                                                <th scope="col"
                                                    class="px-4 py-3 text-left text-xs md:text-sm font-medium tracking-wider hidden sm:table-cell">
                                                    Nombre
                                                </th>
                                                <th scope="col"
                                                    class="px-4 py-3 text-left text-xs md:text-sm font-medium tracking-wider hidden lg:table-cell">
                                                    Apellido
                                                </th>
                                                <th scope="col"
                                                    class="px-4 py-3 text-left text-xs md:text-sm font-medium tracking-wider">
                                                    Estado
                                                </th>
                                                <th scope="col"
                                                    class="px-4 py-3 text-left text-xs md:text-sm font-medium tracking-wider hidden sm:table-cell">
                                                    Rol
                                                </th>
                                                <th scope="col"
                                                    class="px-4 py-3 text-left text-xs md:text-sm font-medium tracking-wider">
                                                    Acciones
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody
                                            class="bg-[#2E076B] text-white divide-y divide-y-[4px] divide-purple-800">
                                            <tr v-if="loadError">
                                                <td colspan="7" class="text-center py-8 text-red-500 text-xl">
                                                    No se pudieron cargar los usuarios
                                                </td>
                                            </tr>
                                            <tr v-else-if="filteredUsers.length === 0">
                                                <td colspan="7" class="text-center py-8 text-white text-lg">
                                                    No hay usuarios para mostrar
                                                </td>
                                            </tr>
                                            <tr v-for="(user, index) in filteredUsers" :key="user.id"
                                                class="hover:bg-purple-800">
                                                <td class="px-4 py-3 whitespace-nowrap text-xs md:text-sm">
                                                    <div class="flex space-x-2">
                                                        <div class="ml-0">
                                                            <div class="text-sm font-medium">{{ user.alias }}</div>
                                                            <div class="text-xs text-gray-300 md:hidden">
                                                                {{ user.correo }}
                                                            </div>
                                                            <div class="text-xs text-gray-300 sm:hidden">
                                                                {{ user.nombre }} {{ user.apellido }}
                                                            </div>
                                                            <div class="text-xs text-gray-300 sm:hidden">
                                                                {{ user.rol }}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td
                                                    class="px-4 py-3 whitespace-nowrap text-xs md:text-sm hidden md:table-cell">
                                                    {{ user.correo }}
                                                </td>
                                                <td
                                                    class="px-4 py-3 whitespace-nowrap text-xs md:text-sm hidden sm:table-cell">
                                                    {{ user.nombre }}
                                                </td>
                                                <td
                                                    class="px-4 py-3 whitespace-nowrap text-xs md:text-sm hidden lg:table-cell">
                                                    {{ user.apellido }}
                                                </td>
                                                <td class="px-4 py-3 whitespace-nowrap text-xs md:text-sm">
                                                    <span
                                                        :class="user.estado === 'Activo' ? 'text-green-400' : 'text-red-500'">
                                                        {{ user.estado }}
                                                    </span>
                                                </td>
                                                <td
                                                    class="px-4 py-3 whitespace-nowrap text-xs md:text-sm hidden sm:table-cell">
                                                    {{ user.rol }}
                                                </td>

                                                <!-- Acciones -->
                                                <td class="px-4 py-3 whitespace-nowrap text-xs md:text-sm">
                                                    <div class="flex space-x-4">
                                                        <button @click="goToEditUser(user.id)"
                                                            class="text-white-400 hover:text-blue-500 cursor-pointer">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                                stroke-width="2" stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                                <path
                                                                    d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                                <path
                                                                    d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                            </svg>
                                                        </button>
                                                        <button @click="confirmDelete(user)"
                                                            class="text-red-500 hover:text-red-700 cursor-pointer">
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                                stroke-width="2" stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                                <polyline points="3 6 5 6 21 6" />
                                                                <path
                                                                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                                <line x1="10" y1="11" x2="10" y2="17" />
                                                                <line x1="14" y1="11" x2="14" y2="17" />
                                                            </svg>
                                                        </button>
                                                        <button @click="goToUserDetail(user.id)"
                                                            class="text-purple-300 text-lg hover:text-white-100 ml-4 cursor-pointer">
                                                            <u>
                                                                Ver detalle
                                                            </u>
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
            </div>

            <!-- Delete Confirmation Modal -->
            <div v-if="showDeleteModal" class="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/40"
                @click="showDeleteModal = false">
                <div class="bg-white rounded-lg w-full max-w-md p-4 md:p-6" @click.stop>
                    <h2 class="text-xl font-bold mb-4">Confirmar Eliminación</h2>
                    <p class="mb-6">
                        ¿Estás seguro que deseas eliminar al usuario
                        <span class="font-bold">{{ userToDelete.alias }}</span>?
                    </p>
                    <div class="flex flex-col sm:flex-row justify-end gap-3">
                        <button @click="showDeleteModal = false"
                            class="w-full sm:w-auto px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 order-2 sm:order-1">
                            Cancelar
                        </button>
                        <button @click="deleteUser"
                            class="w-full sm:w-auto px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 order-1 sm:order-2 mb-2 sm:mb-0">
                            Eliminar
                        </button>
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

onMounted(() => {
    initFlowbite()
    fetchUsers()
})

const router = useRouter()
const users = ref([])
const loadError = ref(false)


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

// Estado para modales
const showDeleteModal = ref(false)
const userToDelete = ref({})

// Usuarios filtrados por término de búsqueda
const filteredUsers = computed(() => {
    if (!searchTerm.value) return users.value
    const term = searchTerm.value.toLowerCase()
    return users.value.filter(user =>
        Object.values(user).some(val =>
            String(val).toLowerCase().includes(term)
        )
    )
})

function goToEditUser(id) {
    router.push({ name: 'EditUserView', params: { id } })
}

function confirmDelete(user) {
    userToDelete.value = user
    showDeleteModal.value = true
}

function deleteUser() {
    users.value = users.value.filter(u => u.id !== userToDelete.value.id)
    showDeleteModal.value = false
}

function goToUserDetail(userId) {
    router.push({ name: 'UserDetail', params: { id: userId } })
}

function logout() {
    // Acción de logout simulada
    alert('Sesión cerrada')
}
</script>