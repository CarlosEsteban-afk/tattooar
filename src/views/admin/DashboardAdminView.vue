<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg sm:pl-64">
        <div class="flex flex-col md:flex-row min-h-screen bg-gray-50">
            <!-- Main Content -->
            <div class="flex-1 overflow-auto w-full">
                <div class="p-4 md:p-4 pt-6 md:pt-6 sm:pt-6">
                    <AdminSidebar @logout="logout" />
                    <TopBar title="Visualización de Estadísticas Generales" :notificationCount="3" />
                    <br />

                    <!-- Ranking de Tatuajes -->
                    <div class="bg-white rounded-lg p-4 shadow-md border border-gray-200">
                        <h2 class="text-lg font-semibold mb-4 text-purple-900">Tatuajes con más likes</h2>
                        <table class="min-w-full">
                            <thead>
                                <tr class="text-purple-800">
                                    <th class="px-4 py-2 text-left">Tatuaje</th>
                                    <th class="px-4 py-2 text-left">Estilo</th>
                                    <th class="px-4 py-2 text-left">Likes</th>
                                    <th class="px-4 py-2 text-left">Autor</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="tattoo in topTattoos" :key="tattoo.nombre" class="hover:bg-purple-100">
                                    <td class="px-4 py-2">{{ tattoo.nombre }}</td>
                                    <td class="px-4 py-2">{{ tattoo.estilos }}</td>
                                    <td class="px-4 py-2 font-bold text-purple-700">{{ tattoo.likes }}</td>
                                    <td class="px-4 py-2 flex items-center gap-2">
                                        <button v-if="tattoo.autorId" @click="goToUserDetail(tattoo.autorId)"
                                            class="flex items-center gap-2 hover:underline focus:outline-none"
                                            title="Ver detalle del usuario">
                                            <img v-if="tattoo.autorImagen" :src="tattoo.autorImagen"
                                                class="w-8 h-8 rounded-full border" :alt="tattoo.autorNombre" />
                                            <span>{{ tattoo.autorNombre || 'Sin autor' }}</span>
                                        </button>
                                        <span v-else>{{ tattoo.autorNombre || 'Sin autor' }}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Métricas resumen -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                        <div
                            class="bg-white rounded-lg p-4 shadow-md border border-gray-200 flex flex-col items-center">
                            <span class="text-2xl font-bold text-purple-800">{{ totalUsers }}</span>
                            <span class="text-gray-600">Usuarios registrados</span>
                        </div>
                        <div
                            class="bg-white rounded-lg p-4 shadow-md border border-gray-200 flex flex-col items-center">
                            <span class="text-2xl font-bold text-purple-800">{{ totalTattoos }}</span>
                            <span class="text-gray-600">Tatuajes publicados</span>
                        </div>
                        <div
                            class="bg-white rounded-lg p-4 shadow-md border border-gray-200 flex flex-col items-center">
                            <span class="text-2xl font-bold text-purple-800">{{ totalLikes }}</span>
                            <span class="text-gray-600">Likes totales</span>
                        </div>
                    </div>

                    <!-- Gráficos -->
                    <div class="flex flex-col md:flex-row justify-center items-center gap-8 mb-8 mt-8">
                      <div class="bg-white rounded-lg p-4 shadow-md flex flex-col items-center border border-gray-200 max-w-sm w-full">
                        <h2 class="text-lg font-semibold mb-2 text-purple-900">Usuarios por Rol</h2>
                        <canvas ref="usersByRoleChartRef" width="580" height="480"></canvas>
                      </div>
                      <div class="bg-white rounded-lg p-4 shadow-md flex flex-col items-center border border-gray-200 max-w-sm w-full">
                        <h2 class="text-lg font-semibold mb-2 text-purple-900">Tatuajes por Estilo</h2>
                        <canvas ref="tattoosByStyleChartRef" width="580" height="480"></canvas>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { initFlowbite } from 'flowbite'
import AdminSidebar from '../../components/AdminSidebar.vue'
import TopBar from '../../components/TopBar.vue'
import api from '../../services/api'
import { useUserStore } from '../../stores/UserStore'

const router = useRouter()
const userStore = useUserStore()
const token = userStore.token

const totalUsers = ref(0)
const totalTattoos = ref(0)
const totalLikes = ref(0)
const topTattoos = ref([])
const userRoles = ref([])
const designStyles = ref([])

const usersByRoleChartRef = ref(null)
const tattoosByStyleChartRef = ref(null)

// Traducción de roles
const roleLabels = {
  client: "Cliente",
  tattooer: "Tatuador",
  admin: "Administrador"
};

// Traducción de estilos
const styleLabels = {
  traditional: "Tradicional",
  realism: "Realismo",
  watercolor: "Acuarela",
  geometric: "Geométrico",
  minimalist: "Minimalista",
  neo_traditional: "Neo-tradicional",
  japanese: "Japonés",
  blackwork: "Blackwork",
  fineline: "Fineline",
  lettering: "Lettering",
  modern: "Moderno",
  classic: "Clásico"
};

function goToUserDetail(id) {
    router.push({ name: 'UserDetail', params: { id } })
}

async function fetchDashboardData() {
    try {
        const [usersByRoleRes, designsByStyleRes, topLikedDesignsRes, totalTattoosRes] = await Promise.all([
            api.get('/metrics/users-by-role'),
            api.get('/metrics/designs-by-style'),
            api.get('/metrics/top-liked-designs'),
            api.get('/metrics/total-tattoos')
        ])

        userRoles.value = usersByRoleRes.data
        designStyles.value = designsByStyleRes.data

        // Calcular totales
        totalUsers.value = userRoles.value.reduce((acc, r) => acc + r.count, 0)
        totalTattoos.value = totalTattoosRes.data.total

        // Top tatuajes con autor
        topTattoos.value = topLikedDesignsRes.data.map(d => ({
            nombre: d.name,
            estilos: Array.isArray(d.styles)
                ? d.styles.map(s => styleLabels[s] || s).join(', ')
                : (styleLabels[d.styles] || d.styles),
            likes: d.likes,
            autorNombre: d.author?.fullName || 'Sin autor',
            autorImagen: d.author?.profileImageUrl || null,
            autorId: d.author?._id || null
        }))

        totalLikes.value = topTattoos.value.reduce((acc, t) => acc + (t.likes || 0), 0)

        await nextTick()

        // Import Chart.js y renderiza los gráficos
        const { default: Chart } = await import('chart.js/auto')

        // Usuarios por rol
        if (usersByRoleChartRef.value) {
            new Chart(usersByRoleChartRef.value, {
                type: 'doughnut',
                data: {
                    labels: userRoles.value.map(r => `${roleLabels[r._id] || r._id} (${r.count})`),
                    datasets: [{
                        data: userRoles.value.map(r => r.count),
                        backgroundColor: ['#7B6EAD', '#2E076B', '#B1A9D1']
                    }]
                },
                options: { plugins: { legend: { display: true } } }
            })
        }

        // Diseños por estilo
        if (tattoosByStyleChartRef.value) {
            new Chart(tattoosByStyleChartRef.value, {
                type: 'bar',
                data: {
                    labels: designStyles.value.map(s => `${styleLabels[s._id] || s._id} (${s.count})`),
                    datasets: [{
                        label: 'Cantidad',
                        data: designStyles.value.map(s => s.count),
                        backgroundColor: ['#7B6EAD', '#2E076B', '#B1A9D1', '#A3E635', '#F472B6']
                    }]
                },
                options: {
                    plugins: { legend: { display: false } },
                    scales: { y: { beginAtZero: true } }
                }
            })
        }
    } catch (error) {
        console.error('Error cargando métricas:', error)
        if (error.response) {
            console.error('Detalles del error:', {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers
            })
        }
    }
}

onMounted(() => {
    initFlowbite()
    fetchDashboardData()
})

function logout() {
    // lógica de logout
}
</script>