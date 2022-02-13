<script setup lang="ts">
import { useExpenses } from 'composables/api/expenses'
import { useExpensesStore } from 'store/expenses'
import { useIconStore } from 'store/icons'
const { iconColorPrimary, iconWeight } = storeToRefs(useIconStore())
const { fetchExpenses } = useExpenses()
const expensesStore = useExpensesStore()
</script>

<template>
  <header class="flex items-center justify-between mb-5">
    <PageTitle class="items-cetner">
      Expenses
      <span class="flex items-center justify-center ml-1">
        <el-tag class="text-size-3xl">{{ expensesStore.expenseCount }}</el-tag>
      </span>
    </PageTitle>
    <div class="flex items-center">
      <router-link to="/expenses/new">
        <el-button type="primary">Add expense</el-button>
      </router-link>
      <div class="ml-4" @click="fetchExpenses">
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
