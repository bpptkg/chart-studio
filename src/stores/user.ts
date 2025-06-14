import axios from 'axios'
import { defineStore } from 'pinia'

interface User {
  username: string
  name?: string
}

interface State {
  /**
   * Authenticated user information or null if user is not logged in.
   */
  user: User | null
}

const client = axios.create({
  baseURL: import.meta.env.VITE_CENDANA_URL,
})

export const useUserStore = defineStore('user', {
  state: (): State => {
    return {
      user: null,
    }
  },
  getters: {
    initials: (state) => {
      return state.user && state.user.username ? state.user.username[0].toUpperCase() : 'U'
    },
  },
  actions: {
    async getUser() {
      const { data } = await client.get('/user')
      this.user = data
    },
    async signOut() {
      await client.post('/logout').finally(() => {
        window.location.replace(import.meta.env.VITE_CENDANA_URL)
      })
    },
  },
})
