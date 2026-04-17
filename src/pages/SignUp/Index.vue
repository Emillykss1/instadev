<template>
  <q-page class="flex flex-center column justify-center q-px-md">

    <div class="full-width column items-center justify-center">
      <q-icon name="fas fa-chevron-left"
       size="23px"
       class="absolute-left q-ma-lg"
       color="grey"></q-icon>
      <q-img class="logo q-mb-lg" src="../../../src/assets/instadev-logo.svg"></q-img>

      <q-input filled v-model="email" label="E-mail" class="full-width q-mb-md" />
      <q-input filled v-model="userName" label="Username" class="full-width q-mb-md" />
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
        color="primary"
        :disable="true"
        label="Sign Up"
        class="sign-in-button full-width q-mt-lg"
      />


      <div class="full-width row items-center justify-center q-mt-xl">
        <q-separator class="separator" inset />
        <span class="text-black-opacity">OR</span>
        <q-separator class="separator full-width q-mt-xl" inset />
      </div>

      <div class="full-width row items-center justify-center">
        <span class="text-black-opacity">
            already have an account?
        </span>
         <a class="q-ml-xs link" href="">Sign In.</a>
      </div>
    </div>
    <div class="full-width column items-center absolute-bottom">
      <q-separato class="full-width" />
      <div class="q-my-lg">
        <span class="text-black-opacity">Instagram ot Facebook</span>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'SignUp',
  data() {
    return {
      email: '',
      userName: '',
      password: '',
      confirmPassword:'',
    }
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
