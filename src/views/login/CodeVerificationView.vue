<template>
    <div class="min-h-screen bg-gray-100 flex flex-col">
        <LoginTopBanner />
        <div class="flex-1 mt-20 px-6 py-8 ">
            <form @submit.prevent="verifyCode" class="max-w-md mx-auto space-y-6 bg-white p-6 rounded-lg shadow">
                <p class="text-gray-700 text-sm">Se ha enviado un código su correo, ingrese el código en el siguiente recuadro:</p>
                <div>
                    <InputField id="code" v-model="form.code" type="text" placeholder="Ingrese el código"
                        label="Código" required />
                </div>
        
                <FormButton type="submit">Verificar Código</FormButton>
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

const showPasswordWarning = ref(false);


const router = useRouter()

const verifyCode = () => {
    showPasswordWarning.value = true;
    setTimeout(() => {
        router.push({ name: 'ResetPassword' });
    }, 3000);
}

</script>
