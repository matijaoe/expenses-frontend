import type { Expense, ExpenseCreate, ExpenseEdit } from 'models/expenses.model'
import { http } from 'services/http'

export const listExpenses = (): Promise<Expense[]> => http.get('/expenses')

export const getExpense = (id: string): Promise<Expense> =>
  http.get(`/expenses/${id}`)

export const createExpense = (expense: ExpenseCreate): Promise<Expense> =>
  http.post('/expenses', expense)

export const updateExpense = (
  id: string,
  expense: ExpenseEdit
): Promise<Expense> => http.patch(`/expenses/${id}`, expense)

export const deleteExpense = (id: string): Promise<Expense> =>
  http.delete(`/expenses/${id}`)
