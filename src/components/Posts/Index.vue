<template>
  <div class="full-width q-pb-xl">
    <div class="column full-width" v-for="item in items" :key="item.id">
      <div class="row justify-between items-center full-width">
        <div class="row items-center">
          <q-avatar size="28px" class="q-mx-md">
            <img src="https://cdn.quasar.dev/img/avatar.png" />
          </q-avatar>
          <div class="column">
            <strong>{{ item.user.user_name }}</strong>
            <span>Tokyo, Japa</span>
          </div>
        </div>
        <q-icon class="q-mr-md" name="fas fa-ellipsis-h" size="15px" color="dark-items" />
      </div>

      <q-img
        class="q-mt-sm cursor-pointer"
        :src="item.image"
        :ratio="1"
        @dblclick="handleLike(item.id)"
      >
        <q-icon
          v-if="animatedPostId === item.id"
          class="absolute-center animate-like"
          name="fas fa-heart"
          color="white"
        />
      </q-img>

      <div class="row justify-between q-mx-sm q-my-md">
        <div>
          <q-img
            class="q-mr-md cursor-pointer"
            width="25px"
            src="../../assets/curtidas.svg"
            @click="handleLike(item.id)"
          />
          <q-img class="q-mr-md" width="22px" src="../../assets/comentarios.svg" />
          <q-img class="q-mr-md" width="25px" src="../../assets/direct.svg" />
        </div>

        <q-icon class="q-mr-xl" name="fas fa-ellipsis-h" size="20px" color="dark-items" />
        <q-img width="20px" src="../../assets/salvar.svg" />
      </div>

      <div class="row items-center q-mb-xs" v-if="likesOf(item) > 0">
        <q-avatar size="17px" class="q-ml-sm q-mr-xs">
          <img src="https://cdn.quasar.dev/img/avatar.png" />
        </q-avatar>
        Liked by <strong>{{ item.user.user_name }}</strong> and
        <strong>{{ likesOf(item) }} others</strong>
      </div>

      <div class="q-mx-sm q-mb-lg">
        <strong>{{ item.user.user_name }}</strong> {{ item.description }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostsPage',
  props: ['items'],

  data() {
    return {
      animatedPostId: null,
      likedPosts: {},
      likesCount: {},
    }
  },

  watch: {
    items: {
      immediate: true,
      handler(newItems) {
        newItems.forEach((item) => {
          if (this.likesCount[item.id] === undefined) {
            this.likesCount[item.id] = Number(item.number_likes) || 0
          }
        })
      },
    },
  },

  methods: {
    likesOf(item) {
      if (this.likesCount[item.id] !== undefined) {
      return this.likesCount[item.id]
    }

      return Number(item.number_likes) || 0
    },

    handleLike(postId) {
      this.animatedPostId = postId

      setTimeout(() => {
        if (this.animatedPostId === postId) {
          this.animatedPostId = null
        }
      }, 600)

      if (this.likedPosts[postId]) {
        return
      }

      this.likedPosts[postId] = true
      this.likesCount[postId] = (this.likesCount[postId] || 0) + 1
    },
  },
}
</script>

<style lang="scss" scoped>
.animate-like {
  animation-duration: 500ms;
  animation-name: liked;
}

@keyframes liked {
  from {
    font-size: 45px;
  }
  10% {
    font-size: 48px;
  }
  75% {
    font-size: 75px;
  }
  90% {
    font-size: 75px;
  }
  to {
    font-size: 0px;
  }
}
</style>