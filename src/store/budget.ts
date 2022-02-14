import * as api from 'services/api/budget'

interface State {
  budget: number | null
}

export const useBudgetStore = defineStore('budget', {
  state: (): State => ({
    budget: null,
  }),
  getters: {
    hasBudget: (state: State): boolean => state.budget !== null,
  },
  actions: {
    setBudget(budget: number | null) {
      this.budget = budget
    },
    async fetchBudget() {
      try {
        const budgetData = await api.getBudget()
        if (budgetData && budgetData.amount) {
          this.setBudget(budgetData.amount)
        }
      } catch (err) {
        console.log(err)
        this.setBudget(null)
      }
    },
    async createBudget(amount: number) {
      try {
        const budgetData = await api.createBudget({ amount })
        if (budgetData && budgetData.amount) {
          this.setBudget(budgetData.amount)
        }
      } catch (err) {
        console.log(err)
        this.setBudget(null)
      }
    },
    async editBudget(amount: number) {
      try {
        const budgetData = await api.editBudget({ amount })
        if (budgetData && budgetData.amount) {
          this.setBudget(budgetData.amount)
        }
      } catch (err) {
        console.log(err)
        this.setBudget(null)
      }
    },
  },
})
