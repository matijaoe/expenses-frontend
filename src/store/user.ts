import type { User, UserUpdate, UserWithToken } from 'models/user.model'
import {
  deleteCurrentUser,
  getCurrentUser,
  updateCurrentUser,
} from 'services/api/user'
import LocalStorageService from 'services/local_storage'

interface State {
  user: User | null
  token: string | null
}

export const useUserStore = defineStore('user', {
  state: (): State => ({
    user: null,
    token: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'admin',
  },
  actions: {
    setUserData({ user, token }: UserWithToken) {
      this.setUser(user)
      this.setToken(token)
    },
    setUser(user: User) {
      this.user = user
    },
    setToken(token: string) {
      this.token = token
      LocalStorageService.instance.setAccessToken(token)
    },
    clearUserData() {
      this.$reset()
    },
    async getCurrentUser() {
      try {
        const user = await getCurrentUser()
        if (user) this.setUser(user)
        return true
      } catch (error) {
        this.clearUserData()
        return false
      }
    },
    async updateCurrentUser(userData: UserUpdate) {
      try {
        const user = await updateCurrentUser(userData)
        if (user) this.setUser(user)
        return user
      } catch (error) {
        console.error(error)
        return error
      }
    },
    async deleteCurrentUser() {
      try {
        const res = await deleteCurrentUser()
        if (res) this.clearUserData()
        return res
      } catch (error) {
        console.error(error)
        return error
      }
    },
  },
})
