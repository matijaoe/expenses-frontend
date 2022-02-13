interface NotificationOptions {
  title: string
  message: string
}

export const useErrorNotification = () => {
  const showNotification = ({ title, message }: NotificationOptions) => {
    ElNotification({
      title,
      message,
      type: 'error',
      duration: 3000,
    })
  }

  const showRegisterError = (error: string | null) =>
    showNotification({
      title: 'Invalid registration',
      message: error || 'Please check your details and try again',
    })

  const showLoginError = (error: string | null) =>
    showNotification({
      title: 'Invalid login',
      message: error || 'Please check your details and try again',
    })

  const showMutateExpenseError = (error: string | null) =>
    showNotification({
      title: 'Invalid expense data',
      message: error || 'Please check expense details and try again',
    })

  return {
    showNotification,
    showLoginError,
    showRegisterError,
    showMutateExpenseError,
  }
}
