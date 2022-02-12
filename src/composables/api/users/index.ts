import type { User, UserUpdate } from 'models/user.model'
import * as api from 'services/api/user'

const useResultState = () => {
  const error = ref<string | null>(null)
  const isError = computed(() => get(error) !== null)
  const isSuccess = computed(() => get(error) === null)

  return {
    error,
    isError,
    isSuccess,
  }
}

export const useUser = () => {
  const user = ref<User>()
  const { error, isError, isSuccess } = useResultState()

  const fetchUser = async (id: string) => {
    try {
      const fetchedUser = await api.getUser(id)
      if (fetchedUser) {
        set(user, fetchedUser)
        return user
      }
    } catch (err) {
      set(error, err)
      return false
    }
  }

  return {
    user: readonly(user),
    fetchUser,
    error,
    isError,
    isSuccess,
  }
}

export const useUsers = () => {
  const users = ref<User[]>([])
  const { error, isError, isSuccess } = useResultState()

  const fetchUsers = async () => {
    try {
      const fetchedUsers = await api.getUsers()
      if (fetchedUsers) {
        set(users, fetchedUsers)
        return users
      }
    } catch (err) {
      set(error, err)
      return false
    }
  }

  return {
    users: readonly(users),
    fetchUsers,
    error,
    isError,
    isSuccess,
  }
}

export const useUserUpdate = () => {
  const user = ref<User>()
  const { error, isError, isSuccess } = useResultState()

  const updateUser = async (id: string, userData: UserUpdate) => {
    try {
      const updatedUser = await api.updateUser(id, userData)
      if (updatedUser) {
        set(user, updatedUser)
        return user
      }
    } catch (err) {
      set(error, err)
      return false
    }
  }

  return {
    user: readonly(user),
    updateUser,
    error,
    isError,
    isSuccess,
  }
}

export const useUserDelete = () => {
  const user = ref<User>()
  const { error, isError, isSuccess } = useResultState()

  const deleteUser = async (id: string) => {
    try {
      const deletedUser = await api.deleteUser(id)
      if (deletedUser) {
        set(user, deletedUser)
        return user
      }
    } catch (err) {
      set(error, err)
      return false
    }
  }

  return {
    user: readonly(user),
    deleteUser,
    error,
    isError,
    isSuccess,
  }
}
