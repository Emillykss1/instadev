<template>
<div class="bottom-bar full-width row justify-around items-center">
  <q-img  src="../../assets/house.svg" width="32px" @click="goTo('main')"></q-img>
  <q-img  src="../../assets/reels.svg" width="32px"></q-img>
  <q-img class="enviar"  src="../../assets/direct.svg" ></q-img>
  <q-img  src="../../assets/pesquisas.svg" width="34px"></q-img>
  <q-avatar size="29px" class="cursor-point" @click="goTo('/my-area')">
    <img :src="avatarUrl" />
  </q-avatar>

</div>
</template>

<script>
import { useUserStore } from 'src/stores/user-store'

export default {
  name: 'BottomBar',

  computed: {
    user() {
      const userStore = useUserStore()
      return userStore.user || {}
    },

    avatarUrl() {
      return this.user.avatar || 'https://www.shutterstock.com/image-vector/blank-avatar-photo-placeholder-flat-600nw-1151124605.jpg'
    },
  },

  methods: {
    goTo(route) {
      this.$router.push({ path: route })
    },
  },
}
</script>
<style lang="scss" scoped>

.q-img{
  cursor: pointer;
}

.enviar{
    width:27px;
    height: 27px;
}
</style>