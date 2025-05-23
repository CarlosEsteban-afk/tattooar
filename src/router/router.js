import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/LoginView.vue'
import LandingView from '../views/LandingView.vue'
import AdminUsersView from '../views/admin/AdminUsersView.vue'
import AdminTattoos from '../views/admin/TattooAdminView.vue'
import AdminLogs from '../views/admin/LogsAdminView.vue'

const routes = [
    { path: '/tattooar/', name: 'LandingView', component: LandingView },
    { path: '/tattooar/login', name: 'Login', component: Login },
    { path: '/tattooar/admin/users', name: 'AdminUsersView', component: AdminUsersView },
    { path: '/tattooar/admin/tattoos', name: 'AdminTattoos', component: AdminTattoos },
    { path: '/tattooar/admin/logs', name: 'AdminLogs', component: AdminLogs },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
