import type { ExpenseCategory } from 'models/category.model'
import { http } from 'services/http'

export const listCategories = (): Promise<ExpenseCategory[]> =>
  http.get('/categories')

export const getCategory = (id: string): Promise<ExpenseCategory> =>
  http.get(`/categories/${id}`)

// TODO
export const createCategory = (category: any): Promise<ExpenseCategory> =>
  http.post('/categories', category)

export const updateCategory = (
  id: string,
  category: Partial<ExpenseCategory>
): Promise<ExpenseCategory> => http.patch(`/categories/${id}`, category)

export const deleteCategory = (id: string): Promise<ExpenseCategory> =>
  http.delete(`/categories/${id}`)
