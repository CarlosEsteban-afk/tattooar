<template>
    <div class="min-h-screen bg-gray-100 flex flex-col">
        <LoginTopBanner />

        <div class="flex-1 px-6 py-8">
            <form @submit.prevent="register" class="max-w-md mx-auto space-y-6 bg-white p-6 rounded-lg shadow">

                <div>
                    <InputField
                        id="fullName"
                        v-model="form.fullName"
                        type="text"
                        placeholder="Ingrese su nombre completo"
                        label="Nombre completo"
                        required
                    />
                </div>
                <div>
                    <InputField
                        id="email"
                        v-model="form.email"
                        type="email"
                        placeholder="correo@ejemplo.com"
                        label="Correo"
                        required
                    />
                </div>
                <div>
                    <InputField
                        id="password"
                        v-model="form.password"
                        type="password"
                        placeholder="Ingrese su contraseña"
                        label="Contraseña"
                        required
                        minlength="6"
                    />
                </div>
                <div>
                    <InputField
                        id="repeatPassword"
                        v-model="form.repeatPassword"
                        type="password"
                        placeholder="Repita su contraseña"
                        label="Repetir Contraseña"
                        required
                        minlength="6"
                    />
                </div>
                <div class="flex items-center space-x-2">
                    <input id="isArtist" v-model="form.isArtist" type="checkbox"
                        class="h-4 w-4 text-purple-600 border-gray-300 rounded" />
                    <label for="isArtist" class="text-gray-700">Soy tatuador/a</label>
                </div>
                <button type="submit"
                    class="w-full py-3 bg-purple-800 text-white font-semibold rounded hover:bg-purple-900 transition">
                    Registrar
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import InputField from '../components/InputField.vue'
import LoginTopBanner from '../components/LoginTopBanner.vue'

const form = reactive({
    fullName: '',
    email: '',
    password: '',
    isArtist: false,
})

const router = useRouter()

function register() {
    if (form.password !== form.repeatPassword) {
        alert('Las contraseñas no coinciden')
        //agregar popup 
        return;
    }

    console.log('Registrando usuario:', form)

    // router.push({ name: 'Home' })
}
</script>

