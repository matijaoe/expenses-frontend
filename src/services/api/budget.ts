import type { Budget, BudgetReq } from 'models/budget.model'
import { http } from 'services/http'

export const getBudget = (): Promise<Budget> => http.get('/budget')

export const createBudget = (budgetData: BudgetReq): Promise<Budget> =>
  http.post('/budget', budgetData)

export const editBudget = (updates: BudgetReq): Promise<Budget> =>
  http.patch('/budget', updates)
