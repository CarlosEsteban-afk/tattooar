// src/stores/FavoritesStore.js
import { defineStore } from 'pinia'
import api from '../services/api'

export const useFavoritesStore = defineStore('favorites', {
    state: () => ({
        favorites: []
    }),
    actions: {
        async fetchFavorites() {
            try {
                const res = await api.get('/users/me/favorites')
                this.favorites = res.data
                console.log('Favoritos obtenidos:', this.favorites)
            } catch (err) {
                console.error('Error al obtener favoritos:', err)
            }
        },
        async addFavorite(designId) {
            try {
                await api.post('/users/me/favorites', { designId })
                this.favorites.push(designId)
                console.log(this.favorites)
            } catch (err) {
                console.error('Error al agregar favorito:', err)
            }
        },
        async removeFavorite(designId) {
            try {
                await api.delete(`/users/me/favorites/${designId}`)
                this.favorites = this.favorites.filter(fav => (fav._id || fav) !== designId)
            } catch (err) {
                console.error('Error al eliminar favorito:', err)
            }
        },
        toggleFavorite(designId) {
            if (this.isFavorite(designId)) {
                this.removeFavorite(designId)
            } else {
                this.addFavorite(designId)
            }
        },
        isFavorite(designId) {
            return this.favorites.some(fav => {
                if (typeof fav === 'string') {
                    return fav === designId
                } else if (fav._id) {
                    return fav._id === designId
                }
                return false
            })
        }
    }
})
