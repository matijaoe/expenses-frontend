export interface ExpenseCategory {
  _id: string
  name: string
  owner: string
  __v?: number
}

export interface ExpenseCategoryCreate {
  name: string
}
