<template>
  <div class="full-width q-pb-xl">
    <div class="column full-width" v-for="item in items" :key="item.id">
      <div class="row justify-between items-center full-width">
        <div class="row items-center">
          <q-avatar size="28px" class="q-mx-md">
            <img
              :src="
                String(item.user.id) === String(userData.id)
                  ? (userData.avatar || 'https://www.shutterstock.com/image-vector/blank-avatar-photo-placeholder-flat-600nw-1151124605.jpg')
                  : 'https://cdn.quasar.dev/img/avatar.png'"
            />
          </q-avatar>

          <div class="column">
            <strong>{{ item.user.user_name }}</strong>
            <span>Tokyo, Japa</span>
          </div>
        </div>

        <q-icon
          class="q-mr-md cursor-pointer"
          name="fas fa-ellipsis-h"
          size="15px"
          color="dark-items"
        >
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item
                clickable
                v-close-popup
                v-if="String(item.user.id) === String(userData.id)"
                @click="confirmDelete(item.id)"
              >
                <q-item-section>
                  Excluir post
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup v-else>
                <q-item-section>Deixar de seguir</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-icon>
      </div>

      <q-img
        class="q-mt-sm cursor-pointer"
        :src="item.image"
        :ratio="1"
        @click="registerClick(item.id)"
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
          <q-img
            class="q-mr-md"
            width="22px"
            src="../../assets/comentarios.svg"
          />
          <q-img
            class="q-mr-md"
            width="25px"
            src="../../assets/direct.svg"
          />
        </div>

        <q-icon
          class="q-mr-xl"
          name="fas fa-ellipsis-h"
          size="20px"
          color="dark-items"
        />
        <q-img width="20px" src="../../assets/salvar.svg" />
      </div>

      <div class="row items-center q-mb-xs" v-if="likesOf(item) > 0">
        <q-avatar size="17px" class="q-ml-sm q-mr-xs">
          <img
            :src="userData.avatar || 'https://www.shutterstock.com/image-vector/blank-avatar-photo-placeholder-flat-600nw-1151124605.jpg'"
          />
        </q-avatar>
        Liked by <strong>{{ userData.user_name }}</strong> and
        <strong>{{ likesOf(item) }} others</strong>
      </div>

      <div class="q-mx-sm q-mb-lg">
        <strong>{{ item.user.user_name }}</strong> {{ item.description }}
      </div>
    </div>
  </div>
</template>

<script>
import { useUserStore } from 'src/stores/user-store'
import { useDeletePostStore } from 'src/stores/delete-post'

export default {
  name: 'PostsPage',
  props: ['items'],
  emits: ['reload-posts'],

  data() {
    return {
      userData: {},
      animatedPostId: null,
      likedPosts: {},
      likesCount: {},
      clickCount: 0,
      clickedPostId: null,
      clickTimer: null,
    }
  },

  async mounted() {
    const userStore = useUserStore()

    if (!userStore.user || !userStore.user.id) {
      await userStore.getUserData()
    }

    this.userData = userStore.user || {}
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
  confirmDelete(postId) {
    this.$q.dialog({
      title: 'Excluir Post',
      message: 'Confirma a exclusão do post?',
      cancel: true,
      persistent: true,
    }).onOk(async () => {
      try {
        const deletePostStore = useDeletePostStore()
        const response = await deletePostStore.deletePost(postId)

        console.log(response)
        this.$emit('reload-posts')
      } catch (error) {
        console.error(error)
      }
    })
  },

  likesOf(item) {
    if (this.likesCount[item.id] !== undefined) {
      return this.likesCount[item.id]
    }

    return Number(item.number_likes) || 0
  },

  registerClick(postId) {
    if (this.clickedPostId !== postId) {
      this.clickCount = 0
    }

    this.clickedPostId = postId
    this.clickCount++

    clearTimeout(this.clickTimer)

    this.clickTimer = setTimeout(() => {
      this.clickCount = 0
      this.clickedPostId = null
    }, 300)

    if (this.clickCount === 2) {
      this.handleLike(postId)
      this.clickCount = 0
      this.clickedPostId = null
      clearTimeout(this.clickTimer)
    }
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
}
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