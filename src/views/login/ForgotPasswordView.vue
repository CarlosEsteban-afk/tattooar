<template>
    <div class="min-h-screen bg-gray-100 flex flex-col">
        <LoginTopBanner />
        <div class="flex-1 mt-20 px-6 py-8 ">
            <form @submit.prevent="sendVerificationCode"
                class="max-w-md mx-auto space-y-6 bg-white p-6 rounded-lg shadow">
                <p class="text-gray-700 text-sm">Se enviará un código su correo, ingrese su correo en el siguiente
                    recuadro:</p>
                <div>
                    <InputField id="email" v-model="form.email" type="email" placeholder="correo@ejemplo.com"
                        label="Correo" required />
                </div>
                <AlertPop v-if="showAlert" :show="showAlert" type="success" title="Correo enviado"
                    message="Revisa tu bandeja de entrada para el código de verificación." />

                <FormButton type="submit">Enviar Correo</FormButton>
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
import AlertPop from '../../components/AlertPop.vue'
const form = reactive({
    email: '',
})

const showAlert = ref(false);

const sendVerificationCode = () => {
    console.log('Código de verificación enviado a:', form.email);
    showAlert.value = true;
    setTimeout(() => {
        router.push({ name: 'CodeVerification' });
    }, 3000);
}

const router = useRouter()


</script>
