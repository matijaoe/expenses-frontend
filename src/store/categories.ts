import type { ExpenseCategory } from 'models/category.model'
import {
  deleteCategory,
  getCategory,
  listCategories,
} from 'services/api/categories'

interface State {
  categories: ExpenseCategory[]
}

export const useCategoryStore = defineStore('categories', {
  state: (): State => ({
    categories: [],
  }),
  getters: {
    getCategoryById: (state) => (id: string) =>
      state.categories.find(({ _id }) => _id === id),
  },
  actions: {
    async fetchCategories() {
      try {
        const categories = await listCategories()
        if (categories) {
          this.setCategories(categories)
        }
        return categories
      } catch (error) {
        console.error('Error fetching categories')
        return error
      }
    },
    async fetchCategory(id: string) {
      try {
        const category = await getCategory(id)
        if (category) {
          this.categories.push(category)
        }
        return category
      } catch (error) {
        console.error('Error fetching category')
        return error
      }
    },
    async deleteCategory(id: string) {
      try {
        const deletedCategory = await deleteCategory(id)
        if (deletedCategory) {
          this.categories = this.categories.filter(
            ({ _id }) => _id !== deletedCategory._id
          )
        }
        return deletedCategory
      } catch (error) {
        console.error(error)
        return error
      }
    },
    setCategories(categories: ExpenseCategory[]) {
      this.categories = categories
    },
  },
})
