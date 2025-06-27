<template>
    <div class="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
        <!-- Información de elementos mostrados -->
        <div class="flex flex-1 justify-between sm:hidden">
            <button
                @click="previousPage"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                Anterior
            </button>
            <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                Siguiente
            </button>
        </div>
        
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
                <p class="text-sm text-gray-700">
                    Mostrando
                    <span class="font-medium">{{ startItem }}</span>
                    a
                    <span class="font-medium">{{ endItem }}</span>
                    de
                    <span class="font-medium">{{ totalItems }}</span>
                    resultados
                </p>
            </div>
            
            <!-- Navegación de páginas -->
            <div>
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <!-- Botón Anterior -->
                    <button
                        @click="previousPage"
                        :disabled="currentPage === 1"
                        class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                        <span class="sr-only">Anterior</span>
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                    </button>
                    
                    <!-- Números de página -->
                    <template v-for="page in visiblePages" :key="page">
                        <!-- Separador de páginas -->
                        <span v-if="page === '...'" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                            ...
                        </span>
                        <!-- Página específica -->
                        <button
                            v-else
                            @click="goToPage(page)"
                            :class="[
                                page === currentPage
                                    ? 'z-10 bg-purple-50 border-purple-500 text-purple-600'
                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                                'relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                            ]">
                            {{ page }}
                        </button>
                    </template>
                    
                    <!-- Botón Siguiente -->
                    <button
                        @click="nextPage"
                        :disabled="currentPage === totalPages"
                        class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                        <span class="sr-only">Siguiente</span>
                        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </nav>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    currentPage: {
        type: Number,
        required: true
    },
    totalItems: {
        type: Number,
        required: true
    },
    itemsPerPage: {
        type: Number,
        required: true
    },
    maxVisiblePages: {
        type: Number,
        default: 5
    }
})

const emit = defineEmits(['page-change'])

// Computed properties
const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage))

const startItem = computed(() => {
    return props.totalItems === 0 ? 0 : (props.currentPage - 1) * props.itemsPerPage + 1
})

const endItem = computed(() => {
    return Math.min(props.currentPage * props.itemsPerPage, props.totalItems)
})

const visiblePages = computed(() => {
    const pages = []
    const total = totalPages.value
    
    if (total <= props.maxVisiblePages) {
        // Si hay pocas páginas, mostrar todas
        for (let i = 1; i <= total; i++) {
            pages.push(i)
        }
    } else {
        // Lógica para mostrar páginas con ellipsis
        const halfVisible = Math.floor(props.maxVisiblePages / 2)
        
        if (props.currentPage <= halfVisible + 1) {
            // Estamos cerca del inicio
            for (let i = 1; i <= props.maxVisiblePages - 1; i++) {
                pages.push(i)
            }
            pages.push('...')
            pages.push(total)
        } else if (props.currentPage >= total - halfVisible) {
            // Estamos cerca del final
            pages.push(1)
            pages.push('...')
            for (let i = total - props.maxVisiblePages + 2; i <= total; i++) {
                pages.push(i)
            }
        } else {
            // Estamos en el medio
            pages.push(1)
            pages.push('...')
            for (let i = props.currentPage - halfVisible; i <= props.currentPage + halfVisible; i++) {
                pages.push(i)
            }
            pages.push('...')
            pages.push(total)
        }
    }
    
    return pages
})

// Methods
function previousPage() {
    if (props.currentPage > 1) {
        emit('page-change', props.currentPage - 1)
    }
}

function nextPage() {
    if (props.currentPage < totalPages.value) {
        emit('page-change', props.currentPage + 1)
    }
}

function goToPage(page) {
    if (page !== props.currentPage && page !== '...') {
        emit('page-change', page)
    }
}
</script> 