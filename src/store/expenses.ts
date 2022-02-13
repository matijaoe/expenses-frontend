import type { Expense } from 'models/expenses.model'
import { defineStore } from 'pinia'

interface State {
  expenses: Expense[]
}

export const useExpensesStore = defineStore({
  id: 'expenses',
  state: (): State => ({
    expenses: [],
  }),
  getters: {},
  actions: {
    setExpenses(expenses: Expense[]) {
      this.expenses = expenses
    },
    addExpense(expense: Expense) {
      this.expenses.push(expense)
    },
    updateExpense(expense: Expense) {
      const index = this.expenses.findIndex(({ _id }) => _id === expense._id)
      if (index !== -1) {
        this.expenses[index] = expense
      }
    },
    deleteExpense(expense: Expense) {
      this.expenses = this.expenses.filter(({ _id }) => _id !== expense._id)
    },
  },
})
