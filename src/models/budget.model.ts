export interface Budget {
  _id: string
  amount: number
  owner: string
  __v?: number
}

export interface BudgetReq {
  amount: number
}
