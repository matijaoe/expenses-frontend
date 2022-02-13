<script setup lang="ts">
import { useExpenses } from 'composables/api/expenses'
import { PhArrowClockwise } from 'phosphor-vue'
import { useIconStore } from 'store/icons'
const { iconColorPrimary, iconWeight } = storeToRefs(useIconStore())
const { fetchExpenses } = useExpenses()
</script>

<template>
  <header class="flex items-center justify-between mb-4">
    <PageTitle>Expenses</PageTitle>
    <div class="p-4" @click="fetchExpenses">
      <PhArrowClockwise
        class="hover:animate-spin cursor-pointer"
        :color="iconColorPrimary"
        :weight="iconWeight"
        :size="30"
      />
    </div>
  </header>
  <ExpenseList />
</template>

<style lang="scss" scoped></style>
