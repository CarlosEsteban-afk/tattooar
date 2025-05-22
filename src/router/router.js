import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '../views/login/RegisterView.vue'
import LoginView from '../views/login/LoginView.vue'
import ForgotPasswordView from '../views/login/ForgotPasswordView.vue'
import CodeVerificationView from '../views/login/CodeVerificationView.vue'
import ResetPasswordView from '../views/login/ResetPasswordView.vue'
import HomeView from '../views/HomeView.vue'

const routes = [
    { path: '/tattooar', name: 'Home', component: HomeView },
    { path: '/tattooar/login', name: 'Login', component: LoginView },
    { path: '/tattooar/register', name: 'Register', component: RegisterView },
    { path: '/tattooar/forgot-password', name: 'ForgotPassword', component: ForgotPasswordView },
    { path: '/tattooar/code-verification', name: 'CodeVerification', component: CodeVerificationView },
    { path: '/tattooar/reset-password', name: 'ResetPassword', component: ResetPasswordView },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
