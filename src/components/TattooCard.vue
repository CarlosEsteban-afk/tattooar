<template>
  <div
    class="rounded-xl border border-gray-200 bg-white shadow p-0 max-w-xs mx-auto flex flex-col h-full"
  >
    <!-- Header-->
    <div
      class="rounded-t-xl p-3 flex items-center justify-between relative"
      style="background-color: white"
    >
      <div>
        <h2
          class="text-black text-base font-semibold truncate"
          style="opacity: 0.9"
        >
          {{ name }}
        </h2>
        <div class="flex gap-2 mt-1">
          <span
            v-for="style in styles"
            :key="style"
            class="bg-gray-200 text-gray-800 text-xs px-2 py-0.5 rounded"
          >
            {{ style }}
          </span>
        </div>
      </div>
      <!-- Solo muestra el número de reportes si existe reportCount -->
      <span
        v-if="reportCount"
        class="absolute top-3 right-3 bg-yellow-100 text-yellow-700 text-xs px-2 py-0.5 rounded flex items-center gap-1"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="inline"
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M12 9v4" />
          <circle cx="12" cy="17" r="1" />
          <circle cx="12" cy="12" r="10" />
        </svg>
        {{ reportCount }} reportes
      </span>
    </div>
    <!-- Imagen -->
    <div
      class="w-full aspect-video bg-gray-100 flex items-center justify-center overflow-hidden"
    >
      <img
        :src="designURL"
        alt="tatuaje"
        class="object-contain w-full h-full"
      />
    </div>
    <!-- Descripción -->
    <div class="p-4 flex-1 flex flex-col">
      <div class="mb-2">
        <span
          v-if="state"
          class="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded mr-2"
        >
          {{ state }}
        </span>
        <span class="text-sm text-gray-700">{{ description }}</span>
      </div>
      <div class="flex items-center text-xs text-gray-500 gap-2 mb-4">
        <span>Propietario: {{ author?.fullName || "Desconocido" }}</span>
        <span>•</span>
        <span>{{ formatDate(updatedAt) }}</span>

      </div>
      <div class="flex gap-2 mt-auto">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  author: String,
  description: String,
  styles: {
    type: Array,
    default: () => [],
  },
  updatedAt: String,
  type: String,
  designURL: String,
  reportCount: Number,
  state: String,
});

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}
</script>
