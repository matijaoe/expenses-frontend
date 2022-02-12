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

export type ExpenseCreate = Omit<Expense, '_id' | 'createdAt' | 'updatedAt'>

export type ExpenseUpdate = Partial<Expense>

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  BTC = 'BTC',
}
