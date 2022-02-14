import { useExpenseDelete } from 'composables/api/expenses'
import { ElMessageBox } from 'element-plus'
import { useCategoryStore } from 'store/categories'

export const useDeleteHandle = () => {
  const { deleteExpense } = useExpenseDelete()
  const categoryStore = useCategoryStore()

  const handleDelete = async (message: string, onSuccess: () => any) =>
    await ElMessageBox.confirm(message)
      .then(async () => {
        await onSuccess()
        return true
      })
      .catch((error: any) => {
        console.error(error)
        return false
      })

  const handleExpenseDelete = async (id: string) =>
    await handleDelete('Are you sure you want to delete this expense?', () =>
      deleteExpense(id)
    )

  const handleGlobalCategoryDelete = async (id: string) =>
    await handleDelete(
      'Are you sure you want to delete this global cetegory?',
      () => categoryStore.deleteCategory(id)
    )

  return {
    handleDelete,
    handleExpenseDelete,
    handleGlobalCategoryDelete,
  }
}
