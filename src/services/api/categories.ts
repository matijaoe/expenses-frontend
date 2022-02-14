import type {
  ExpenseCategory,
  ExpenseCategoryCreate,
} from 'models/category.model'
import { http } from 'services/http'

export const listCategories = (
  globalOnly = false
): Promise<ExpenseCategory[]> =>
  http.get('/categories', { params: { globalOnly } })

export const getCategory = (id: string): Promise<ExpenseCategory> =>
  http.get(`/categories/${id}`)

// TODO
export const createCategory = (category: any): Promise<ExpenseCategory> =>
  http.post('/categories', category)

export const deleteCategory = (id: string): Promise<ExpenseCategory> =>
  http.delete(`/categories/${id}`)

export const createGlobalCategory = (
  data: ExpenseCategoryCreate
): Promise<ExpenseCategory> => http.post('/categories/global', data)

export const deleteGlobalCategory = (id: string): Promise<ExpenseCategory> =>
  http.delete(`/categories/global/${id}`)
