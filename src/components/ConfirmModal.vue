<template>
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
        <div class="relative bg-white rounded-lg shadow-lg max-w-sm w-full p-6 dark:bg-gray-800">
            <img src="/assets/left-modal.png" alt="left-decoration" class="absolute top-0 left-0 w-12 h-12" />
            <img src="/assets/right-modal.png" alt="right-decoration" class="absolute top-0 right-0 w-12 h-12" />

            <div class="text-center mt-4 mb-6">
                <p class="text-lg font-medium text-gray-900 dark:text-white">¡Se ha registrado exitosamente!</p>
            </div>

            <div class="flex justify-center mb-2">
                <button @click="$emit('confirm')"
                    class="px-6 py-1 bg-purple-800 text-white rounded text-sm hover:bg-purple-900 transition">
                    Ingresar
                </button>
            </div>

            <img src="/assets/bottom-modal.png" alt="bottom-decoration" class="mx-auto h-auto" />
        </div>
    </div>

    <div>
        

        <div id="modal" tabindex="-1" aria-hidden="true"
            class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative w-full max-w-2xl max-h-full">
                <!-- Modal content -->
                <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                    <!-- Modal header -->
                    <div class="relative bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
                        <!-- Esquinas decorativas -->
                        <img src="/assets/left-modal.png" alt="left-decoration"
                            class="absolute top-0 left-0 w-12 h-12" />
                        <img src="/assets/right-modal.png" alt="right-decoration"
                            class="absolute top-0 right-0 w-12 h-12" />

                        <!-- Contenido -->
                        <div class="text-center mt-4 mb-6">
                            <p class="text-lg font-medium">¡Se ha registrado exitosamente!</p>
                        </div>

                        <!-- Botón de ingresar -->
                        <div class="flex justify-center mb-2">
                            <button @click="onConfirm"
                                class="px-6 py-1 bg-purple-800 text-white rounded text-sm hover:bg-purple-900 transition">
                                Ingresar
                            </button>
                        </div>

                        <!-- Adorno inferior -->
                        <img src="/assets/bottom-modal.png" alt="bottom-decoration" class="mx-auto h-auto" />
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({ show: Boolean })
defineEmits(['confirm'])
</script>
