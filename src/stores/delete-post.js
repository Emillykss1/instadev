import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { useAuthStore } from 'src/stores/auth-store'

export const useDeletePostStore = defineStore('delete-post', {
  actions: {
    async deletePost(postId) {
      const authStore = useAuthStore()
      const token = authStore.token || localStorage.getItem('token')


      const { data } = await api.delete(`/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return data
    },
  },
})