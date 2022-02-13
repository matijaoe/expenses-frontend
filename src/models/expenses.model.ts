export interface Expense {
  _id: string
  title: string
  description: string
  amount: number
  currency: Currency
  date: string
  owner: string
  category: string
  createdAt: string
  updatedAt: string
  __v?: number
}

export enum ExpenseAction {
  CREATE = 'create',
  EDIT = 'edit',
}

export interface ExpenseCreate {
  title: string
  description: string
  amount: number | null
  currency: Currency
  date: string
  owner: string
  category: string
}

export type ExpenseEdit = Partial<ExpenseCreate>

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  BTC = 'BTC',
}
