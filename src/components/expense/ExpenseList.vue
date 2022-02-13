<script setup lang="ts">
import { useExpenses } from 'composables/api/expenses'
import { useExpensesStore } from 'store/expenses'

import { useIconStore } from 'store/icons'

const { fetchExpenses, isSuccess, loading, isError } = useExpenses()
const { expenses, hasExpenses } = storeToRefs(useExpensesStore())
const { iconWeight } = storeToRefs(useIconStore())

fetchExpenses()
</script>

<template>
  <section v-if="hasExpenses" class="expense-list gap-4 mx-auto">
    <ExpenseItemCard
      v-for="expense in expenses"
      :key="expense._id"
      :expense="expense"
      :loading="loading"
    />
  </section>
  <div v-else-if="!expenses && !loading">
    <div
      class="text-2xl font-light text-blue-400 flex flex-col items-center justify-center gap-2 py-4"
    >
      <img
        src="https://i.gifer.com/yH.gif"
        alt="John Travolta GIF"
        class="h-60"
      />
      <div class="flex gap-2 items-center mt-6">
        <PhSignpost class="text-current" :size="32" :weight="iconWeight" />
        No expenses found
      </div>
    </div>
  </div>
  <div v-else-if="isError">
    <p
      class="text-2xl font-light text-red-500 flex items-center justify-center gap-2 py-4"
    >
      <PhWarning class="text-current" :size="32" :weight="iconWeight" />
      Error fetching expenses
    </p>
  </div>
</template>

<style lang="scss" scoped>
.expense-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
}
</style>
