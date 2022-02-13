import { useExpenseUpdate } from 'composables/api/expenses'
import type { ElForm } from 'element-plus'
import type { ExpenseEdit } from 'models/expenses.model'

export const useEditExpenseForm = () => {
  const { updateExpense, isSuccess } = useExpenseUpdate()

  const rules = reactive({
    title: [
      {
        required: true,
        message: 'Please enter the title',
        trigger: 'blur',
      },
      {
        max: 40,
        message: 'Title too long',
        trigger: 'blur',
      },
    ],
    description: [
      {
        min: 2,
        max: 24,
        message: 'Description too long',
        trigger: 'blur',
      },
    ],
    currency: [
      {
        required: true,
        message: 'Please select your currency',
        trigger: 'blur',
      },
    ],
    amount: [
      {
        required: true,
        message: 'Please enter expense amount',
        trigger: 'blur',
      },
    ],
    category: [
      {
        required: true,
        message: 'Please select a category',
        trigger: 'blur',
      },
    ],
    date: [
      {
        required: true,
        message: 'Please select a date',
        trigger: 'blur',
      },
    ],
  })

  const onSubmit = async (
    id: string,
    expense: ExpenseEdit,
    formEl: InstanceType<typeof ElForm> | null,
    onSuccess: Function,
    onError: Function
  ) => {
    if (!formEl) return
    formEl.validate(async (valid: any) => {
      if (valid) {
        const editedExpense = await updateExpense(id, expense)
        console.log('editedExpense :>> ', editedExpense)
        if (isSuccess && editedExpense) {
          await onSuccess()
          return editedExpense
        }
      }
      onError()
      return null
    })
  }

  return {
    onSubmit,
    rules,
  }
}
