import type { UserLogin, UserRegister } from 'models/auth.model'
import { login, logout, register } from 'services/api/auth'
import { useUserStore } from 'store/user'

const userStore = useUserStore()

export const useRegister = () => {
  const mutation = useMutation(register)

  return {
    ...mutation,
    register: (data: UserRegister) => mutation.mutate(data),
  }
}

export const useLogin = () => {
  // TODO
  const mutation = useMutation(login, {
    onSuccess: (data) => {
      // TODO: check if needed
      if ('user' in data && 'token' in data)
        userStore.setUserData(data)
    },

  })

  return {
    ...mutation,
    login: (data: UserLogin) => mutation.mutate(data),
  }
}

// TODO: needs headers
export const useLogout = () => {
  const mutation = useMutation(logout, {
    onSuccess: userStore.clearUserData,
  })

  return {
    ...mutation,
    logout: () => mutation.mutate(),
  }
}
