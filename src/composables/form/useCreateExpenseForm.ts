import { useExpenseCreate } from 'composables/api/expenses'
import { useNotification } from 'composables/useNotification'
import type { ElForm } from 'element-plus'
import { Currency } from 'models/currency.model'
import type { ExpenseCreate } from 'models/expenses.model'
import { useUserStore } from 'store/user'

export const useCreateExpenseForm = () => {
  const { user } = storeToRefs(useUserStore())
  const { createExpense, isSuccess } = useExpenseCreate()
  const router = useRouter()

  const expenseModel: ExpenseCreate = reactive({
    title: '',
    description: '',
    amount: null,
    currency: Currency.USD,
    date: '',
    owner: user.value!._id,
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
        min: 2,
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

  const { showMutateExpenseError } = useNotification()

  const onSubmit = async (
    expense: ExpenseCreate,
    formEl: InstanceType<typeof ElForm> | null,
    routeRedirect: string
  ) => {
    if (!formEl) return
    formEl.validate(async (valid: any) => {
      if (valid) {
        const newExpense = await createExpense(expense)
        if (isSuccess && newExpense) {
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
  }
}
