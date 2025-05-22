<template>
    <div class="min-h-screen bg-gray-100 flex flex-col">
        <LoginTopBanner />
        <div class="flex-1 mt-20 px-6 py-8 ">
            <form @submit.prevent="resetPassword" class="max-w-md mx-auto space-y-6 bg-white p-6 rounded-lg shadow">
                <p class="text-gray-700 text-md">Ingrese su nueva contraseña:</p>
                <div>
                    <InputField id="password" v-model="form.newPassword" type="password"
                        placeholder="Ingrese su contraseña" label="Contraseña" required minlength="8" />
                </div>
                <AlertPop :show="showPasswordWarning" type="warning" title="Contraseña débil."
                    message="Asegúrate de que tu contraseña tenga al menos 8 caracteres." />
                <div>
                    <InputField id="repeatPassword" v-model="form.confirmPassword" type="password"
                        placeholder="Repita su contraseña" label="Repetir Contraseña" required minlength="8" />
                </div>
                <AlertPop :show="showRepeatPasswordWarning" type="warning" title="Las contraseñas no coinciden"
                    message="Asegúrate de que ambas contraseñas sean iguales." />
                <FormButton type="submit">Restablecer Contraseña</FormButton>
            </form>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import InputField from '../../components/InputField.vue'
import LoginTopBanner from '../../components/LoginTopBanner.vue'
import FormButton from '../../components/FormButton.vue'
import AlertPop from '../../components/AlertPop.vue'

const form = reactive({
    newPassword: '',
    confirmPassword: '',
})
const showPasswordWarning = computed(() => {
const boolean = form.newPassword.length > 0 && form.newPassword.length < 8


return boolean
})
const showRepeatPasswordWarning = computed(() => {
    return form.confirmPassword != form.newPassword
})

const router = useRouter()

const resetPassword = () => {
    if (form.newPassword !== form.confirmPassword) {
        return;
    }

    console.log('Restableciendo contraseña:', form)
    // router.push({ name: 'Login' })
    setTimeout(() => {
        router.push({ name: 'Login' });
    }, 3000);
}

</script>
