<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg sm:pl-64">
        <div class="flex flex-col md:flex-row min-h-screen bg-gray-50">
            <div class="flex-1 overflow-auto w-full">
                <div class="w-full px-2 sm:px-4 md:px-4 p-4 md:p-6 pt-6 md:pt-6 sm:pt-6">
                    <!-- Sidebar y TopBar -->
                    <AdminSidebar @logout="logout" />
                    <TopBar :title="`Editar Usuario: ${user.fullName}`" :notificationCount="3" />
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
                                    <label class="block text-sm font-semibold text-[#2E076B] mb-1">Nombre de
                                        usuario</label>
                                    <input type="text" v-model="user.username" :required="isUsernameRequired"
                                        class="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-[#2E076B] mb-1">Correo
                                        electrónico</label>
                                    <input type="email" v-model="user.email" required
                                        class="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-[#2E076B] mb-1">Nombre
                                        completo</label>
                                    <input type="text" v-model="user.fullName" required
                                        class="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-[#2E076B] mb-1">Estado</label>
                                    <select v-model="user.status" required
                                        class="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition cursor-pointer">
                                        <option value="active">Activo</option>
                                        <option value="inactive">Inactivo</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-semibold text-[#2E076B] mb-1">Rol</label>
                                    <select v-model="user.role" required
                                        class="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition cursor-pointer">
                                        <option value="client">Cliente</option>
                                        <option value="tattooer">Tatuador</option>
                                        <option value="admin">Administrador</option>
                                    </select>
                                </div>
                                <div class="md:col-span-2 flex flex-col md:flex-row md:items-center gap-6">
                                    <div class="flex-1">
                                        <label class="block text-sm font-semibold text-[#2E076B] mb-1">Imagen de perfil</label>
                                        <input type="file" accept="image/*" @change="onFileChange"
                                            class="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />
                                    </div>
                                    <div v-if="user.profileImageUrl"
                                        class="flex-shrink-0 flex justify-center items-center bg-purple-50 p-2 rounded-lg border border-purple-200">
                                        <img :src="user.profileImageUrl" alt="Previsualización"
                                            class="h-32 w-32 object-cover rounded-full border-4 border-purple-400 shadow" />
                                    </div>
                                </div>
                                <!-- Solo para Tatuadores -->
                                <template v-if="user.role === 'tattooer'">
                                    <div>
                                        <label class="block text-sm font-semibold text-[#2E076B] mb-1">Estilos</label>
                                        <multiselect v-model="user.styles" :options="stylesOptions" :multiple="true"
                                            :close-on-select="false" :clear-on-select="false" :preserve-search="true"
                                            placeholder="Selecciona uno o más estilos" label="label" track-by="value"
                                            class="mb-2" />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-[#2E076B] mb-1">Ciudades</label>
                                        <multiselect v-model="user.cities" :options="citiesOptions" :multiple="true"
                                            :close-on-select="false" :clear-on-select="false" :preserve-search="true"
                                            placeholder="Selecciona una o más ciudades" label="label" track-by="value"
                                            class="mb-2" />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-[#2E076B] mb-1">WhatsApp</label>
                                        <input type="text" v-model="user.socialMedia.whatsapp"
                                            placeholder="Ej: 56912345678"
                                            class="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-[#2E076B] mb-1">Instagram</label>
                                        <input type="text" v-model="user.socialMedia.instagram"
                                            placeholder="Ej: usuario_ig"
                                            class="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />
                                    </div>
                                    <div>
                                        <label class="block text-sm font-semibold text-[#2E076B] mb-1">Facebook</label>
                                        <input type="text" v-model="user.socialMedia.facebook"
                                            placeholder="Ej: usuario_fb"
                                            class="w-full px-3 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />
                                    </div>
                                </template>
                                <!-- Solo para Clientes -->
                                <template v-if="user.role === 'client'">
                                    <div class="md:col-span-2">
                                        <label class="block text-sm font-semibold text-[#2E076B] mb-1">Diseños
                                            Favoritos</label>
                                        <div class="bg-gray-50 p-3 rounded-lg border border-gray-200">
                                            <p class="text-sm text-gray-600">
                                                {{ user.favorites ? user.favorites.length : 0 }} diseños favoritos
                                            </p>
                                            <p class="text-xs text-gray-500 mt-1">
                                                Los favoritos se gestionan desde la vista de usuario
                                            </p>
                                        </div>
                                    </div>
                                </template>
                                <!-- Solo para Administradores -->
                                <template v-if="user.role === 'admin'">
                                    <div class="md:col-span-2">
                                        <label class="block text-sm font-semibold text-[#2E076B] mb-1">Información de
                                            Administrador</label>
                                        <div class="bg-purple-50 p-3 rounded-lg border border-purple-200">
                                            <p class="text-sm text-purple-700">
                                                Usuario con privilegios de administrador
                                            </p>
                                            <p class="text-xs text-purple-600 mt-1">
                                                Acceso completo al panel de administración
                                            </p>
                                        </div>
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
                            <div v-if="uploading" class="text-xs text-gray-500">Subiendo imagen...</div>
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
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import AdminSidebar from '../../components/AdminSidebar.vue'
import TopBar from '../../components/TopBar.vue'
import api from '../../services/api'
import Multiselect from 'vue-multiselect'

const router = useRouter()
const showConfirmModal = ref(false)
const showSuccessModal = ref(false)
const user = ref({
    username: '',
    email: '',
    fullName: '',
    status: 'active',
    role: 'client',
    profileImageUrl: '',
    styles: [],
    cities: [],
    socialMedia: {
        whatsapp: '',
        instagram: '',
        facebook: ''
    },
    favorites: [],
    designs: [],
    portfolio: [],
    reportCount: 0
})

const stylesOptions = [
    { value: 'moderno', label: 'Moderno' },
    { value: 'tradicional', label: 'Tradicional' },
    { value: 'realista', label: 'Realista' },
    { value: 'geométrico', label: 'Geométrico' },
    { value: 'minimalista', label: 'Minimalista' },
    { value: 'japones', label: 'Japonés' },
    { value: 'tribal', label: 'Tribal' },
    { value: 'acuarela', label: 'Acuarela' },
    { value: 'blackwork', label: 'Blackwork' }
]

const citiesOptions = [
    { value: 'Santiago', label: 'Santiago' },
    { value: 'Valparaíso', label: 'Valparaíso' },
    { value: 'Concepción', label: 'Concepción' },
    { value: 'La Serena', label: 'La Serena' },
    { value: 'Antofagasta', label: 'Antofagasta' },
    { value: 'Temuco', label: 'Temuco' },
    { value: 'Arica', label: 'Arica' },
    { value: 'Puerto Montt', label: 'Puerto Montt' }
]

// Simulate fetching user data based on ID passed in route params
const userId = router.currentRoute.value.params.id

// Fetch user data (this should be replaced with actual API call)
async function fetchUser() {
    try {
        const response = await api.get(`admin/users/${userId}`)
        const data = response.data
        user.value = {
            username: data.username || '',
            email: data.email || '',
            fullName: data.fullName || '',
            status: data.status || 'active',
            role: data.role || 'client',
            profileImageUrl: data.profileImageUrl || '',
            styles: (data.styles || []).map(val => stylesOptions.find(opt => opt.value === val)).filter(Boolean),
            cities: (data.cities || []).map(val => citiesOptions.find(opt => opt.value === val)).filter(Boolean),
            socialMedia: {
                whatsapp: data.socialMedia?.whatsapp || '',
                instagram: data.socialMedia?.instagram || '',
                facebook: data.socialMedia?.facebook || ''
            },
            favorites: data.favorites || [],
            designs: data.designs || [],
            portfolio: data.portfolio || [],
            reportCount: data.reportCount || 0
        }
    } catch (error) {
        console.error('Error al cargar usuario:', error)
        alert('Error al cargar los datos del usuario')
    }
}

// Cargar datos al montar el componente
onMounted(() => {
    fetchUser()
})

async function updateUser() {
    try {
        // Preparar los datos para enviar
        const userData = {
            username: user.value.username,
            email: user.value.email,
            fullName: user.value.fullName,
            status: user.value.status,
            role: user.value.role,
            profileImageUrl: user.value.profileImageUrl,
            styles: user.value.styles.map(opt => opt.value),
            cities: user.value.cities.map(opt => opt.value),
            socialMedia: user.value.socialMedia
        }

        await api.put(`admin/users/${userId}`, userData)
        showSuccessModal.value = true
    } catch (error) {
        console.error('Error al actualizar usuario:', error)
        alert('Error al actualizar el usuario')
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

const uploading = ref(false);

async function onFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    uploading.value = true;
    try {
        const formData = new FormData();
        formData.append('file', file);

        // Cambia la URL por la de tu endpoint de subida de imágenes
        const response = await api.post('admin/users/upload-profile-image', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        // Asume que el backend responde con { url: 'https://...' }
        user.value.profileImageUrl = response.data.url;
    } catch (err) {
        alert('Error al subir la imagen');
    } finally {
        uploading.value = false;
    }
}

const isUsernameRequired = computed(() => {
    return user.value.role === 'tattooer';
});
</script>