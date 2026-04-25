import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { useAuthStore } from 'src/stores/auth-store'

export const useMyPostsStore = defineStore('my-posts', {
  state: () => ({
    posts: [],
  }),

  actions: {
    async listMyPosts() {
      const authStore = useAuthStore()

      const response = await api.get('/posts/my-posts', {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })

      this.posts = response.data.data || []

      return this.posts
    },
  },
})