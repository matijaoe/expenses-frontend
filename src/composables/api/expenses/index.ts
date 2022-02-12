import type {
  Expense,
  ExpenseCreate,
  ExpenseUpdate,
} from 'models/expenses.model'
import * as api from 'services/api/expenses'
import { useResultState } from '..'

export const useExpenses = () => {
  const expenses = ref<Expense[]>()
  const { error, isError, isSuccess } = useResultState()

  const fetchExpenses = async () => {
    try {
      const fetchedExpenses = await api.listExpenses()
      if (fetchedExpenses) {
        set(expenses, fetchedExpenses)
        return expenses
      }
    } catch (err) {
      set(error, err)
      return false
    }
  }

  return {
    expenses: readonly(expenses),
    fetchExpenses,
    error,
    isError,
    isSuccess,
  }
}

export const useExpense = () => {
  const expense = ref<Expense>()
  const { error, isError, isSuccess } = useResultState()

  const fetchExpense = async (id: string) => {
    try {
      const fetchedExpense = await api.getExpense(id)
      if (fetchedExpense) {
        set(expense, fetchedExpense)
        return expense
      }
    } catch (err) {
      set(error, err)
      return false
    }
  }

  return {
    expense: readonly(expense),
    fetchExpense,
    error,
    isError,
    isSuccess,
  }
}

export const useExpenseCreate = () => {
  const expense = ref<Expense>()
  const { error, isError, isSuccess } = useResultState()

  const createExpense = async (expenseData: ExpenseCreate) => {
    try {
      const newExpense = await api.createExpense(expenseData)
      if (newExpense) {
        set(expense, newExpense)
        return expense
      }
    } catch (err) {
      set(error, err)
      return false
    }
  }

  return {
    expense: readonly(expense),
    createExpense,
    error,
    isError,
    isSuccess,
  }
}

export const useExpenseUpdate = () => {
  const expense = ref<Expense>()
  const { error, isError, isSuccess } = useResultState()

  const updateExpense = async (id: string, expenseData: ExpenseUpdate) => {
    try {
      const updatedExpense = await api.updateExpense(id, expenseData)
      if (updatedExpense) {
        set(expense, updatedExpense)
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
  const expense = ref<Expense>()
  const { error, isError, isSuccess } = useResultState()

  const deleteExpense = async (id: string) => {
    try {
      const deletedExpense = await api.deleteExpense(id)
      if (deletedExpense) {
        set(expense, deletedExpense)
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
