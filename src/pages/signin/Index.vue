<template>
  <q-page class="flex flex-center column justify-center q-px-md">
    <q-icon name="fas fa-chevron-left" size="23px" class="absolute-left q-ma-lg" color="grey" />

    <div class="full-width column items-center justify-center">
      <q-img class="logo q-mb-lg" src="../../../src/assets/instadev-logo.svg" />

      <q-form class="full-width" @submit.prevent="onSubmit">
        <q-input filled v-model="credencial" label="E-mail ou usuário" class="full-width q-mb-md" />

        <q-input filled v-model="password" label="Password" type="password" class="full-width" />

        <div class="column items-end full-width">
          <a class="q-mt-md link" href="">Forgot password?</a>
        </div>

        <q-btn
          type="submit"
          color="primary"
          label="Log in"
          :disable="!credencial || !password"
          class="sign-in-button full-width q-mt-lg"
        />
      </q-form>

      <div class="flex full-width row items-center justify-center q-mt-xl">
        <q-img class="facebook-icon" src="../../../src/assets/facebook-logo.svg" />
        <a class="link q-ml-xs" href="">Log in with Facebook</a>
      </div>

      <div class="full-width row items-center justify-center q-mt-xl">
        <q-separator class="separator" inset />
        <span class="text-black-opacity">OR</span>
        <q-separator class="separator full-width q-mt-xl" inset />
      </div>

      <div class="full-width row items-center justify-center">
        <span class="text-black-opacity">Don’t have an account?</span>
        <a class="q-ml-xs link" href="">Sign up.</a>
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
export default {
  name: 'SignIn',
  data() {
    return {
      credencial: '',
      password: '',
    }
  },
  methods: {
    async onSubmit() {
      const api = await this.$axios.post('/auth', {
        email: this.credencial,
        password: this.password,
      })
      console.log(api);
      this.$router.push({ path: 'main' });
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
.facebook-icon {
  height: 17px;
  width: 17px;
}
.separator {
  width: 350%;
}
.seta {
  height: 17px;
  width: 17px;
}
</style>
