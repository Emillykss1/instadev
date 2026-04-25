import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { useAuthStore } from 'src/stores/auth-store'

export const usePostsStore = defineStore('posts', {
    state: () => ({
        posts: [],
    }),

    actions: {
        async listAllPosts() {
            const authStore = useAuthStore()

            const { data } = await api.get('/posts', {
                headers: {
                    Authorization: `Bearer ${authStore.token}`,
                },
            })

            this.posts = data.data
            return {
                data: data.data,
            }
        },
    },
})
