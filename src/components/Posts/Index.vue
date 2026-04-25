<template>
  <div class="full-width q-pb-xl">
      <div class="column full-width" v-for="item in items" :key="item.id">
    <div class="row justify-between items-center full-width">
      <div class="row items-center">
        <q-avatar size="28px" class="q-mx-md">
            <img src="https://cdn.quasar.dev/img/avatar.png" />
        </q-avatar>
        <div class="column">
          <strong>{{item.user.user_name}}</strong>
          <span>Tokyo, Japa</span>
        </div>
      </div>
      <q-icon class="q-mr-md" name="fas fa-ellipsis-h" size="15px" color="dark-items"></q-icon>
    </div>
    <q-img class="q-mt-sm cursor-pointer"
          :src="item.image" 
          :ratio="1" 
          @click="countClicks++"
      >
      <q-icon
        v-if="animationClass != ''"
        :class="animationClass"
        class="absolute-center"
        name="fas fa-heart"
        color="white"
      />
      </q-img>

    <div class="row justify-between q-mx-sm q-my-md">
    <div>    
        <q-img class="q-mr-md" width="25px"  src="../../assets/curtidas.svg" ></q-img>
        <q-img class="q-mr-md" width="22px" src="../../assets/comentarios.svg" ></q-img>
        <q-img class="q-mr-md" width="25px" src="../../assets/direct.svg"></q-img>             
    </div>         
    <q-icon class="q-mr-xl" name="fas fa-ellipsis-h" size="20px" color="dark-items"></q-icon> 
    <q-img width="20px" src="../../assets/salvar.svg"></q-img>       
    </div> 
    <div class="row items-center q-mb-xs" v-if="item.number_likes">
      <q-avatar size="17px" class="q-ml-sm q-mr-xs">
            <img src="https://cdn.quasar.dev/img/avatar.png" />
      </q-avatar>
      Liked by <strong>{{ item.user.user_name }}</strong> and <strong>{{ item.number_likes }} others</strong>
    </div>
    <div class="q-mx-sm q-mb-lg">
      <strong>{{ item.user.user_name }}</strong> {{ item.description }}
    </div>
    </div>
  </div>
</template>

<script >
export default{
  name: 'PostsPage',
  props: ['items'],
  data(){
    return{
    animationClass: '',
    countClicks: 0
   };
  },
  watch: {
    countClicks(){
      setTimeout(() => {
        if(this.countClicks != 2){
        this.countClicks = 0;
       }
      }, 1000);

      
      if(this.countClicks == 2){
        this.addLikeInPost();
        this.countClicks = 0
      }
    },
  },
  methods: {
    addLikeInPost(){
      this.animationClass = 'animate-like';
      setTimeout(() =>{
      this.animationClass = '';
    }, 600);
  },
},
};
</script>

<style lang="scss" scoped>
.animate-like {
  animation-duration: 500ms;
  animation-name: liked;
}
@keyframes liked{
    from{
      font-size: 45px;
    }
    10%{
      font-size: 48px;
    }
    75%{
      font-size: 75px;
    }
    90%{
      font-size: 75px;
    }
    to{
      font-size: 0px;
    }
}

</style>