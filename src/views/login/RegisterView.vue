<template>
    <div class="min-h-screen bg-gray-100 flex flex-col">
        <LoginTopBanner />
        <div class="flex-1 px-6 py-8">
            <form @submit.prevent="register" class="max-w-md mx-auto space-y-6 bg-white p-6 rounded-lg shadow">
                <div>
                    <InputField id="fullName" v-model="form.fullName" type="text"
                        placeholder="Ingrese su nombre completo" label="Nombre completo" required />
                </div>
                <div>
                    <InputField id="email" v-model="form.email" type="email" placeholder="correo@ejemplo.com"
                        label="Correo" required />
                </div>
                <div>
                    <InputField id="password" v-model="form.password" type="password"
                        placeholder="Ingrese su contraseña" label="Contraseña" required minlength="8" />
                </div>
                <AlertPop :show="showPasswordWarning" type="warning" title="Contraseña débil."
                    message="Asegúrate de que tu contraseña tenga al menos 8 caracteres." />
                <div>
                    <InputField id="repeatPassword" v-model="form.repeatPassword" type="password"
                        placeholder="Repita su contraseña" label="Repetir Contraseña" required minlength="8" />
                </div>
                <AlertPop :show="showRepeatPasswordWarning" type="warning" title="Las contraseñas no coinciden"
                    message="Asegúrate de que ambas contraseñas sean iguales." />
                <div class="flex items-center space-x-2">
                    <input id="isArtist" v-model="form.isArtist" type="checkbox"
                        class="h-4 w-4 text-purple-600 border-gray-300 rounded" />
                    <label for="isArtist" class="text-gray-700">Soy tatuador/a</label>
                </div>
                <FormButton type="submit">Registrarse</FormButton>
            </form>

        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { computed } from 'vue'
import InputField from '../../components/InputField.vue'
import LoginTopBanner from '../../components/LoginTopBanner.vue'
import FormButton from '../../components/FormButton.vue'
import AlertPop from '../../components/AlertPop.vue'
const form = reactive({
    fullName: '',
    email: '',
    password: '',
    repeatPassword: '',
    isArtist: false,
})
const showPasswordWarning = computed(() => {
    return form.password.length > 0 && form.password.length < 8
})
const showRepeatPasswordWarning = computed(() => {
    return form.repeatPassword != form.password
})
const router = useRouter()

function register() {
    if (form.password !== form.repeatPassword) {
        return;
    }
    console.log('Registrando usuario:', form)
    router.push({ name: 'CodeVerification' })
}
</script>