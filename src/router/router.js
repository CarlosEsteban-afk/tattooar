import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '../views/login/RegisterView.vue'
import LoginView from '../views/login/LoginView.vue'
import ForgotPasswordView from '../views/login/ForgotPasswordView.vue'
import CodeVerificationView from '../views/login/CodeVerificationView.vue'
import ResetPasswordView from '../views/login/ResetPasswordView.vue'
import CodeVerificationRegisterView from '../views/login/CodeVerificationRegisterView.vue'
import SendCodeVerificationRegisterView from '../views/login/SendCodeVerificationRegisterView.vue'
import FinishedRegisterView from '../views/login/FinishedRegisterView.vue'



const routes = [
    { path: '/tattooar/login', name: 'Login', component: LoginView },
    { path: '/tattooar/register', name: 'Register', component: RegisterView },
    { path: '/tattooar/forgot-password', name: 'ForgotPassword', component: ForgotPasswordView },
    { path: '/tattooar/code-verification', name: 'CodeVerification', component: CodeVerificationView },
    { path: '/tattooar/reset-password', name: 'ResetPassword', component: ResetPasswordView },
    { path: '/tattooar/register/send-code-verification', name: 'SendRegisterCodeVerification', component: SendCodeVerificationRegisterView },
    { path: '/tattooar/register/code-verification', name: 'RegisterCodeVerification', component: CodeVerificationRegisterView },
    { path: '/tattooar/register/finished', name: 'FinishedRegister', component: FinishedRegisterView },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
