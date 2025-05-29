import { createRouter, createWebHashHistory } from 'vue-router'
import RegisterView from '../views/login/RegisterView.vue'
import LoginView from '../views/login/LoginView.vue'
import ForgotPasswordView from '../views/login/ForgotPasswordView.vue'
import CodeVerificationView from '../views/login/CodeVerificationView.vue'
import ResetPasswordView from '../views/login/ResetPasswordView.vue'
import HomeView from '../views/HomeView.vue'
import AdminUsersView from '../views/admin/AdminUsersView.vue'
import AdminTattoos from '../views/admin/TattooAdminView.vue'
import AdminLogs from '../views/admin/LogsAdminView.vue'
import UserDetailView from '../views/admin/UserDetailView.vue'
import EditUserView from '../views/admin/EditUserView.vue'
import DashboardAdminView from '../views/admin/DashboardAdminView.vue'

const routes = [
    { path: '/tattooar/#', name: 'Home', component: HomeView },
    { path: '/tattooar/#/login', name: 'Login', component: LoginView },
    { path: '/tattooar/#/register', name: 'Register', component: RegisterView },
    { path: '/tattooar/#/forgot-password', name: 'ForgotPassword', component: ForgotPasswordView },
    { path: '/tattooar/#/code-verification', name: 'CodeVerification', component: CodeVerificationView },
    { path: '/tattooar/#/reset-password', name: 'ResetPassword', component: ResetPasswordView },
    { path: '/tattooar/#/admin/users', name: 'AdminUsersView', component: AdminUsersView },
    { path: '/tattooar/#/admin/tattoos', name: 'AdminTattoos', component: AdminTattoos },
    { path: '/tattooar/#/admin/logs', name: 'AdminLogs', component: AdminLogs },
    { path: '/tattooar/#/admin/user/:id', name: 'UserDetail', component: UserDetailView },
    { path: '/tattooar/#/admin/edit-user/:id', name: 'EditUserView', component: EditUserView },
    { path: '/tattooar/#/admin/dashboard', name: 'DashboardAdminView', component: DashboardAdminView },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router