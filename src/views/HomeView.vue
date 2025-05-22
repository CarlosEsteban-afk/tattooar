<template>

    <div>
        <a class="text-purple-600 hover:underline cursor-pointer" @click="goToLogin">Iniciar Sesión</a>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goToLogin = () => {
    router.push({ name: 'Login' })
}


</script>