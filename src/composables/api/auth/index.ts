import { get, set } from '@vueuse/core'
import type { UserLogin, UserRegister } from 'models/auth.model'
import * as auth from 'services/api/auth'
import LocalStorageService from 'services/local_storage'
import { useExpensesStore } from 'store/expenses'
import { useUserStore } from 'store/user'

export const useAuth = () => {
  const router = useRouter()
  const userStore = useUserStore()
  const expensesStore = useExpensesStore()
  const { user, token } = storeToRefs(userStore)

  const error = ref<string | null>(null)
  const isError = computed(() => get(error) !== null)
  const isSuccess = computed(() => get(error) === null)

  const register = async (userData: UserRegister) => {
    set(error, null)

    try {
      const userWithToken = await auth.register(userData)
      userStore.setUserData(userWithToken)
      return userWithToken
    } catch (err: any) {
      console.error(err)
      set(error, err)
      return false
    }
  }

  const login = async (credentials: UserLogin) => {
    set(error, null)

    try {
      const userWithToken = await auth.login(credentials)
      userStore.setUserData(userWithToken)
      return userWithToken
    } catch (err: any) {
      console.error(err)
      set(error, err)
      return false
    }
  }

  const logout = async () => {
    set(error, null)

    try {
      const res = await auth.logout()
      router.replace('/login')
      userStore.clearUserData()
      expensesStore.$reset()
      return res
    } catch (err) {
      console.log(err)
      set(error, err)
      return false
    }
  }

  return {
    user: readonly(user),
    token: readonly(token),
    register,
    login,
    logout,
    error,
    isError,
    isSuccess,
  }
}

export const useStoredLogin = () => {
  const userStore = useUserStore()

  const checkSavedLogin = async () => {
    const token = LocalStorageService.instance.getAccessToken()
    if (token) {
      const success = await userStore.getCurrentUser()
      if (success) {
        userStore.setToken(token)
      } else {
        userStore.clearUserData()
        LocalStorageService.instance.removeAccessToken()
      }
    }
  }

  return {
    checkSavedLogin,
  }
}
