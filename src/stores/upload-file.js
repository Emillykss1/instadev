import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { useAuthStore } from 'src/stores/auth-store'

export const useUploadFileStore = defineStore('upload-file', {
  actions: {
    async uploadFile(formData) {
      const authStore = useAuthStore()
      const token = authStore.token || localStorage.getItem('token')

      const { data } = await api.post('/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })

      return data
    },
  },
})