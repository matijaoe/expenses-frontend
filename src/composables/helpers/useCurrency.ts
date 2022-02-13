export const usePrice = () => {
  const formatAmount = (value: number) =>
    Intl.NumberFormat('en-US').format(value)

  return {
    formatAmount,
  }
}
