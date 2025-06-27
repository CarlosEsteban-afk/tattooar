import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "../services/api";

export const useTattooStore = defineStore("tattoos", () => {
  // Estado
  const tattoos = ref([]);
  const styleFilters = ref([]);
  const cityFilters = ref([]);
  const searchQuery = ref("");

  // Getters filtrados
  const filteredTattoos = computed(() => {
    return tattoos.value.filter(tattoo => {
      const matchesSearch = tattoo.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        || tattoo.description.toLowerCase().includes(searchQuery.value.toLowerCase())

      const matchesCity = cityFilters.value.length === 0 ||
        (tattoo.author?.cities || []).some(city => cityFilters.value.includes(city))

      // Verifica estilos
      const matchesStyle = styleFilters.value.length === 0 ||
        (tattoo.styles || []).some(style => styleFilters.value.includes(style))

      return matchesSearch && matchesCity && matchesStyle
    })
  })

  // Acciones para integrar con backend
  async function fetchTattoos(params = {}) {
    try {
      const response = await api.get("/designs", { params });
      tattoos.value = response.data;

      console.log(tattoos.value);

    } catch (error) {
      console.error("Error fetching tattoos:", error);
      // Optionally, handle error state here (e.g., show notification)
    }
  }

  async function fetchARTattoos() {
    const response = await api.get("/designs", {
      params: { booleanAR: true },
    });
    tattoos.value = response.data;
  }

  async function createTattoo(formData) {
    // formData: instancia de FormData con campos name, description, styles[], booleanAR y file 'image'
    const response = await api.post("/designs", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    tattoos.value.unshift(response.data);
  }

  async function updateTattoo(id, payload) {
    const response = await api.patch(`/designs/${id}`, payload);
    const idx = tattoos.value.findIndex((t) => t._id === id);
    if (idx !== -1) tattoos.value[idx] = response.data;
  }

  async function deleteTattoo(id) {
    await api.delete(`/designs/${id}`);
    tattoos.value = tattoos.value.filter((t) => t._id !== id);
  }

  async function getTattooById(id) {
    const response = await api.get(`/designs/${id}`);
    return response.data;
  }

  // Fetch inicial

  return {
    tattoos,
    styleFilters,
    cityFilters,
    searchQuery,
    filteredTattoos,
    fetchTattoos,
    fetchARTattoos,
    createTattoo,
    updateTattoo,
    deleteTattoo,
    getTattooById,
  };
});
