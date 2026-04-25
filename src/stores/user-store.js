import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { useAuthStore } from 'src/stores/auth-store'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {},
  }),

  actions: {
    async getUserData() {
      const authStore = useAuthStore()

      const { data } = await api.get('/user', {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })

      this.user = data.user

      return {
        user: data.user,
      }
    },
  },
})