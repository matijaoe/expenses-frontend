import type { User, UserUpdate } from 'models/user.model'
import * as api from 'services/api/user'
import { useResultState } from '..'

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
    user,
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
    users,
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
    user,
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
    user,
    deleteUser,
    error,
    isError,
    isSuccess,
  }
}
