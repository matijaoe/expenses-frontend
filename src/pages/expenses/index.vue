<script setup lang="ts">
import { useExpenses } from 'composables/api/expenses'
import { useCategoryStore } from 'store/categories'
import { useExpensesStore } from 'store/expenses'
import { useIconStore } from 'store/icons'

const { iconColorPrimary, iconWeight } = storeToRefs(useIconStore())
const { fetchExpenses } = useExpenses()
const categoryStore = useCategoryStore()
const expensesStore = useExpensesStore()

const onRefresh = () => {
  fetchExpenses()
  categoryStore.fetchCategories()
}

categoryStore.fetchCategories()
</script>

<template>
  <header class="flex items-center justify-between mb-5">
    <PageTitle class="items-cetner">
      Expenses
      <span
        v-if="expensesStore.hasExpenses"
        class="flex items-center justify-center ml-1"
      >
        <el-tag class="text-size-3xl">{{ expensesStore.expenseCount }}</el-tag>
      </span>
    </PageTitle>
    <div class="flex items-center">
      <router-link to="/expenses/new">
        <el-button type="primary">
          <div class="flex items-center gap-2">
            Add expense
            <PhPlusCircle :weight="iconWeight" :size="20" />
          </div>
        </el-button>
      </router-link>
      <div class="ml-4" @click="onRefresh">
        <PhArrowClockwise
          class="hover:animate-spin cursor-pointer text-sm"
          :color="iconColorPrimary"
          :weight="iconWeight"
          :size="40"
        />
      </div>
    </div>
  </header>
  <ExpenseList />
</template>

<style lang="scss" scoped></style>
