<template>
  <q-page class="flex">
    <div class="container-top full-width absolute-top q-mt-lg">
    <TopBarTemp/>
    <q-separetor class="full-width q-mt-sm"/>
    </div>
    <q-scroll-area
    horizontal
    :visible="false"
    class="scroll-area full-width"
    >
      <div class="row no-wrap">
        <div class="full-width" v-for="item in 10" :key="item">
          <div class="column items-center justify-center q-mr-md">
            <div class="story-border">
             <q-avatar size="62px">
              <img class="avatar" src="https://cdn.quasar.dev/img/avatar.png" />
             </q-avatar>
            </div>
           <span>Nome</span>
          </div>
        </div>
      </div>
    </q-scroll-area>
    <div class="container-bottom full-width absolute-bottom q-pb-lg">
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
.scroll-area{
  height: 98px;
  margin-top: 70px;
}
.container-bottom {
  background-color: #FAFAFA;
}


.story-border {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  border-radius: 50%;
  background: linear-gradient(#FBAA47, #D91A46, #A60F93);
}

.avatar {
  border: 2px solid #ffffff;
  border-radius: 50%;
  object-fit: cover;
}
</style>