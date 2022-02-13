import { useExpenseCreate } from 'composables/api/expenses'
import type { ElForm } from 'element-plus'
import type { ExpenseCreate } from 'models/expenses.model'
import { Currency } from 'models/expenses.model'
import { useUserStore } from 'store/user'

export const useCreateExpenseForm = () => {
  const { user } = storeToRefs(useUserStore())
  const { createExpense, isSuccess, expense: newExpense } = useExpenseCreate()

  const expense: ExpenseCreate = reactive({
    title: '',
    description: '',
    amount: null,
    currency: Currency.USD,
    date: '',
    owner: user.value!._id,
    // category: '',
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
    date: [
      {
        required: true,
        message: 'Please select a date',
        trigger: 'blur',
      },
    ],
  })

  const disabledDate = (time: Date) => {
    return time.getTime() > Date.now()
  }

  const currencies = computed(() =>
    Object.entries(Currency).map(([label, value]) => ({ label, value }))
  )

  const onSubmit2 = async () => {
    try {
      const newExpense = await createExpense(expense)
      console.log('newExpense :>> ', newExpense)
      if (isSuccess && newExpense) {
        return newExpense.value
      }
      return null
    } catch (err) {
      console.log(err)
      return null
    }
  }

  const onSubmit = async (
    formEl: InstanceType<typeof ElForm> | null,
    onSuccess: Function,
    onError: Function
  ) => {
    if (!formEl) return
    formEl.validate(async (valid: any) => {
      if (valid) {
        const newExpense = await createExpense(expense)
        if (isSuccess && newExpense) {
          await onSuccess()
          return newExpense.value
        }
        return null
      }
      onError()
      return null
    })
  }

  return {
    expense,
    disabledDate,
    currencies,
    onSubmit,
    rules,
  }
}
