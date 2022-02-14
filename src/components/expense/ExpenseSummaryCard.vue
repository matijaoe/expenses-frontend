<script setup lang="ts">
import { useBudgetStore } from 'store/budget'
import { useExpensesStore } from 'store/expenses'
import { useIconStore } from 'store/icons'

const { iconWeight } = storeToRefs(useIconStore())
const budgetStore = useBudgetStore()
const expensesStore = useExpensesStore()

const difference = computed(
  () => (budgetStore?.budget ?? 0) - expensesStore?.expenseTotal ?? 0
)

const underBudget = computed(() => difference.value <= 0)
const overBudget = computed(() => difference.value > 0)

const styling = computed(() => {
  if (underBudget.value) {
    return 'bg-green-100 text-green-500 border-green-200 hover:border-green-300'
  } else if (overBudget.value) {
    return 'bg-red-100 text-red-500 border-red-200 hover:border-red-300'
  } else {
    return ''
  }
})
</script>

<template>
  <article
    class="expense rounded transition duration-100 ease-in-out col-span-2 flex items-center justify-center"
    :class="[styling]"
    bg="opacity-20 "
    border="2"
    p="4"
  >
    <div v-if="overBudget">
      <p class="text-4xl flex items-center gap-4">
        You went over budget
        <PhSmileySad :weight="iconWeight" class="text-6xl" />
      </p>
    </div>
    <div v-else-if="underBudget">
      <p class="text-4xl flex items-center gap-2">
        You stayed under budget
        <PhSmiley :weight="iconWeight" class="text-6xl" />
      </p>
    </div>
  </article>
</template>

<style lang="scss" scoped></style>
