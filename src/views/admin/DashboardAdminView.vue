<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg sm:pl-64">
        <div class="flex flex-col md:flex-row min-h-screen bg-gray-50">
            <!-- Main Content -->
            <div class="flex-1 overflow-auto w-full">
                <div class="p-4 md:p-4 pt-6 md:pt-6 sm:pt-6">
                    <!-- Sidebar -->
                    <AdminSidebar @logout="logout" />
                    <Topbar title="Visualización de Estadísticas Generales" :notificationCount="3" />
                    <br />
                    <div class="bg-[#7B6EAD] rounded-lg p-4 md:p-6 shadow-lg w-full">
                        <!-- Gráficos -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div class="bg-white rounded-lg p-4 shadow flex flex-col items-center">
                                <h2 class="text-lg font-semibold mb-2 text-purple-900">Usuarios por Rol</h2>
                                <canvas ref="usersByRoleChartRef" width="300" height="200"></canvas>
                            </div>
                            <div class="bg-white rounded-lg p-4 shadow flex flex-col items-center">
                                <h2 class="text-lg font-semibold mb-2 text-purple-900">Tatuajes por Estilo</h2>
                                <canvas ref="tattoosByStyleChartRef" width="300" height="200"></canvas>
                            </div>
                        </div>
                        <!-- Ranking de Tatuadores -->
                        <div class="bg-white rounded-lg p-4 shadow">
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
                                    <tr v-for="tattoo in topTattoos" :key="tattoo.id" class="hover:bg-purple-100">
                                        <td class="px-4 py-2">{{ tattoo.nombre }}</td>
                                        <td class="px-4 py-2">{{ tattoo.estilos }}</td>
                                        <td class="px-4 py-2 font-bold text-purple-700">{{ tattoo.likes }}</td>
                                        <td class="px-4 py-2 flex items-center gap-2">
                                            <button v-if="tattoo.autorId" @click="goToUserDetail(tattoo.autorId)"
                                                class="flex items-center gap-2 hover:underline focus:outline-none"
                                                title="Ver detalle del usuario">
                                                <img v-if="tattoo.autorImagen" :src="tattoo.autorImagen"
                                                    class="w-8 h-8 rounded-full border" :alt="tattoo.autorNombre" />
                                                <span>{{ tattoo.autorNombre || 'Desconocido' }}</span>
                                            </button>
                                            <span v-else>{{ tattoo.autorNombre || 'Desconocido' }}</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <!-- Otras métricas relevantes -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                            <div class="bg-white rounded-lg p-4 shadow flex flex-col items-center">
                                <span class="text-2xl font-bold text-purple-800">{{ totalUsers }}</span>
                                <span class="text-gray-600">Usuarios registrados</span>
                            </div>
                            <div class="bg-white rounded-lg p-4 shadow flex flex-col items-center">
                                <span class="text-2xl font-bold text-purple-800">{{ totalTattoos }}</span>
                                <span class="text-gray-600">Tatuajes publicados</span>
                            </div>
                            <div class="bg-white rounded-lg p-4 shadow flex flex-col items-center">
                                <span class="text-2xl font-bold text-purple-800">{{ totalLikes }}</span>
                                <span class="text-gray-600">Likes totales</span>
                            </div>
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
import Topbar from '../../components/Topbar.vue'

const totalUsers = ref(0)
const totalTattoos = ref(0)
const totalLikes = ref(0)
const topTattooers = ref([])
const topTattoos = ref([])
const usersByRoleChartRef = ref(null)
const tattoosByStyleChartRef = ref(null)
const router = useRouter()

async function fetchDashboardData() {
    // Fetch users
    const usersRes = await fetch('http://localhost:3002/users')
    const users = await usersRes.json()
    totalUsers.value = users.length

    // Contar roles
    const countByRole = { Tatuador: 0, Cliente: 0 }
    users.forEach(u => {
        if (u.rol === 'Tatuador') countByRole.Tatuador++
        if (u.rol === 'Cliente') countByRole.Cliente++
    })

    // Ranking de tatuadores por likes (simulado desde campo likes)
    const tattooers = users.filter(u => u.rol === 'Tatuador')
    topTattooers.value = [...tattooers]
        .sort((a, b) => (b.likes || 0) - (a.likes || 0))
        .slice(0, 3)

    // Fetch tattoos
    const tattoosRes = await fetch('http://localhost:3002/tattoos')
    const tattoos = await tattoosRes.json()
    totalTattoos.value = tattoos.length

    // Contar estilos de tatuajes
    const styleCount = {}
    tattoos.forEach(t => {
        const estilos = Array.isArray(t.estilos)
            ? t.estilos
            : (t.estilos || '').split(',').map(e => e.trim()).filter(Boolean)
        estilos.forEach(estilo => {
            styleCount[estilo] = (styleCount[estilo] || 0) + 1
        })
    })

    // Likes totales
    totalLikes.value = tattoos.reduce((sum, t) => sum + (t.likes || 0), 0)

    // Top tatuajes con más likes
    topTattoos.value = [...tattoos]
        .sort((a, b) => (b.likes || 0) - (a.likes || 0))
        .slice(0, 5)
        .map(tattoo => {
            // Busca el autor por id o nombre (ajusta según tu estructura)
            const autor = users.find(u =>
                u.rol === 'Tatuador' && u.id === tattoo.autorId
            )
            return {
                ...tattoo,
                autorNombre: autor ? autor.nombre : 'Desconocido',
                autorImagen: autor ? autor.imagen : null
            }
        })

    // Render gráficos
    await nextTick()
    import('chart.js/auto').then(({ default: Chart }) => {
        // Usuarios por rol
        if (usersByRoleChartRef.value) {
            new Chart(usersByRoleChartRef.value, {
                type: 'doughnut',
                data: {
                    labels: ['Tatuadores', 'Clientes'],
                    datasets: [{
                        data: [countByRole.Tatuador, countByRole.Cliente],
                        backgroundColor: ['#7B6EAD', '#2E076B'],
                    }]
                },
                options: {
                    plugins: {
                        legend: { display: true }
                    }
                }
            })
        }
        // Tatuajes por estilo
        if (tattoosByStyleChartRef.value) {
            new Chart(tattoosByStyleChartRef.value, {
                type: 'bar',
                data: {
                    labels: Object.keys(styleCount),
                    datasets: [{
                        label: 'Cantidad',
                        data: Object.values(styleCount),
                        backgroundColor: [
                            '#7B6EAD', '#2E076B', '#B1A9D1', '#A3E635', '#F472B6'
                        ]
                    }]
                },
                options: {
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: { beginAtZero: true }
                    }
                }
            })
        }
    })
}

function goToUserDetail(id) {
    router.push({ name: 'UserDetail', params: { id } })
}

onMounted(() => {
    initFlowbite()
    fetchDashboardData()
})

function logout() { }
</script>