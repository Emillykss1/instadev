import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { useAuthStore } from 'src/stores/auth-store'

export const useMyPostsStore = defineStore('my-posts', {
  state: () => ({
    posts: [],
  }),

  actions: {
    async AddLikeInPost(postId) {
      const authStore = useAuthStore()

      const { data } = await api.put(`/posts/add-like/${postId}`, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })


      return data
    },
  },
})