import type { User, UserWithToken } from 'models/user.model'

interface State {
  user: User | null
  token: string | null
}

export const useUserStore = defineStore({
  id: 'userStore',
  state: (): State => ({
    user: null,
    token: null,
  }),
  getters: {

  },
  actions: {
    setUserData({ user, token }: UserWithToken) {
      this.user = user
      this.token = token
    },
    clearUserData() {
      this.$reset()
    },
  },
})
