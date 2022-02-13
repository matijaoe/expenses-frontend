import { useExpenseDelete } from 'composables/api/expenses'
import { ElMessageBox } from 'element-plus'

export const useDeleteHandle = () => {
  const { deleteExpense } = useExpenseDelete()

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

  return {
    handleDelete,
    handleExpenseDelete,
  }
}
