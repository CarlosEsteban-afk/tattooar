<template>
  <div class="min-h-screen bg-gray-100 flex flex-col">
    <LoginTopBanner />
    <div class="flex-1 px-6 py-8">
      <form @submit.prevent="login" class="max-w-md mx-auto space-y-6 bg-white p-6 rounded-lg shadow">
        <InputField id="email" v-model="form.email" type="email" placeholder="correo@ejemplo.com" label="Correo"
          required />
        <div>
          <InputField id="password" v-model="form.password" type="password" placeholder="Ingresa tu contraseña"
            label="Contraseña" required minlength="6" />
          <p class="text-purple-600 hover:underline mt-2">
            <a @click.prevent="goToForgotPassword" class="text-purple-600 hover:underline cursor-pointer">¿Olvidaste tu
              contraseña?</a>
          </p>
        </div>

        <AlertPop :show="showAlert" type="error" title="Credenciales Incorrectas." message="Intenta nuevamente" />

        <FormButton type="submit">
          Iniciar sesión
        </FormButton>
        <p class="text-center text-gray-500">
          ¿No tienes cuenta? <a @click.prevent="goToRegister"
            class="text-purple-600 hover:underline cursor-pointer">Regístrate</a>

        </p>

      </form>

        <SuccessModal :show="showModal" message="¡Inicio de sesión exitoso!" :onConfirm="handleRedirect" />


    </div>

  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/UserStore'
import InputField from '../../components/InputField.vue'
import LoginTopBanner from '../../components/LoginTopBanner.vue'
import FormButton from '../../components/FormButton.vue'
import SuccessModal from '../../components/SuccessModal.vue'
import AlertPop from '../../components/AlertPop.vue'
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

onMounted(() => {
  initFlowbite()
})

const form = reactive({
  email: '',
  password: ''
})

const showModal = ref(false)


const showAlert = ref(false)

const handleRedirect = () => {
  showModal.value = false
  router.push({ name: 'Home' })
}

const router = useRouter()
const userStore = useUserStore()

const goToRegister = () => {
  router.push({ name: 'Register' })
}
const goToForgotPassword = () => {
  router.push({ name: 'ForgotPassword' })
}

const login = async () => {
  try {
    await userStore.login(form.email, form.password)
    showAlert.value = false
    showModal.value = true
  } catch (err) {
    console.error(err)
    showAlert.value = true
  }
}

</script>
