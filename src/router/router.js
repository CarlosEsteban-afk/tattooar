import { createRouter, createWebHistory } from "vue-router";
import RegisterView from "../views/login/RegisterView.vue";
import LoginView from "../views/login/LoginView.vue";
import ForgotPasswordView from "../views/login/ForgotPasswordView.vue";
import CodeVerificationView from "../views/login/CodeVerificationView.vue";
import ResetPasswordView from "../views/login/ResetPasswordView.vue";
import HomeView from "../views/HomeView.vue";
import AdminUsersView from "../views/admin/AdminUsersView.vue";
import AdminTattoos from "../views/admin/TattooAdminView.vue";
import AdminLogs from "../views/admin/LogsAdminView.vue";
import UserDetailView from "../views/admin/UserDetailView.vue";
import EditUserView from "../views/admin/EditUserView.vue";
import DashboardAdminView from "../views/admin/DashboardAdminView.vue";
import AdminReports from "../views/admin/ReportsAdminView.vue";
import TatooArtistProfileView from "../views/TattooArtistProfileView.vue";
import FavoritesView from "../views/FavoritesView.vue";
import UserProfileView from "../views/UserProfileView.vue";
import TattooArtistsView from "../views/TattooArtistsView.vue";
import AboutView from "../views/AboutView.vue";
import ReportView from "../views/ReportView.vue";
import CodeVerificationRegisterView from "../views/login/CodeVerificationRegisterView.vue";
import SendCodeVerificationRegisterView from "../views/login/SendCodeVerificationRegisterView.vue";
import FinishedRegisterView from "../views/login/FinishedRegisterView.vue";
import ARView from "../views/ARView.vue";
import { useUserStore } from "../stores/UserStore";
import { storeToRefs } from "pinia";


const routes = [
  // Acceso libre (todos)
  { path: "/", name: "Home", component: HomeView },

  // Solo para usuarios invitados
  { path: "/login", name: "Login", component: LoginView, meta: { guestOnly: true } },
  { path: "/register", name: "Register", component: RegisterView, meta: { guestOnly: true } },

  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPasswordView,
    meta: { guestOnly: true }
  },
  {
    path: "/code-verification",
    name: "CodeVerification",
    component: CodeVerificationView,
    meta: { guestOnly: true }
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: ResetPasswordView,
    meta: { guestOnly: true }
  },

  // Admin (solo rol 'admin')
  {
    path: "/admin/users",
    name: "AdminUsersView",
    component: AdminUsersView,
    meta: { requiresAuth: true, roles: ["admin"] }
  },
  {
    path: "/admin/tattoos",
    name: "AdminTattoos",
    component: AdminTattoos,
    meta: { requiresAuth: true, roles: ["admin"] }
  },
  {
    path: "/admin/logs",
    name: "AdminLogs",
    component: AdminLogs,
    meta: { requiresAuth: true, roles: ["admin"] }
  },
  {
    path: "/admin/user/:id",
    name: "UserDetail",
    component: UserDetailView,
    meta: { requiresAuth: true, roles: ["admin"] }
  },
  {
    path: "/admin/edit-user/:id",
    name: "EditUserView",
    component: EditUserView,
    meta: { requiresAuth: true, roles: ["admin"] }
  },
  {
    path: "/admin/dashboard",
    name: "DashboardAdminView",
    component: DashboardAdminView,
    meta: { requiresAuth: true, roles: ["admin"] }
  },
  {
    path: "/admin/reports",
    name: "AdminReports",
    component: AdminReports,
    meta: { requiresAuth: true, roles: ["admin"] }
  },

  // Acceso libre (todos) y perfil de tatuador
  {
    path: "/tattoo-profile/:id",
    name: "TattooProfile",
    component: TatooArtistProfileView,
  },

  // Usuarios registrados (rol 'client' o 'tattooer')
  {
    path: "/favorites",
    name: "Favorites",
    component: FavoritesView,
    meta: { requiresAuth: true, roles: ["client", "tattooer"] }
  },
  {
    path: "/user-profile",
    name: "UserProfile",
    component: UserProfileView,
    meta: { requiresAuth: true, roles: ["client", "tattooer"] }
  },

  // Acceso libre (todos)
  {
    path: "/tattoo-artists",
    name: "TattooArtists",
    component: TattooArtistsView
  },
  {
    path: "/about",
    name: "About",
    component: AboutView
  },
  {
    path: "/report/",
    name: "Report",
    component: ReportView
  },

  // Registro y verificación
  {
    path: "/tattooar/register/send-code-verification",
    name: "SendRegisterCodeVerification",
    component: SendCodeVerificationRegisterView,
    meta: { guestOnly: true }
  },
  {
    path: "/tattooar/register/code-verification",
    name: "RegisterCodeVerification",
    component: CodeVerificationRegisterView,
    meta: { guestOnly: true }
  },
  {
    path: "/tattooar/register/finished",
    name: "FinishedRegister",
    component: FinishedRegisterView,
    meta: { guestOnly: true }
  },

  // Vista AR (acceso libre)
  {
    path: "/ar/:id",
    name: "ARView",
    component: ARView,
    meta: { requiresAuth: true, roles: ["client", "tattooer"] }
  }
];


const router = createRouter({
  history: createWebHistory("/tattooar/"),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const { isAuthenticated, userRole } = storeToRefs(userStore)

  // Si es una ruta solo para invitados
  if (to.meta.guestOnly && isAuthenticated.value) {
    return next({ name: 'Home' })
  }

  // Si requiere autenticación y no está logueado
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return next({ name: 'Login' })
  }

  // Si requiere rol específico
  if (to.meta.roles && !to.meta.roles.includes(userRole.value)) {
    return next({ name: 'Home' }) // o una vista de error
  }

  next()
})

export default router;
