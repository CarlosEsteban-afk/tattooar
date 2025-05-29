import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '../views/login/RegisterView.vue'
import LoginView from '../views/login/LoginView.vue'
import ForgotPasswordView from '../views/login/ForgotPasswordView.vue'
import CodeVerificationView from '../views/login/CodeVerificationView.vue'
import ResetPasswordView from '../views/login/ResetPasswordView.vue'
import HomeView from '../views/HomeView.vue'
import TatooArtistProfileView from '../views/TattooArtistProfileView.vue'
import FavoritesView from '../views/FavoritesView.vue'
import UserProfileView from '../views/UserProfileView.vue'
import TattooArtistsView from '../views/TattooArtistsView.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
    { path: '/tattooar/', name: 'Home', component: HomeView },
    { path: '/tattooar/login', name: 'Login', component: LoginView },
    { path: '/tattooar/register', name: 'Register', component: RegisterView },
    { path: '/tattooar/forgot-password', name: 'ForgotPassword', component: ForgotPasswordView },
    { path: '/tattooar/code-verification', name: 'CodeVerification', component: CodeVerificationView },
    { path: '/tattooar/reset-password', name: 'ResetPassword', component: ResetPasswordView },
    { path: '/tattooar/tattoo-profile/:id', name: 'TattooProfile', component: TatooArtistProfileView },
    { path: '/tattooar/favorites', name: 'Favorites', component: FavoritesView },
    { path: '/tattooar/user-profile', name: 'UserProfile', component: UserProfileView },
    { path: '/tattooar/tattoo-artists', name: 'TattooArtists', component: TattooArtistsView },
    { path: '/tattooar/about', name: 'About', component: AboutView },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
