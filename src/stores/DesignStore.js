import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
});

export const useTattooStore = defineStore("tattoos", () => {
  // Estado
  const tattoos = ref([]);
  const styleFilter = ref("");
  const cityFilter = ref("");
  const searchQuery = ref("");

  // Getters filtrados
  const filteredTattoos = computed(() => {
    return tattoos.value.filter((t) => {
      const matchesStyle = styleFilter.value
        ? t.style === styleFilter.value
        : true;
      const matchesCity = cityFilter.value ? t.city === cityFilter.value : true;
      const text = `${t.title} ${t.desc}`.toLowerCase();
      const matchesSearch = searchQuery.value
        ? text.includes(searchQuery.value.toLowerCase())
        : true;
      return matchesStyle && matchesCity && matchesSearch;
    });
  });

  // Acciones para integrar con backend
  async function fetchTattoos(params = {}) {
    try {
      const response = await api.get("/v1/designs", { params });
      tattoos.value = response.data;

      console.log(tattoos.value);
      
    } catch (error) {
      console.error("Error fetching tattoos:", error);
      // Optionally, handle error state here (e.g., show notification)
    }
  }

  async function fetchARTattoos() {
    const response = await api.get("/v1/designs", {
      params: { booleanAR: true },
    });
    tattoos.value = response.data;
  }

  async function createTattoo(formData) {
    // formData: instancia de FormData con campos name, description, styles[], booleanAR y file 'image'
    const response = await api.post("/v1/designs", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    tattoos.value.unshift(response.data);
  }

  async function updateTattoo(id, payload) {
    const response = await api.patch(`/v1/designs/${id}`, payload);
    const idx = tattoos.value.findIndex((t) => t._id === id);
    if (idx !== -1) tattoos.value[idx] = response.data;
  }

  async function deleteTattoo(id) {
    await api.delete(`/v1/designs/${id}`);
    tattoos.value = tattoos.value.filter((t) => t._id !== id);
  }

  async function getTattooById(id) {
    const response = await api.get(`/v1/designs/${id}`);
    return response.data;
  }

  // Fetch inicial

  return {
    tattoos,
    styleFilter,
    cityFilter,
    searchQuery,
    filteredTattoos,
    fetchTattoos,
    fetchARTattoos,
    createTattoo,
    updateTattoo,
    deleteTattoo,
  };
});
