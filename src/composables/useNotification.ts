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

  return {
    showNotification,
    showLoginError,
    showRegisterError,
    showMutateExpenseError,
  }
}
