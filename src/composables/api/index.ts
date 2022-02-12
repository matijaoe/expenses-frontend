export const useResultState = () => {
  const error = ref<string | null>(null)
  const isError = computed(() => get(error) !== null)
  const isSuccess = computed(() => get(error) === null)

  return {
    error,
    isError,
    isSuccess,
  }
}
