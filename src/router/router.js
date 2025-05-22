import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/LoginView.vue'
import LandingView from '../views/LandingView.vue'
import AdminUsersView from '../views/admin/AdminUsersView.vue'

const routes = [
    { path: '/tattooar/', name: 'LandingView', component: LandingView },
    { path: '/tattooar/login', name: 'Login', component: Login },
    { path: '/tattooar/admin/users', name: 'AdminUsersView', component: AdminUsersView },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
