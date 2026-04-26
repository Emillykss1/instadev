import { defineStore, acceptHMRUpdate } from 'pinia'
import { api } from 'src/boot/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user') || 'null'),
  }),

  actions: {
      async makeRegister(body) {
      const { data } = await api.post('/user', body)
      return data
    },
    async makeLogin(body) {
      const { credential, password } = body
      const formattedCredential = {}

      if (credential.includes('@')){
        formattedCredential.email = credential
      } else {
        formattedCredential.user_name = credential
      }

      
        const { data } = await api.post('/auth', {
          ...formattedCredential,
          password,
        })
        
        this.token = data.token
        this.user = data.user

        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))

        return data
      },

      logout(){
        this.token = null
        this.user = null

        localStorage.removeItem('token')
        localStorage.removeItem('user')
      },
    },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}