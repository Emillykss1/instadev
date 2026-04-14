<template>
  <q-page class="flex flex-center">
    <div class="full-width absolute-top q-mt-lg">
    <TopBarTemp/>
    <q-separetor class="full-width q-mt-sm"/>
    </div>
    <div class="container-bottom full-width absolute-bottom q-mb-lg">
      <q-separetor class="full-width q-mb-sm"/>
    <BottomBar/>
    </div>
  </q-page>
</template>

<script>
import TopBarTemp from 'src/components/TopBarTemp/Index.vue';
import BottomBar from 'src/components/BottomBar/Index.vue';

export default {
  name: 'MainPage',
  components: {
    TopBarTemp,
    BottomBar
  },
};
</script>

<style lang="scss" scoped>
.container-bottom {
  background-color: #FAFAFA;
}
</style>