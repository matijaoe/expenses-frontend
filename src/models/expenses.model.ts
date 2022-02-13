export interface Expense {
  _id: string
  title: string
  description: string
  amount: number
  currency: Currency
  date: string
  owner: string
  createdAt: string
  updatedAt: string
  __v?: number
}

export type ExpenseAction = 'add' | 'edit'

export interface ExpenseCreate {
  title: string
  description: string
  amount: number | null
  currency: Currency
  date: string
  owner: string
}
export type ExpenseUpdate = Partial<Expense>

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  BTC = 'BTC',
}
