<script lang="ts" setup>
import { useBudgetStore } from 'store/budget'
import { useUserStore } from 'store/user'
import { titleCase } from 'title-case'

const userStore = useUserStore()
const budgetStore = useBudgetStore()
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <h2 class="font-sans mt-4 text-5xl py-9">
      Welcome back
      <span v-if="userStore.user">
        {{ titleCase(userStore.user?.name as string) }}!
      </span>
    </h2>
    <div class="grid grid-cols-2 grid-rows-2 gap-4 w-full">
      <ExpenseAmountCard />
      <ExpenseBudgetCard />
      <ExpenseSummaryCard v-if="budgetStore.hasBudget" />
    </div>
  </div>
</template>
