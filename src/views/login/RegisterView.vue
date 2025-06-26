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
                    <input id="isTattooer" v-model="form.isTattooer" type="checkbox"
                        class="h-4 w-4 text-purple-600 border-gray-300 rounded" />
                    <label for="isTattooer" class="text-gray-700">Soy tatuador/a</label>
                </div>
                <FormButton type="submit">Registrarse</FormButton>
            </form>
            <SuccessModal :show="showModal" message="¡Registro exitoso!" subMessage="Revisa tu correo para confirmar tu cuenta." :onConfirm="handleRedirect" />

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
import SuccessModal from '../../components/SuccessModal.vue'
import AlertPop from '../../components/AlertPop.vue'
import { ref } from 'vue'
import axios from 'axios'

const showModal = ref(false)

function handleRedirect() {
    showModal.value = false
    router.push({ name: 'Login' })
}

const form = reactive({
    fullName: '',
    email: '',
    password: '',
    repeatPassword: '',
    isTattooer: false,
})
const showPasswordWarning = computed(() => {
    return form.password.length > 0 && form.password.length < 8
})
const showRepeatPasswordWarning = computed(() => {
    return form.repeatPassword != form.password
})
const router = useRouter()

async function register() {
  if (showPasswordWarning.value || showRepeatPasswordWarning.value) return

  try {
    const response = await axios.post('http://localhost:4000/v1/auth/register', {
      fullName: form.fullName,
      email: form.email,
      password: form.password,
      isTattooer: form.isTattooer,
    })

    console.log('Success:', response.data)
    showModal.value = true
  } catch (error) {
    console.error('Error during registration:', error.response?.data || error.message)
    // You can show another AlertPop for error
  }
}
</script>