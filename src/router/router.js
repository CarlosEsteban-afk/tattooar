import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/LoginView.vue'
import LandingView from '../views/LandingView.vue'
import AdminUsersView from '../views/admin/AdminUsersView.vue'
import AdminTattoos from '../views/admin/TattooAdminView.vue'
import AdminLogs from '../views/admin/LogsAdminView.vue'
import AdminReports from '../views/admin/ReportsAdminView.vue'

const routes = [
    { path: '/tattooar/', name: 'LandingView', component: LandingView },
    { path: '/tattooar/login', name: 'Login', component: Login },
    { path: '/tattooar/admin/users', name: 'AdminUsersView', component: AdminUsersView },
    { path: '/tattooar/admin/tattoos', name: 'AdminTattoos', component: AdminTattoos },
    { path: '/tattooar/admin/logs', name: 'AdminLogs', component: AdminLogs },
     { path: '/tattooar/admin/reportes', name: 'AdminReports', component: AdminReports },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
