import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTattooStore = defineStore('tattoos', () => {
    const tattoos = ref([
      { id: 1, title: "Flor de loto.png", author: "María González", city: "Santiago", style: "Minimalista", desc: "Descripción del tatuaje" },
      { id: 2, title: "Dragón tribal.png", author: "Carlos Mendoza", city: "Valparaíso", style: "Tribal", desc: "Descripción del tatuaje" },
      { id: 3, title: "Mandala mano.png", author: "Laura Pérez", city: "Santiago", style: "Geométrico", desc: "Descripción del tatuaje" },
      { id: 4, title: "Lobo realista.png", author: "Javier Ruiz", city: "Concepción", style: "Realista", desc: "Descripción del tatuaje" },
      { id: 5, title: "Brújula viajera.png", author: "Ana Torres", city: "Valparaíso", style: "Tradicional", desc: "Descripción del tatuaje" },
      { id: 6, title: "Tigre japonés.png", author: "Luis Soto", city: "Santiago", style: "Japonés", desc: "Descripción del tatuaje" },
      { id: 7, title: "Ojo de Horus.png", author: "Cecilia Díaz", city: "Concepción", style: "Egipcio", desc: "Descripción del tatuaje" },
    ])

  const styleFilter = ref('')
  const cityFilter = ref('')
  const searchQuery = ref('')

  const filteredTattoos = computed(() => {
    return tattoos.value.filter(t => {
      const matchesStyle = styleFilter.value ? t.style === styleFilter.value : true
      const matchesCity = cityFilter.value ? t.city === cityFilter.value : true
      const matchesSearch = searchQuery.value
        ? (t.title + t.desc).toLowerCase().includes(searchQuery.value.toLowerCase())
        : true

      return matchesStyle && matchesCity && matchesSearch
    })
  })

  return {
    tattoos,
    styleFilter,
    cityFilter,
    searchQuery,
    filteredTattoos
  }
})
