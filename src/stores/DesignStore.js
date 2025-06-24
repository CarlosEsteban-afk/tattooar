import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTattooStore = defineStore('tattoos', () => {
  const tattoos = ref([
    { id: 1, title: "Flor de loto.png", author: "María González", city: "Santiago", style: "Minimalista", desc: "Descripción del tatuaje", image: "https://pub-ad324ec6344b410d83910468b9057f19.r2.dev/tattoo.png" },
    { id: 2, title: "Dragón tribal.png", author: "Carlos Mendoza", city: "Valparaíso", style: "Tribal", desc: "Descripción del tatuaje", image: "assets/tattoo-5.png" },
    { id: 3, title: "Mandala mano.png", author: "Laura Pérez", city: "Santiago", style: "Geométrico", desc: "Descripción del tatuaje", image: "assets/tattoo-1.png" },
    { id: 4, title: "Lobo realista.png", author: "Javier Ruiz", city: "Concepción", style: "Realismo", desc: "Descripción del tatuaje", image: "assets/tattoo-2.png" },
    { id: 5, title: "Brújula viajera.png", author: "Ana Torres", city: "Temuco", style: "Tradicional", desc: "Descripción del tatuaje", image: "assets/tattoo-3.png" },
    { id: 6, title: "Tigre japonés.png", author: "Luis Soto", city: "Puerto Montt", style: "Acuarela", desc: "Descripción del tatuaje", image: "assets/tattoo-4.png" },
    { id: 7, title: "Ojo de Horus.png", author: "Cecilia Díaz", city: "Concepción", style: "Fineline", desc: "Descripción del tatuaje", image: "assets/tattoo-6.png" },
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

  
  const getTattooById = (id) => {
    return tattoos.value.find(tattoo => tattoo.id === id)
  }

  return {
    tattoos,
    styleFilter,
    cityFilter,
    searchQuery,
    filteredTattoos,
    getTattooById
  }
}
)
