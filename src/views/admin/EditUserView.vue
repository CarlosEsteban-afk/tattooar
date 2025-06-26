<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg sm:pl-64">
        <div class="flex flex-col md:flex-row min-h-screen bg-gray-50">
            <div class="flex-1 overflow-auto w-full">
                <div class="w-full px-2 sm:px-4 md:px-4 p-4 md:p-6 pt-6 md:pt-6 sm:pt-6">
                    <!-- Sidebar y TopBar -->
                    <AdminSidebar @logout="logout" />
                    <TopBar :title="`Editar Usuario: ${user.nombre} ${user.apellido} (${user.alias})`"
                        :notificationCount="3" />
                    <br />
                    <div class="flex justify-center">
                        <form @submit.prevent="onSubmit"
                            class="bg-white rounded-2xl shadow-2xl border border-purple-200 p-8 w-full max-w-2xl relative">
                            <!-- Botón Volver arriba a la izquierda dentro del form -->
                            <button @click.prevent="goBack" type="button"
                                class="absolute top-2 left-8 px-4 py-2 my-2 bg-purple-100 text-[#2E076B] rounded-lg hover:bg-purple-200 font-semibold shadow transition"
                                style="margin-bottom: 1rem;">
                                Volver
                            </button>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                                <div>
                                    <label class="block text-sm font-semibold text-[#2E076B] mb-1">Alias</label>
                                    <input type="text" v-model="user.alias" required
                                        class="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-[#2E076B] mb-1">Correo
                                        electrónico</label>
                                    <input type="email" v-model="user.correo" required
                                        class="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-[#2E076B] mb-1">Nombre</label>
                                    <input type="text" v-model="user.nombre" required
                                        class="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-[#2E076B] mb-1">Apellido</label>
                                    <input type="text" v-model="user.apellido" required
                                        class="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-[#2E076B] mb-1">Estado</label>
                                    <select v-model="user.estado" required
                                        class="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition cursor-pointer">
                                        <option value="Activo">Activo</option>
                                        <option value="Inactivo">Inactivo</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-[#2E076B] mb-1">Rol</label>
                                    <select v-model="user.rol" required
                                        class="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition cursor-pointer">
                                        <option value="Cliente">Cliente</option>
                                        <option value="Tatuador">Tatuador</option>
                                    </select>
                                </div>
                                <div class="md:col-span-2 flex flex-col md:flex-row md:items-center gap-6">
                                    <div class="flex-1">
                                        <label class="block text-sm font-semibold text-[#2E076B] mb-1">Imagen de perfil
                                            (URL)</label>
                                        <input type="text" v-model="user.imagen" placeholder="https://..."
                                            class="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />
                                    </div>
                                    <div v-if="user.imagen"
                                        class="flex-shrink-0 flex justify-center items-center bg-purple-50 p-2 rounded-lg border border-purple-200">
                                        <img :src="user.imagen" alt="Previsualización"
                                            class="h-32 w-32 object-cover rounded-full border-4 border-purple-400 shadow" />
                                    </div>
                                </div>
                                <!-- Solo para Tatuadores -->
                                <template v-if="user.rol === 'Tatuador'">
                                    <div>
                                        <label class="block text-sm font-semibold text-[#2E076B] mb-1">Estilos
                                            (separados por coma)</label>
                                        <input type="text" v-model="user.estilos"
                                            placeholder="Ej: Realismo, Tradicional"
                                            class="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-[#2E076B] mb-1">Ciudades
                                            (separadas por coma)</label>
                                        <input type="text" v-model="user.ciudades"
                                            placeholder="Ej: Santiago, Valparaíso"
                                            class="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-[#2E076B] mb-1">WhatsApp</label>
                                        <input type="text" v-model="user.whatsapp" placeholder="Ej: 56912345678"
                                            class="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-[#2E076B] mb-1">Instagram</label>
                                        <input type="text" v-model="user.instagram" placeholder="Ej: usuario_ig"
                                            class="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />
                                    </div>
                                </template>
                            </div>
                            <!-- Modal de confirmación antes de guardar -->
                            <div v-if="showConfirmModal"
                                class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
                                @click="showConfirmModal = false">
                                <div class="bg-white rounded-lg p-6 max-w-xs w-full shadow-xl" @click.stop>
                                    <p class="mb-4 text-center text-lg text-[#2E076B] font-semibold">¿Estás seguro de
                                        guardar los cambios?</p>
                                    <div class="flex justify-end gap-2">
                                        <button @click="showConfirmModal = false"
                                            class="px-4 py-2 bg-gray-200 text-[#2E076B] rounded font-semibold hover:bg-gray-300 transition">Cancelar</button>
                                        <button @click="confirmSave"
                                            class="px-4 py-2 bg-purple-700 text-white rounded font-semibold hover:bg-purple-800 transition">Guardar</button>
                                    </div>
                                </div>
                            </div>
                            <!-- Modal de éxito -->
                            <div v-if="showSuccessModal"
                                class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
                                @click="showSuccessModal = false">
                                <div class="bg-white rounded-lg p-6 max-w-xs w-full shadow-xl" @click.stop>
                                    <p class="mb-4 text-center text-lg text-green-700 font-semibold">¡Cambios guardados
                                        correctamente!</p>
                                    <div class="flex justify-center">
                                        <button @click="goToUsers"
                                            class="px-4 py-2 bg-purple-700 text-white rounded font-semibold hover:bg-purple-800 transition">Aceptar</button>
                                    </div>
                                </div>
                            </div>
                            <div class="flex justify-end mt-8">
                                <button type="submit"
                                    class="px-6 py-2 bg-[#2E076B] text-white rounded-lg font-semibold hover:bg-purple-800 transition shadow">
                                    Guardar Cambios
                                </button>
                            </div>
                        </form>
                    </div>
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
import api from '../../services/api'

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
    try {
        const response = await api.get(`admin/users/${userId}`)
        const data = response.data
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
    } catch (error) {
        console.error('Error al cargar usuario:', error)
    }
}

fetchUser()

async function updateUser() {
    try {
        await api.put(`admin/users/${userId}`, user.value)
        showSuccessModal.value = true
    } catch (error) {
        console.error('Error al actualizar usuario:', error)
    }
}

function onSubmit() {
    showConfirmModal.value = true
}

function goToUsers() {
    showSuccessModal.value = false
    router.push({ name: 'AdminUsersView' })
}

function confirmSave() {
    showConfirmModal.value = false
    updateUser()
}

function goBack() {
    router.push({ name: 'AdminUsersView' })
}

function logout() {
    router.push({ name: 'LandingView' })
}
</script>