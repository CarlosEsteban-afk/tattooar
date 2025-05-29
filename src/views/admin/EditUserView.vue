<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg sm:pl-64">
        <div class="flex flex-col md:flex-row min-h-screen bg-gray-50">
            <div class="flex-1 overflow-auto w-full">
                <div class="w-full px-2 sm:px-4 md:px-4 p-4 md:p-6 pt-6 md:pt-6 sm:pt-6">
                    <!-- Sidebar -->
                    <AdminSidebar @logout="logout" />
                    <TopBar :title="`Editar Usuario: ${user.nombre} ${user.apellido} (${user.alias})`" :notificationCount="3" />
                    <br />
                    <div class="flex flex-col md:flex-col items-end mb-6 gap-4 px-4">
                        <button @click="goBack"
                            class="mt-4 md:mt-0 px-4 py-2 bg-[#2E076B] text-white rounded hover:bg-purple-900 cursor-pointer">
                            Volver
                        </button>
                    </div>
                    <form @submit.prevent="onSubmit"
                        class="bg-[#7B6EAD] rounded-lg p-4 shadow-lg w-full p-2 sm:p-4 md:p-6">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div class="mb-4">
                                <label class="block text-sm font-medium text-white mb-1">Alias</label>
                                <input type="text" v-model="user.alias" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" />
                            </div>
                            <div class="mb-4">
                                <label class="block text-sm font-medium text-white mb-1">Correo electrónico</label>
                                <input type="email" v-model="user.correo" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" />
                            </div>
                            <div class="mb-4">
                                <label class="block text-sm font-medium text-white mb-1">Nombre</label>
                                <input type="text" v-model="user.nombre" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" />
                            </div>
                            <div class="mb-4">
                                <label class="block text-sm font-medium text-white mb-1">Apellido</label>
                                <input type="text" v-model="user.apellido" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" />
                            </div>
                            <div class="mb-4">
                                <label class="block text-sm font-medium text-white mb-1">Estado</label>
                                <select v-model="user.estado" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 cursor-pointer">
                                    <option value="Activo">Activo</option>
                                    <option value="Inactivo">Inactivo</option>
                                </select>
                            </div>
                            <div class="mb-4">
                                <label class="block text-sm font-medium text-white mb-1">Rol</label>
                                <select v-model="user.rol" required
                                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 cursor-pointer">
                                    <option value="Cliente">Cliente</option>
                                    <option value="Tatuador">Tatuador</option>
                                </select>
                            </div>
                            <div class="mb-4 md:col-span-2 flex flex-col md:flex-row md:items-center gap-6">
                                <div class="flex-1">
                                    <label class="block text-sm font-medium text-white mb-1">Imagen de perfil
                                        (URL)</label>
                                    <input type="text" v-model="user.imagen" placeholder="https://..."
                                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" />
                                </div>
                                <div v-if="user.imagen"
                                    class="flex-shrink-0 text-center mt md:mt-0 flex justify-center bg-white p-2 rounded-md">
                                    <img :src="user.imagen" alt="Previsualización"
                                        class="h-40 w-40 object-cover rounded border-2 border-purple-700 shadow place-content-center" />
                                </div>
                            </div>

                            <!-- Solo para Tatuadores -->
                            <template v-if="user.rol === 'Tatuador'">
                                <div class="mb-4">
                                    <label class="block text-sm font-medium text-white mb-1">Estilos (separados por
                                        coma)</label>
                                    <input type="text" v-model="user.estilos" placeholder="Ej: Realismo, Tradicional"
                                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" />
                                </div>
                                <div class="mb-4">
                                    <label class="block text-sm font-medium text-white mb-1">Ciudades (separadas por
                                        coma)</label>
                                    <input type="text" v-model="user.ciudades" placeholder="Ej: Santiago, Valparaíso"
                                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" />
                                </div>
                                <div class="mb-4">
                                    <label class="block text-sm font-medium text-white mb-1">WhatsApp</label>
                                    <input type="text" v-model="user.whatsapp" placeholder="Ej: 56912345678"
                                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" />
                                </div>
                                <div class="mb-4">
                                    <label class="block text-sm font-medium text-white mb-1">Instagram</label>
                                    <input type="text" v-model="user.instagram" placeholder="Ej: usuario_ig"
                                        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" />
                                </div>
                            </template>
                        </div>
                        <!-- Modal de confirmación antes de guardar -->
                        <div v-if="showConfirmModal"
                            class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
                            @click="showConfirmModal = false">
                            <div class="bg-white rounded-lg p-6 max-w-xs w-full" @click.stop>
                                <p class="mb-4 text-center text-lg">¿Estás seguro de guardar los cambios?</p>
                                <div class="flex justify-end gap-2">
                                    <button @click="showConfirmModal = false"
                                        class="px-4 py-2 bg-gray-300 rounded cursor-pointer">Cancelar</button>
                                    <button @click="confirmSave"
                                        class="px-4 py-2 bg-purple-700 text-white rounded cursor-pointer">Guardar</button>
                                </div>
                            </div>
                        </div>

                        <!-- Modal de éxito -->
                        <div v-if="showSuccessModal"
                            class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
                            @click="showSuccessModal = false">
                            <div class="bg-white rounded-lg p-6 max-w-xs w-full" @click.stop>
                                <p class="mb-4 text-center text-lg text-green-700">¡Cambios guardados correctamente!</p>
                                <div class="flex justify-center">
                                    <button @click="goToUsers"
                                        class="px-4 py-2 bg-purple-700 text-white rounded cursor-pointer">Aceptar</button>
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-end mt-4">
                            <button type="submit"
                                class="px-4 py-2 bg-[#2E076B] text-white rounded-md hover:bg-purple-800 cursor-pointer">
                                Guardar Cambios
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AdminSidebar from '../../components/AdminSidebar.vue'
import TopBar from '../../components/TopBar.vue'   

const router = useRouter()
const showConfirmModal = ref(false)
const showSuccessModal = ref(false)
const user = ref({
    alias: '',
    correo: '',
    nombre: '',
    apellido: '',
    estado: 'Activo',
    rol: 'Cliente',
    imagen: '',
    estilos: '',
    ciudades: '',
    whatsapp: '',
    instagram: ''
})

// Simulate fetching user data based on ID passed in route params
const userId = router.currentRoute.value.params.id

// Fetch user data (this should be replaced with actual API call)
async function fetchUser() {
    // Simulated user data fetching
    const response = await fetch(`http://localhost:3002/users/${userId}`)
    if (response.ok) {
        const data = await response.json()
        user.value = {
            alias: data.alias || '',
            correo: data.correo || '',
            nombre: data.nombre || '',
            apellido: data.apellido || '',
            estado: data.estado || 'Activo',
            rol: data.rol || 'Cliente',
            imagen: data.imagen || '',
            estilos: data.estilos || '',
            ciudades: data.ciudades || '',
            whatsapp: data.whatsapp || '',
            instagram: data.instagram || ''
        }
    }
}

fetchUser()

// Modifica updateUser para mostrar el modal de éxito
function updateUser() {
    fetch(`http://localhost:3002/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user.value)
    }).then(() => {
        showSuccessModal.value = true
    })
}

// Cambia el submit del form para mostrar el modal de confirmación
function onSubmit() {
    showConfirmModal.value = true

}

function goToUsers() {
    showSuccessModal.value = false
    router.push({ name: 'AdminUsersView' })
}

// Llama a updateUser solo si confirma
function confirmSave() {
    showConfirmModal.value = false
    updateUser()
}

function goBack() {
    router.push({ name: 'AdminUsersView' })
}

function logout() {
    // Aquí puedes limpiar datos, cerrar sesión, redirigir, etc.
    // Por ejemplo:
    router.push({ name: 'LandingView' })
}
</script>