// stores/FavoritesStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {
    const favorites = ref(new Set())
    const addFavorite = (id) => {
        favorites.value.add(id)
    }

    const removeFavorite = (id) => {
        favorites.value.delete(id)
    }

    const toggleFavorite = (id) => {
        if (favorites.value.has(id)) {
            favorites.value.delete(id)
        } else {
            favorites.value.add(id)
        }
    }

    const isFavorite = (id) => {
        return favorites.value.has(id)
    }

    const clearFavorites = () => {
        favorites.value.clear()
    }

    return {
        favorites,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite,
        clearFavorites
    }
})
