<template>
<div class="full-width row justify-between">
  <q-img class="q-ml-sm" src="../../assets/camera.svg" width="28px"></q-img>
  <q-img class="logo" src="../../assets/instadev-logo.svg"></q-img>
  <q-img class="q-mr-sm like" src="../../assets/curtidas.svg"></q-img>
</div>
</template>

<script>
export default {
  name: 'TopBarTemp'
};
</script>
<style lang="scss" scoped>
.logo {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 115px;
  height: 30px;
}
.q-img{
  cursor: pointer;
}
.like{
  width: 30px;
  height: 26px;
}
</style>