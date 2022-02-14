<script setup lang="ts">
import { useExpenses } from 'composables/api/expenses'
import { useExpensesStore } from 'store/expenses'

const { fetchExpenses } = useExpenses()
const expensesStore = useExpensesStore()

fetchExpenses()
expensesStore.fetchExchangeRates()
</script>

<template>
  <div
    class="max-w-5xl mx-auto"
    p="4 b-10"
    text="true-gray-800"
    font="mono medium"
  >
    <NavBar />
    <main class="mt-8">
      <router-view />
    </main>
  </div>
</template>

<style lang="scss" scoped></style>
