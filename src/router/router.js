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
import AdminReports from '../views/admin/ReportsAdminView.vue'

const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/login", name: "Login", component: LoginView },
  { path: "/register", name: "Register", component: RegisterView },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPasswordView,
  },
  {
    path: "/code-verification",
    name: "CodeVerification",
    component: CodeVerificationView,
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: ResetPasswordView,
  },
  { path: "/admin/users", name: "AdminUsersView", component: AdminUsersView },
  { path: "/admin/tattoos", name: "AdminTattoos", component: AdminTattoos },
  { path: "/admin/logs", name: "AdminLogs", component: AdminLogs },
  { path: "/admin/user/:id", name: "UserDetail", component: UserDetailView },
  {
    path: "/admin/edit-user/:id",
    name: "EditUserView",
    component: EditUserView,
  },
  {
    path: "/admin/dashboard",
    name: "DashboardAdminView",
    component: DashboardAdminView,
  },
   // { path: '/tattooar/', name: 'LandingView', component: LandingView },
   // { path: '/tattooar/login', name: 'Login', component: Login },
    { path: '/admin/tattoos', name: 'AdminTattoos', component: AdminTattoos },
    { path: '/admin/logs', name: 'AdminLogs', component: AdminLogs },
    { path: '/admin/reports', name: 'AdminReports', component: AdminReports },

];

const router = createRouter({
  history: createWebHistory("/tattooar/"),
  routes,
});

export default router;
