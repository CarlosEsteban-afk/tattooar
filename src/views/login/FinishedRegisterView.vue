<template>
    <div class="min-h-screen bg-gray-100 flex flex-col">
        <LoginTopBanner />
        <div class="flex-1 mt-20 px-6 py-8 ">
            <form @submit.prevent="verifyCode" class="max-w-md mx-auto space-y-6 bg-white p-6 rounded-lg shadow">
                <p class="text-gray-700 text-sm">Su código a sido verificado exitosamente! Regrese a la pantalla de inicio para iniciar sesión</p>        
                <FormButton type="submit">Volver a Pantalla de Inicio</FormButton>
            </form>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import InputField from '../../components/InputField.vue'
import LoginTopBanner from '../../components/LoginTopBanner.vue'
import FormButton from '../../components/FormButton.vue'

const form = reactive({
    code: '',
})



const router = useRouter()

const verifyCode = () => {
    setTimeout(() => {
        router.push({ name: 'Home' });
    }, 3000);
}

</script>
