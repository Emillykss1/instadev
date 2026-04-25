<template>
  <q-page class="flex column">
    <div class="full-width row items-center justify-between bg-grey-2 q-px-sm">
      <q-btn flat color="dark" label="Cancel" @click="goTo('/my-area')" />
      <strong>Edit Profile</strong>
      <q-btn flat color="primary" label="Done" @click="saveProfile" />
    </div>

    <div class="full-width column items-center justify-center q-py-md">
      <q-avatar size="96px">
        <img :src="user.avatar || 'https://www.shutterstock.com/image-vector/blank-avatar-photo-placeholder-flat-600nw-1151124605.jpg'" />
      </q-avatar>
      <q-btn flat color="primary" label="Change Profile Photo" />
    </div>

    <div class="full-width column q-px-sm">
      <div class="container-input row justify-center items-center">
        <span>Name</span>
        <q-input v-model="name" placeholder="name" />
      </div>

      <div class="container-input row justify-center items-center">
        <span>Username</span>
        <q-input v-model="username" placeholder="username" />
      </div>

      <div class="container-input row justify-center items-center">
        <span>Website</span>
        <q-input v-model="website" placeholder="website" />
      </div>

      <div class="container-input row justify-center items-center">
        <span>Bio</span>
        <q-input v-model="bio" autogrow placeholder="bio" />
      </div>
    </div>

    <div class="full-width column items-start q-px-sm">
      <q-separator class="full-width q-my-sm" />
      <q-btn flat color="primary" label="Switch to Professional Account" />
      <strong class="title-private q-ml-md q-my-md">Private Information</strong>

      <div class="full-width">
        <div class="container-input row justify-center items-center">
          <span>Email</span>
          <q-input v-model="email" placeholder="email" />
        </div>

        <div class="container-input row justify-center items-center">
          <span>Phone</span>
          <q-input v-model="phone" placeholder="cellphone" />
        </div>

        <div class="container-input row justify-center items-center">
          <span>Gender</span>
          <q-input v-model="gender" placeholder="gender" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useUpdateProfileStore } from 'src/stores/update-profile'
import { useUserStore } from 'src/stores/user-store'

export default {
  name: 'ProfilePage',

  data() {
    return {
      name: '',
      username: '',
      website: '',
      bio: '',
      email: '',
      phone: '',
      gender: '',
      user: {},
    }
  },

  async mounted() {
    await this.loadProfileData()
  },

  methods: {
    goTo(route) {
      this.$router.push({ path: route })
    },

    async loadProfileData() {
      const userStore = useUserStore()

      if (!userStore.user || !userStore.user.user_name) {
        await userStore.getUserData()
      }

      this.user = userStore.user || {}

      this.name = this.user.name || ''
      this.username = this.user.user_name || ''
      this.website = this.user.website || ''
      this.bio = this.user.bio || ''
      this.email = this.user.email || ''
      this.phone = this.user.phone || ''
      this.gender = this.user.gender || ''
    },

    async saveProfile() {
      try {
        const updateProfileStore = useUpdateProfileStore()

        const user = await updateProfileStore.updateUserProfile({
          name: this.name,
          website: this.website,
          bio: this.bio,
          phone: this.phone,
          gender: this.gender,
        })

        this.user = user

        this.$q.notify({
          type: 'positive',
          message: 'Perfil atualizado com sucesso',
          position: 'top',
        })

        this.$router.push('/my-area')
      } catch (error) {
        console.error(error)
        this.$q.notify({
          type: 'negative',
          message: 'Falha ao atualizar perfil',
          position: 'top',
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.container-input {
  font-size: 15px;

  span {
    width: 22%;
  }

  .q-textarea,
  .q-input {
    width: 70%;
  }
}

.title-private {
  font-size: 16px;
}

.q-btn {
  text-transform: none;
  font-size: 16px;
}
</style>