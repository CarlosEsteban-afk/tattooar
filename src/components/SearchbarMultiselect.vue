<template>
  <div class="relative w-full" ref="container">
    <!-- Badges -->
    <div class="flex flex-wrap gap-2 mb-2 min-h-[2.5rem]">
      <span v-if="modelValue.length === 0" class="text-sm text-gray-400">
        {{ placeholderBadges }}
      </span>
      <span
        v-for="item in modelValue"
        :key="item"
        class="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full"
        :class="badgeClass"
      >
        {{ item }}
        <button
          @click.stop="removeItem(item)"
          class="ml-1 hover:text-black focus:outline-none"
        >
          ×
        </button>
      </span>
    </div>

    <!-- Input + botón -->
    <div class="relative">
      <input
        type="text"
        v-model="search"
        @focus="showDropdown = true"
        @input="filterItems"
        :placeholder="placeholderInput"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
        :class="inputRingClass"
      />
      <button
        class="absolute inset-y-0 right-2 flex items-center text-gray-500"
        @click="showDropdown = !showDropdown"
        type="button"
      >
        <svg
          :class="{ 'rotate-180': showDropdown }"
          class="w-4 h-4 transform transition-transform duration-200"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>

    <!-- Dropdown -->
    <ul
      v-if="showDropdown"
      class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
    >
      <li
        v-for="item in filtered"
        :key="item"
        @click="toggleItem(item)"
        class="flex items-center justify-between px-4 py-2 cursor-pointer hover:bg-gray-100"
      >
        <span>{{ item }}</span>
        <svg
          v-if="modelValue.includes(item)"
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4 text-purple-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </li>
      <li v-if="filtered.length === 0" class="px-4 py-2 text-gray-500">
        No se encontraron coincidencias
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

const props = defineProps({
  modelValue: { type: Array, required: true },
  options: { type: Array, required: true },
  placeholderInput: { type: String, default: 'Buscar...' },
  placeholderBadges: { type: String, default: 'Seleccionados aparecerán aquí' },
  badgeClass: { type: String, default: 'bg-purple-100 text-purple-800' },
  inputRingClass: { type: String, default: 'focus:ring-purple-500' }
});
const emit = defineEmits(['update:modelValue']);

const search = ref('');
const showDropdown = ref(false);
const filtered = ref([...props.options]);

watch(search, () => filterItems());
watch(() => props.options, () => {
  filtered.value = [...props.options];
});

function filterItems() {
  const s = search.value.toLowerCase();
  filtered.value = props.options.filter((item) =>
    item.toLowerCase().includes(s)
  );
}

function toggleItem(item) {
  if (props.modelValue.includes(item)) {
    emit('update:modelValue', props.modelValue.filter((i) => i !== item));
  } else {
    emit('update:modelValue', [...props.modelValue, item]);
  }
}

function removeItem(item) {
  emit('update:modelValue', props.modelValue.filter((i) => i !== item));
}

const container = ref(null);
function handleClickOutside(e) {
  if (container.value && !container.value.contains(e.target)) {
    showDropdown.value = false;
  }
}

onMounted(() => document.addEventListener('click', handleClickOutside));
onBeforeUnmount(() => document.removeEventListener('click', handleClickOutside));
</script>
