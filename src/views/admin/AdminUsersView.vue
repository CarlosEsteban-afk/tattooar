<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg sm:pl-64">
        <div class="flex flex-col md:flex-row min-h-screen bg-gray-100">
            <!-- Main Content -->
            <div class="flex-1 overflow-auto w-full">
                <div class="p-4 md:p-6 pt-6 md:pt-6 sm:pt-6">
                    <!-- Header con título y logo -->
                    <div class="">
                        <Sidebar @logout="logout" />
                    </div>
                    <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <h1 class="text-5xl md:text-5xl font-regular" style="font-family: 'Pirata One', cursive">
                            Administrar Usuarios
                        </h1>

                        <div class="text-xl md:text-2xl font-bold text-purple-900 flex items-left">
                            <div class="flex flex-col items-center py-2">
                                <img src="/assets/Banner.png" alt="Banner" class="h-16 md:h-16 mx-auto mb-2 mr-6" />
                            </div>
                        </div>
                    </div>

                    <div class="bg-[#7B6EAD] rounded-lg p-4 md:p-6 shadow-lg">
                        <!-- Search and Add User -->
                        <div class="flex flex-col md:flex-row justify-between gap-4 mb-6">
                            <div class="relative w-full md:w-1/3">
                                <input type="text" v-model="searchTerm" placeholder="Buscar usuario..."
                                    class="w-full pl-3 pr-10 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600" />
                                <button class="absolute right-0 top-0 h-full px-3 text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                    </svg>
                                </button>
                            </div>
                            <div class="flex items-center justify-end w-full md:w-1/3">
                                <button @click="openAddModal"
                                    class="bg-[#2E076B] hover:bg-purple-800 text-white p-2  rounded-md flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                    Agregar Usuario
                                </button>
                            </div>

                        </div>

                        <!-- Users Table - Responsive -->
                        <div class="overflow-x-auto -mx-4 md:mx-0">
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
                                                        <button @click="openEditModal(user)"
                                                            class="text-blue-400 hover:text-blue-600">
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
                                                            class="text-red-500 hover:text-red-700">
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
                                                            class="text-blue-400 text-lg hover:text-white-100 ml-4">
                                                            <u>
                                                                Ir al detalle
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

            <!-- Add/Edit User Modal - Responsive con fondo más claro -->
            <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50 p-4"
                style="background-color: rgba(0, 0, 0, 0.3);">
                <div class="bg-white rounded-lg w-full max-w-lg p-4 md:p-6 max-h-[90vh] overflow-y-auto">
                    <h2 class="text-xl md:text-2xl font-bold mb-4">
                        {{ isEditing ? 'Editar Usuario' : 'Agregar Usuario' }}
                    </h2>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Alias</label>
                            <input type="text" v-model="currentUser.alias"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Correo</label>
                            <input type="email" v-model="currentUser.correo"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                            <input type="text" v-model="currentUser.nombre"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                            <input type="text" v-model="currentUser.apellido"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" />
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                            <select v-model="currentUser.estado"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600">
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                            <select v-model="currentUser.rol"
                                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600">
                                <option value="Cliente">Cliente</option>
                                <option value="Administrador">Administrador</option>
                                <option value="Tatuador">Tatuador</option>
                            </select>
                        </div>
                    </div>

                    <div class="flex flex-col sm:flex-row justify-end gap-3">
                        <button @click="closeModal"
                            class="w-full sm:w-auto px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 order-2 sm:order-1">
                            Cancelar
                        </button>
                        <button @click="saveUser"
                            class="w-full sm:w-auto px-4 py-2 bg-[#2E076B] text-white rounded-md hover:bg-purple-800 order-1 sm:order-2 mb-2 sm:mb-0">
                            Guardar
                        </button>
                    </div>
                </div>
            </div>

            <!-- Delete Confirmation Modal - Responsive con fondo más claro -->
            <div v-if="showDeleteModal" class="fixed inset-0 flex items-center justify-center z-50 p-4"
                style="background-color: rgba(0, 0, 0, 0.3);">
                <div class="bg-white rounded-lg w-full max-w-md p-4 md:p-6">
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
import Sidebar from '../../components/Sidebar.vue'

onMounted(() => {
    initFlowbite()
})

const router = useRouter()

// Estado para los usuarios
const users = ref([
    {
        id: 1,
        alias: 'hector32',
        correo: 'hector32@gmail.com',
        nombre: 'Hector',
        apellido: 'Salamanca',
        estado: 'Inactivo',
        rol: 'Cliente'
    },
    {
        id: 2,
        alias: 'Carlostatuaje',
        correo: 'carlos70@gmail.com',
        nombre: 'Carlos',
        apellido: 'Mora',
        estado: 'Activo',
        rol: 'Tatuador'
    },
    {
        id: 3,
        alias: 'ManuTat',
        correo: 'manuel123@gmail.com',
        nombre: 'Manuel',
        apellido: 'Escobar',
        estado: 'Inactivo',
        rol: 'Tatuador'
    },
    {
        id: 4,
        alias: 'Sinestesia',
        correo: 'sintattoo@gmail.com',
        nombre: 'Felipe',
        apellido: 'Oporto',
        estado: 'Activo',
        rol: 'Tatuador'
    },
    {
        id: 5,
        alias: 'Agatattoo',
        correo: 'agathai@gmail.com',
        nombre: 'Agatha',
        apellido: 'Inostroza',
        estado: 'Inactivo',
        rol: 'Tatuador'
    },
    {
        id: 6,
        alias: 'Juanito',
        correo: 'juanin@gmail.com',
        nombre: 'Juan',
        apellido: 'Pérez',
        estado: 'Activo',
        rol: 'Cliente'
    },
    {
        id: 7,
        alias: 'HansInk',
        correo: 'hanzsoto@gmail.com',
        nombre: 'Hanz',
        apellido: 'Soto',
        estado: 'Activo',
        rol: 'Tatuador'
    }
])

const currentUser = ref({
    alias: '',
    correo: '',
    nombre: '',
    apellido: '',
    estado: 'Activo',
    rol: 'Cliente'
})

// Estado para búsqueda
const searchTerm = ref('')

// Estado para modales
const showModal = ref(false)
const showDeleteModal = ref(false)
const isEditing = ref(false)

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

// Funciones para el CRUD
function openAddModal() {
    isEditing.value = false
    currentUser.value = {
        alias: '',
        correo: '',
        nombre: '',
        apellido: '',
        estado: 'Activo',
        rol: 'Cliente'
    }
    showModal.value = true
}

function openEditModal(user) {
    isEditing.value = true
    currentUser.value = { ...user }
    showModal.value = true
}

function closeModal() {
    showModal.value = false
}

function saveUser() {
    if (isEditing.value) {
        const index = users.value.findIndex(u => u.id === currentUser.value.id)
        if (index !== -1) {
            users.value[index] = { ...currentUser.value }
        }
    } else {
        // Generar un nuevo ID para el usuario
        const newId = Math.max(0, ...users.value.map(u => u.id)) + 1
        users.value.push({
            ...currentUser.value,
            id: newId
        })
    }
    showModal.value = false
}

function confirmDelete(user) {
    userToDelete.value = user
    showDeleteModal.value = true
}

function deleteUser() {
    users.value = users.value.filter(u => u.id !== userToDelete.value.id)
    showDeleteModal.value = false
}

function toggleUserStatus(user) {
    const index = users.value.findIndex(u => u.id === user.id)
    if (index !== -1) {
        users.value[index].estado = user.estado === 'Activo' ? 'Inactivo' : 'Activo'
    }
}

function goToUserDetail(userId) {
    router.push({ name: 'UserDetail', params: { id: userId } })
}

function logout() {
    // Acción de logout simulada
    alert('Sesión cerrada')
}
</script>

<style scoped></style>