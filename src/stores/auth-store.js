import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'

export const useAuthStore = defineStore('auth', {
  actions: {
    async makeLogin(body) {
      const { credential, password } = body
      const formattedCredential = {}

      if (credential.includes('@')){
        formattedCredential.email = credential
      } else {
        formattedCredential.user_name = credential
      }

      try {
        const { data } = await api.post('/auth', {
          ...formattedCredential,
          password,
        })

        return data
      } catch (error) {
        console.log(error)
        throw error
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}