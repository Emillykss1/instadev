<template>
  <q-page class="flex column page-main">
    <MenuDrawer
      v-model:drawerRight="drawerRight"
      @close="drawerRight = false"
    />

    <div
      class="column q-pt-xl q-pb-md q-px-md full-width bg-grey-2"
      :class="{ 'drawer-open': drawerRight }"
    >
      <q-icon
        name="las la-bars"
        size="31px"
        class="absolute-right q-ma-lg cursor-pointer"
        @click="drawerRight = !drawerRight"
      />

      <div class="full-width row items-center justify-center">
        <q-icon name="fas fa-lock" color="black" size="11px" class="q-mr-xs" />
        <strong>{{ user.user_name || 'usuario' }}</strong>
        <q-icon name="fas fa-chevron-down" color="black" size="11px" class="q-ml-xs" />
      </div>

      <div class="row items-center justify-between full-width q-mt-lg">
        <div class="profile-border-neutral">
          <q-avatar size="96px" class="avatar-profile">
            <img
              class="avatar"
              :src="user.avatar || 'https://cdn.quasar.dev/img/avatar.png'"
            />
          </q-avatar>
        </div>

        <div class="column items-center">
          <strong>{{ posts.length }}</strong>
          <span>Posts</span>
        </div>

        <div class="column items-center">
          <strong>834</strong>
          <span>Followers</span>
        </div>

        <div class="column items-center">
          <strong>162</strong>
          <span>Following</span>
        </div>
      </div>

      <div class="column q-mt-md">
        <strong>{{ user.name || 'Sem nome' }}</strong>
        <span>{{ user.bio || 'Sem bio' }}</span>
      </div>

      <q-btn
        color="white"
        flat
        dense
        class="btn-edit full-width q-mt-md"
        text-color="black"
        label="Edit Profile"
        @click="goTo('profile')"
      />

      <div class="row">
        <div class="column items-center q-mr-md">
          <div class="story-border-neutral">
            <q-avatar size="64px" class="avatar-story">
              <q-icon name="las la-plus" />
            </q-avatar>
          </div>
          <span>New</span>
        </div>

        <div
          class="column items-center q-mr-md"
          v-for="item in 3"
          :key="item"
        >
          <div class="story-border-neutral">
            <q-avatar size="64px" class="avatar-story">
              <img class="avatar" src="https://cdn.quasar.dev/img/avatar.png" />
            </q-avatar>
          </div>
          <span>Friends</span>
        </div>
      </div>
    </div>

    <div
      class="full-width"
      :class="{ 'drawer-open': drawerRight }"
    >
      <q-separator />
      <q-tabs v-model="tab" class="text-teal" active-color="grey-8">
        <q-tab name="grid">
          <q-img src="../../assets/grid.svg" width="22px" />
        </q-tab>
        <q-tab name="profile">
          <q-img src="../../assets/profile.svg" width="22px" />
        </q-tab>
      </q-tabs>

      <div class="row q-mb-xl">
        <q-img
          v-for="item in posts"
          :key="item.id"
          class="cursor-pointer col-4"
          :ratio="1"
          :src="item.image || 'https://picsum.photos/500/300'"
        />
      </div>
    </div>

    <div
      class="container-bottom full-width q-pb-lg"
      :class="{ 'drawer-open': drawerRight }"
    >
      <q-separator class="full-width q-mb-sm" />
      <BottomBar />
    </div>
  </q-page>
</template>

<script>
import BottomBar from 'src/components/BottomBar/Index.vue'
import MenuDrawer from 'src/components/MenuDrawer/Index.vue'
import { useUserStore } from 'src/stores/user-store'
import { useMyPostsStore } from 'src/stores/my-posts-store'

export default {
  name: 'MyArea',

  components: {
    BottomBar,
    MenuDrawer,
  },

  data() {
    return {
      tab: 'grid',
      drawerRight: false,
      user: {},
      posts: [],
    }
  },

  async mounted() {
    await this.loadUserData()
    await this.loadMyPosts()
  },

  methods: {
    async loadUserData() {
      const userStore = useUserStore()
      const { user } = await userStore.getUserData()
      this.user = user || {}
      console.log('USER:', this.user)
    },

    async loadMyPosts() {
      const myPostsStore = useMyPostsStore()
      const posts = await myPostsStore.listMyPosts()
      this.posts = Array.isArray(posts) ? posts : []
},
    goTo(route){
    this.$router.push({path: route})
    },
  },
}
</script>

<style lang="scss" scoped>
.profile-border-neutral,
.story-border-neutral {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  border-radius: 50%;
  background: #dbdbe3;
}

.q-avatar {
  border-radius: 50%;
  overflow: hidden;
}

.avatar {
  width: 100%;
  height: 100%;
  border: 2px solid #ffffff;
  border-radius: 50%;
  object-fit: cover;
  display: block;
}

.btn-edit {
  height: 35px;
  border-radius: 6px;
  text-transform: none;
  border: 1px solid rgba(60, 60, 67, 0.18);
}

.page-main {
  padding-bottom: 30px;
}

.container-bottom {
  background: white;
}

.drawer-open {
  transform: translateX(-200px);
}

.bottom-bar {
  padding-top: 9px;
  padding-bottom: 7px;
}
</style>