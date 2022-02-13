import type {
  Expense,
  ExpenseCreate,
  ExpenseUpdate,
} from 'models/expenses.model'
import * as api from 'services/api/expenses'
import { useExpensesStore } from 'store/expenses'
import { useResultState } from '..'

const loading = ref(false)

export const useExpenses = () => {
  const store = useExpensesStore()
  const { error, isError, isSuccess } = useResultState()

  const fetchExpenses = async () => {
    try {
      set(loading, true)
      const fetchedExpenses = await api.listExpenses()
      set(loading, false)
      if (fetchedExpenses) {
        store.setExpenses(fetchedExpenses)
        return fetchedExpenses
      }
    } catch (err) {
      set(error, err)
      set(loading, false)
      return false
    }
  }

  return {
    fetchExpenses,
    error,
    isError,
    isSuccess,
    loading,
  }
}

export const useExpense = () => {
  const expense = ref<Expense>()
  const { error, isError, isSuccess } = useResultState()

  const fetchExpense = async (id: string) => {
    try {
      set(loading, true)

      const fetchedExpense = await api.getExpense(id)
      set(loading, false)
      if (fetchedExpense) {
        set(expense, fetchedExpense)
        return expense
      }
    } catch (err) {
      set(error, err)
      set(loading, false)
      return false
    }
  }

  return {
    expense: readonly(expense),
    fetchExpense,
    error,
    isError,
    isSuccess,
    loading,
  }
}

export const useExpenseCreate = () => {
  const store = useExpensesStore()
  const expense = ref<Expense>()
  const { error, isError, isSuccess } = useResultState()

  const createExpense = async (expenseData: ExpenseCreate) => {
    try {
      const newExpense = await api.createExpense(expenseData)
      if (newExpense) {
        set(expense, newExpense)
        store.addExpense(newExpense)
        return expense
      }
    } catch (err) {
      set(error, err)
      return false
    }
  }

  return {
    expense,
    createExpense,
    error,
    isError,
    isSuccess,
  }
}

export const useExpenseUpdate = () => {
  const store = useExpensesStore()
  const expense = ref<Expense>()
  const { error, isError, isSuccess } = useResultState()

  const updateExpense = async (id: string, expenseData: ExpenseUpdate) => {
    try {
      const updatedExpense = await api.updateExpense(id, expenseData)
      if (updatedExpense) {
        set(expense, updatedExpense)
        store.updateExpense(updatedExpense)
        return expense
      }
    } catch (err) {
      set(error, err)
      return false
    }
  }

  return {
    expense: readonly(expense),
    updateExpense,
    error,
    isError,
    isSuccess,
  }
}

export const useExpenseDelete = () => {
  const store = useExpensesStore()
  const expense = ref<Expense>()
  const { error, isError, isSuccess } = useResultState()

  const deleteExpense = async (id: string) => {
    try {
      const deletedExpense = await api.deleteExpense(id)
      if (deletedExpense) {
        set(expense, deletedExpense)
        store.deleteExpense(deletedExpense)
        return expense
      }
    } catch (err) {
      set(error, err)
      return false
    }
  }

  return {
    expense: readonly(expense),
    deleteExpense,
    error,
    isError,
    isSuccess,
  }
}
