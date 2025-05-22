<template>
    <div class="flex flex-col md:flex-row min-h-screen bg-gray-100">
        <!-- Sidebar -->
        <Sidebar @logout="logout" />

        <!-- Main Content -->
        <div class="flex-1 overflow-auto w-full">
            <div class="p-4 md:p-6 pt-16 md:pt-6">
                <!-- Header con título y logo -->
                <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h1 class="text-2xl md:text-4xl font-bold">Administrar Usuarios</h1>
                    <div class="text-xl md:text-2xl font-bold text-purple-900 flex items-center">
                        <div class="flex flex-col items-center py-2 md:py-4 shadow-md">
                            <img src="/assets/Banner.png" alt="Banner" class="h-16 md:h-24 mx-auto mb-2" />
                        </div>
                    </div>
                </div>

                <div class="bg-purple-300 rounded-lg p-4 md:p-6 shadow-lg">
                    <!-- Search and Add User -->
                    <div class="flex flex-col md:flex-row justify-between gap-4 mb-6">
                        <div class="relative w-full md:w-1/3">
                            <input type="text" v-model="searchTerm" placeholder="Buscar usuario..."
                                class="w-full pl-3 pr-10 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600">
                            <button class="absolute right-0 top-0 h-full px-3 text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            </button>
                        </div>
                        <button @click="openAddModal"
                            class="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-md flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                            Agregar Usuario
                        </button>
                    </div>

                    <!-- Users Table - Responsive -->
                    <div class="overflow-x-auto -mx-4 md:mx-0">
                        <div class="inline-block min-w-full align-middle">
                            <div class="overflow-hidden shadow-md">
                                <table class="min-w-full">
                                    <thead class="bg-purple-700 text-white">
                                        <tr>
                                            <th scope="col"
                                                class="px-4 py-3 text-left text-xs md:text-sm font-medium uppercase tracking-wider">
                                                Alias
                                            </th>
                                            <th scope="col"
                                                class="px-4 py-3 text-left text-xs md:text-sm font-medium uppercase tracking-wider hidden md:table-cell">
                                                Correo
                                            </th>
                                            <th scope="col"
                                                class="px-4 py-3 text-left text-xs md:text-sm font-medium uppercase tracking-wider hidden sm:table-cell">
                                                Nombre
                                            </th>
                                            <th scope="col"
                                                class="px-4 py-3 text-left text-xs md:text-sm font-medium uppercase tracking-wider hidden lg:table-cell">
                                                Apellido
                                            </th>
                                            <th scope="col"
                                                class="px-4 py-3 text-left text-xs md:text-sm font-medium uppercase tracking-wider">
                                                Estado
                                            </th>
                                            <th scope="col"
                                                class="px-4 py-3 text-left text-xs md:text-sm font-medium uppercase tracking-wider hidden sm:table-cell">
                                                Rol
                                            </th>
                                            <th scope="col"
                                                class="px-4 py-3 text-left text-xs md:text-sm font-medium uppercase tracking-wider">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody class="bg-purple-900 text-white divide-y divide-purple-800">
                                        <tr v-for="(user, index) in filteredUsers" :key="index"
                                            class="hover:bg-purple-800">
                                            <td class="px-4 py-3 whitespace-nowrap text-xs md:text-sm">
                                                <div class="flex items-center">
                                                    <div class="ml-0">
                                                        <div class="text-sm font-medium">{{ user.alias }}</div>
                                                        <div class="text-xs text-gray-300 md:hidden">{{ user.correo }}
                                                        </div>
                                                        <div class="text-xs text-gray-300 sm:hidden">{{ user.nombre }}
                                                            {{ user.apellido }}</div>
                                                        <div class="text-xs text-gray-300 sm:hidden">{{ user.rol }}
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
                                            <td class="px-4 py-3 whitespace-nowrap text-xs md:text-sm">
                                                <div class="flex space-x-2">
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
                                                    <button @click="toggleUserStatus(user)"
                                                        :class="user.estado === 'Activo' ? 'text-red-500 hover:text-red-700' : 'text-green-400 hover:text-green-600'">
                                                        <svg v-if="user.estado === 'Activo'"
                                                            xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round">
                                                            <path d="M18 6L6 18" />
                                                            <path d="M6 6l12 12" />
                                                        </svg>
                                                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5"
                                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                                            stroke-width="2" stroke-linecap="round"
                                                            stroke-linejoin="round">
                                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                                            <polyline points="22 4 12 14.01 9 11.01" />
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
        <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-lg w-full max-w-lg p-4 md:p-6 max-h-[90vh] overflow-y-auto">
                <h2 class="text-xl md:text-2xl font-bold mb-4">{{ isEditing ? 'Editar Usuario' : 'Agregar Usuario' }}
                </h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Alias</label>
                        <input type="text" v-model="currentUser.alias"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Correo</label>
                        <input type="email" v-model="currentUser.correo"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                        <input type="text" v-model="currentUser.nombre"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                        <input type="text" v-model="currentUser.apellido"
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600">
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
                        class="w-full sm:w-auto px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 order-1 sm:order-2 mb-2 sm:mb-0">
                        Guardar
                    </button>
                </div>
            </div>
        </div>

        <!-- Delete Confirmation Modal - Responsive con fondo más claro -->
        <div v-if="showDeleteModal"
            class="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-lg w-full max-w-md p-4 md:p-6">
                <h2 class="text-xl font-bold mb-4">Confirmar Eliminación</h2>
                <p class="mb-6">¿Estás seguro que deseas eliminar al usuario <span class="font-bold">{{
                    userToDelete.alias }}</span>?</p>

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
</template>

<script setup>
// El script se mantiene igual que en la versión anterior
import { ref, computed, onMounted } from 'vue';
import { initFlowbite } from 'flowbite'
import Sidebar from '../../components/Sidebar.vue';

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
]);

// Estado para búsqueda
const searchTerm = ref('');

// Estado para modales
const showModal = ref(false);
const showDeleteModal = ref(false);
const isEditing = ref(false);
const currentUser = ref({
    alias: '',
    correo: '',
    nombre: '',
    apellido: '',
    estado: 'Activo',
    rol: 'Cliente',
});
const userToDelete = ref({});

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
        rol: 'Usuario',
    }
    showModal.value = true
}

function openEditModal(user) {
    isEditing.value = true
    currentUser.value = { ...user }
    showModal.value = true
}

function closeModal() {
    showModal.value = false;
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
    users.value = users.value.filter(u => u.id !== userToDelete.value.id);
    showDeleteModal.value = false;
}

function toggleUserStatus(user) {
    const index = users.value.findIndex(u => u.id === user.id)
    if (index !== -1) {
        users.value[index].estado = user.estado === 'Activo' ? 'Inactivo' : 'Activo'
    }
}

function logout() {
    // Acción de logout simulada
    alert('Sesión cerrada')
}

onMounted(() => {
    initFlowbite()
    console.log('Componente montado, usuarios cargados');
});
</script>

<style>
body {
    font-family: 'Arial', sans-serif;
}

/* Personalización de Flowbite/Tailwind */
.bg-purple-900 {
    background-color: #2d1b69;
}

.bg-purple-800 {
    background-color: #3c2a85;
}

.bg-purple-700 {
    background-color: #4c3599;
}

.bg-purple-300 {
    background-color: #b8a9e1;
}

.text-red-500 {
    color: #ef4444;
}

.text-green-400 {
    color: #4ade80;
}

/* Media queries para mejorar la responsividad */
@media (max-width: 640px) {
    .overflow-x-auto {
        margin-left: -1rem;
        margin-right: -1rem;
        padding-left: 1rem;
        padding-right: 1rem;
    }
}
</style>