<script setup lang="ts">
import { useExpenses } from 'composables/api/expenses'

// defineProps<>()

const { expenses, fetchExpenses, isSuccess, isError, error } = useExpenses()

fetchExpenses()
</script>

<template>
  <section v-if="isSuccess" class="expense-list gap-4 mx-auto">
    <ExpenseItem
      v-for="expense in expenses"
      :key="expense._id"
      :expense="expense"
    />
  </section>
  <div v-else-if="isError">
    {{ error }}
  </div>
</template>

<style lang="scss" scoped>
.expense-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
}
</style>
