import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '../views/RegisterView.vue'
import LandingView from '../views/LandingView.vue'

const routes = [
    { path: '/tattooar/', name: 'LandingView', component: LandingView },
    { path: '/tattooar/login', name: 'Login', component: RegisterView },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
