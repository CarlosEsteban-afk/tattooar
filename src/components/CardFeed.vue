<template>
    <div class="card overflow-hidden shadow bg-white">
        <div class="p-3">
            <button @click="goToProfile" class="flex items-center">
                <h2 class="text-xs text-gray-600">{{ author }}</h2>
            </button>
        </div>
        <div class="bg-gray-200 flex items-center justify-center h-70">
            <!-- Placeholder image -->
            <img src="https://flowbite.com/docs/images/blog/image-4.jpg" alt="tatuaje"
                class="object-cover w-full h-full" />
        </div>
        <div class="p-3">
            <h2 class="text-sm font-semibold truncate">{{ title }}</h2>
            <p class="text-xs text-gray-600">{{ desc }}</p>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter()

const goToProfile = () => {
    router.push({ name: 'TattooProfile', params: { id: props.id } })
}
const props = defineProps({
    id: {
        type: Number,
        required: true
    },
    title: String,
    author: String,
    desc: {
        type: String,
        default: 'Descripción del tatuaje'
    }
})

</script>

<style scoped>
.card {
    width: 340px;
    height: 380px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    justify-self: center;
}
</style>