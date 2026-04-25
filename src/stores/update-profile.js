import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { useAuthStore } from 'src/stores/auth-store'
import { useUserStore } from 'src/stores/user-store'

export const useUpdateProfileStore = defineStore('update-profile', {
  actions: {
    async updateUserProfile(body) {
      const authStore = useAuthStore()
      const userStore = useUserStore()

      const { data } = await api.put('/user', body, {
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
      })

      userStore.user = data.user || {}
      return data.user || {}
    },
  },
})