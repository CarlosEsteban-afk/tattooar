// stores/UserStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const token = ref(null)
  const tokenExpiration = ref(null) // opcional, para expiración manual

  // === Computeds ===
  const isAuthenticated = computed(() => !!token.value && !isTokenExpired())
  const userRole = computed(() => user.value?.role || 'guest')

  const isGuest = computed(() => !isAuthenticated.value)
  const isAdmin = computed(() => userRole.value === 'admin')
  const isArtist = computed(() => userRole.value === 'artist')
  const isClient = computed(() => userRole.value === 'user' || userRole.value === 'client')

  const isTokenExpired = () => {
    if (!tokenExpiration.value) return false
    const now = Date.now()
    return now > tokenExpiration.value
  }

  // === Actions ===
  const login = async (email, password) => {
    // Simula un usuario autenticado (debería ser un fetch a backend)
    const mockUser = {
      id: 1,
      name: 'Carlos',
      email,
      role: 'artist', // o 'admin' o 'user'
    }

    const fakeToken = 'fake-jwt-token'
    const expiresInMs = 1000 * 60 * 60 // 1 hora

    user.value = mockUser
    token.value = fakeToken
    tokenExpiration.value = Date.now() + expiresInMs
  }

  const logout = () => {
    user.value = null
    token.value = null
    tokenExpiration.value = null
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
    isArtist,
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
