import { useCategoryStore } from 'store/categories'
import { useExpensesStore } from 'store/expenses'
import { computed } from 'vue'

const filter: {
  categoryFilter: string
  searchQuery: string
} = reactive({
  categoryFilter: '',
  searchQuery: '',
})
const { categoryFilter, searchQuery } = toRefs(filter)

export const useExpenseFilters = () => {
  const store = useExpensesStore()
  const categoryStore = useCategoryStore()

  const filteredExpenses = computed(() =>
    store.expenses.filter((ex) => {
      const queryMatch = [
        ex.title,
        ex.description,
        categoryStore.getCategoryById(ex.category)?.name ?? 'Unknown',
        ex.amount,
      ].some((field) =>
        field
          .toString()
          .toLowerCase()
          .includes(filter.searchQuery.toLowerCase())
      )

      const categoryMatch = filter.categoryFilter
        ? ex.category === filter.categoryFilter
        : true

      return queryMatch && categoryMatch
    })
  )

  const hasFilteredExpenses = computed(() => filteredExpenses.value?.length > 0)

  return {
    categoryFilter,
    searchQuery,
    filteredExpenses,
    hasFilteredExpenses,
  }
}
