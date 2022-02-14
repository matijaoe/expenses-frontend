import type {
  ExpenseCategory,
  ExpenseCategoryCreate,
} from 'models/category.model'
import {
  createGlobalCategory,
  deleteCategory,
  deleteGlobalCategory,
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
    async fetchCategories(globalOnly = false) {
      try {
        const categories = await listCategories(globalOnly)
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
    async deleteCategory(id: string, global = false) {
      try {
        const deletedCategory = global
          ? await deleteCategory(id)
          : await deleteGlobalCategory(id)
        if (deletedCategory != null) {
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
    async createGlobalCategory(data: ExpenseCategoryCreate) {
      try {
        const category = await createGlobalCategory(data)
        if (category) {
          this.categories.push(category)
        }
        return category
      } catch (error) {
        console.error(error)
        return false
      }
    },
    setCategories(categories: ExpenseCategory[]) {
      this.categories = categories
    },
  },
})
