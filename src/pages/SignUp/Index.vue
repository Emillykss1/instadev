<template>
  <q-page class="flex flex-center column justify-center q-px-md">
    <q-icon
      name="fas fa-chevron-left"
      size="23px"
      class="absolute-left q-ma-lg cursor-pointer"
      color="grey"
      @click="goTo('/sign-in')"
    />

    <div class="full-width column items-center justify-center">
      <q-img class="logo q-mb-lg" src="../../../src/assets/instadev-logo.svg" />

      <q-form class="full-width" @submit.prevent="onSubmit">
        <q-input
          filled
          v-model="name"
          label="Name"
          class="full-width q-mb-md"
        />
        <q-input
          filled
          v-model="email"
          label="E-mail"
          class="full-width q-mb-md"
        />

        <q-input
          filled
          v-model="userName"
          label="Username"
          class="full-width q-mb-md"
        />

        <q-input
          filled
          v-model="password"
          label="Password"
          type="password"
          class="full-width q-mb-md"
        />

        <q-input
          filled
          v-model="confirmPassword"
          label="Confirm Password"
          type="password"
          class="full-width"
        />

        <q-btn
          type="submit"
          color="primary"
          label="Sign Up"
          class="sign-in-button full-width q-mt-lg"
          :loading="loading"
        />
      </q-form>

      <div class="full-width row items-center justify-center q-mt-xl">
        <q-separator class="separator" inset />
        <span class="text-black-opacity">OR</span>
        <q-separator class="separator full-width q-mt-xl" inset />
      </div>

      <div class="full-width row items-center justify-center">
        <span class="text-black-opacity">already have an account?</span>
        <a class="q-ml-xs link cursor-pointer" @click="goTo('/sign-in')">Sign In.</a>
      </div>
    </div>

    <div class="full-width column items-center absolute-bottom">
      <q-separator class="full-width" />
      <div class="q-my-lg">
        <span class="text-black-opacity">Instagram ot Facebook</span>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useAuthStore } from 'src/stores/auth-store'

export default {
  name: 'SignUp',

  data() {
    return {
      name: '',
      email: '',
      userName: '',
      password: '',
      confirmPassword: '',
      loading: false,
    }
  },

  methods: {
    goTo(route) {
      this.$router.push({ path: route })
    },

    async onSubmit() {
  const authStore = useAuthStore()

  if (!this.name || !this.email || !this.userName || !this.password || !this.confirmPassword) {
    this.$q.notify({
      type: 'negative',
      message: 'Todos os campos são obrigatórios',
      position: 'top',
    })
    return
  }

  if (this.password !== this.confirmPassword) {
    this.$q.notify({
      type: 'negative',
      message: 'As senhas não coincidem',
      position: 'top',
    })
    return
  }

  try {
    this.loading = true

    await authStore.makeRegister({
      name: this.name,
      email: this.email,
      user_name: this.userName,
      password: this.password,
    })

    this.$q.notify({
      type: 'positive',
      message: 'Usuário cadastrado com sucesso',
      position: 'top',
    })

    setTimeout(() => {
      this.goTo('/sign-in')
    }, 800)
  } catch (error) {
    console.error(error)
    this.$q.notify({
      type: 'negative',
      message: 'Falha ao cadastrar usuário',
      position: 'top',
    })
  } finally {
    this.loading = false
  }
 },
  },
}
</script>

<style lang="scss" scoped>
.logo {
  height: 49px;
  width: 182px;
}

.sign-in-button {
  height: 44px;
  border-radius: 5px;
  background-color: $instablue;
  opacity: 60%;
}

.separator {
  width: 350%;
}
</style>