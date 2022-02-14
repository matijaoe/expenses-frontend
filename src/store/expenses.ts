import { Currency } from 'models/currency.model'
import type { Expense } from 'models/expenses.model'
import { defineStore } from 'pinia'
import { getExchangeRates } from 'services/api/currency'

interface State {
  expenses: Expense[]
  defaultCurrency: Currency
  rates: Record<Currency, number>
}

export const useExpensesStore = defineStore({
  id: 'expenses',
  state: (): State => ({
    expenses: [],
    defaultCurrency: Currency.USD,
    rates: {
      [Currency.USD]: 1,
      [Currency.EUR]: 1,
      [Currency.GBP]: 1,
      [Currency.BTC]: 1,
    },
  }),
  getters: {
    hasExpenses: (state) => state?.expenses.length > 0 ?? false,
    expenseCount: (state) => state?.expenses.length ?? 0,
    expenseTotal: (state) => {
      const totalPerCurrency = state.expenses.reduce(
        (acc, expense) => ({
          ...acc,
          [expense.currency]: (acc[expense.currency] ?? 0) + expense.amount,
        }),
        {
          [Currency.USD]: 0,
          [Currency.EUR]: 0,
          [Currency.GBP]: 0,
          [Currency.BTC]: 0,
        }
      ) as Record<Currency, number>

      const total = Object.entries(totalPerCurrency).reduce(
        (acc, [currency, total]) => {
          const usdRate = 1 / state.rates[currency as Currency]
          acc += usdRate * total
          return acc
        },
        0
      )

      return Number(total.toFixed(2))
    },
  },
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
    clearExpenses() {
      this.setExpenses([])
    },
    async fetchExchangeRates() {
      const ratesVsUSD = await getExchangeRates(this.defaultCurrency)
      this.rates.GBP = ratesVsUSD.GBP
      this.rates.EUR = ratesVsUSD.EUR
      // Special case
      this.rates.BTC = ratesVsUSD.BTC / 1000
      this.rates[this.defaultCurrency] = 1
    },
  },
})
