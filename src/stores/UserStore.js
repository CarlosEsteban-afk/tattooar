// stores/UserStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '../services/api'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const token = ref(null)
  const tokenExpiration = ref(null) // opcional, para expiración manual

  // === Computeds ===
  const isAuthenticated = computed(() => !!token.value && !isTokenExpired())
  const userRole = computed(() => user.value?.role || 'guest')

  const isGuest = computed(() => !isAuthenticated.value)
  const isAdmin = computed(() => userRole.value === 'admin')
  const isTattooer = computed(() => userRole.value === 'tattooer')
  const isClient = computed(() => userRole.value === 'user' || userRole.value === 'client')

  const isTokenExpired = () => {
    if (!tokenExpiration.value) return false
    const now = Date.now()
    return now > tokenExpiration.value
  }

  // === Actions ===
 const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password })
      const { token: receivedToken, user: receivedUser } = response.data

      user.value = receivedUser
      token.value = receivedToken
      tokenExpiration.value = Date.now() + 60 * 60 * 1000 // 1 hora

      api.defaults.headers.common['Authorization'] = `Bearer ${receivedToken}`
      console.log('Usuario autenticado:', user.value)
      return user.value
    } catch (err) {
      console.error('Error al iniciar sesión:', err)
      throw err
    }
  }

   const logout = () => {
    user.value = null
    token.value = null
    tokenExpiration.value = null
    delete api.defaults.headers.common['Authorization']
  }

  const refreshToken = async () => {
    // Aquí llamas al backend para pedir un nuevo token
    // Ejemplo:
    // const response = await fetch('/refresh-token', { method: 'POST' })
    // const data = await response.json()
    // token.value = data.token
    // tokenExpiration.value = Date.now() + data.expiresIn
    console.log('Token refreshed (simulado)')
  }

  return {
    user,
    token,
    tokenExpiration,

    isAuthenticated,
    userRole,
    isAdmin,
    isTattooer,
    isClient,
    isGuest,

    login,
    logout,
    refreshToken
  }
}, {
  persist: {
    key: 'user-store',
    storage: localStorage,
    paths: ['user', 'token', 'tokenExpiration']
  }
})
