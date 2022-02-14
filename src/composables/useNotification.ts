import type { UserRole } from 'models/user.model'

interface NotificationOptions {
  title: string
  message: string
  type: NotificationType
}

type NotificationType = 'error' | 'warning' | 'info' | 'success'

export const useNotification = () => {
  const showNotification = ({ title, message, type }: NotificationOptions) => {
    ElNotification({
      title,
      message,
      type,
      duration: 3000,
    })
  }

  const showRegisterError = (error: string | null) =>
    showNotification({
      title: 'Invalid registration',
      message: error || 'Please check your details and try again',
      type: 'error',
    })

  const showLoginError = (error: string | null) =>
    showNotification({
      title: 'Invalid login',
      message: error || 'Please check your details and try again',
      type: 'error',
    })

  const showMutateExpenseError = (error: string | null) =>
    showNotification({
      title: 'Invalid expense data',
      message: error || 'Please check expense details and try again',
      type: 'error',
    })

  const showDeletedUserNotication = () => {
    showNotification({
      title: 'User deleted',
      message: 'User and its expenses have been deleted successfully',
      type: 'success',
    })
  }

  const showUpdateUserPrivilegiesNotification = (newRole: UserRole) => {
    showNotification({
      title: 'Updated user privileges',
      message: `User has been given ${newRole.toUpperCase()} privileges`,
      type: 'success',
    })
  }

  return {
    showNotification,
    showLoginError,
    showRegisterError,
    showMutateExpenseError,
    showDeletedUserNotication,
    showUpdateUserPrivilegiesNotification,
  }
}
