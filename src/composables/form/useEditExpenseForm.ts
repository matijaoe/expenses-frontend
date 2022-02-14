import { useExpenseUpdate } from 'composables/api/expenses'
import { useNotification } from 'composables/useNotification'
import type { ElForm } from 'element-plus'
import { Currency } from 'models/currency.model'
import type { Expense, ExpenseEdit } from 'models/expenses.model'

export const useEditExpenseForm = () => {
  const { updateExpense, isSuccess } = useExpenseUpdate()

  const expenseModel: ExpenseEdit = reactive({
    title: '',
    description: '',
    amount: null,
    currency: Currency.USD,
    date: '',
    category: '',
  })

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
        max: 255,
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

  const router = useRouter()
  const { showMutateExpenseError } = useNotification()

  const fillExpenseModel = (expense: Expense) => {
    expenseModel.title = expense.title
    expenseModel.description = expense.description
    expenseModel.amount = expense.amount
    expenseModel.currency = expense.currency
    expenseModel.date = expense.date
    expenseModel.category = expense.category ?? ''
  }

  const onSubmit = async (
    id: string,
    expense: ExpenseEdit,
    formEl: InstanceType<typeof ElForm> | null,
    routeRedirect: string
  ) => {
    if (!formEl) return
    formEl.validate(async (valid: any) => {
      if (valid) {
        const editedExpense = await updateExpense(id, expense)
        if (isSuccess && editedExpense) {
          ElNotification.closeAll()
          router.replace(routeRedirect)
          return
        }
      }
      showMutateExpenseError(null)
    })
  }

  return {
    expenseModel,
    onSubmit,
    rules,
    fillExpenseModel,
  }
}
