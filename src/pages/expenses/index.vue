<script setup lang="ts">
import { useExpenses } from 'composables/api/expenses'
import { PhArrowClockwise } from 'phosphor-vue'
import { useIconStore } from 'store/icons'
const { fetchExpenses } = useExpenses()
const { iconColorPrimary, iconWeight } = storeToRefs(useIconStore())

const onRefresh = () => {
  console.log('onRefresh')
  fetchExpenses()
}
</script>

<template>
  Expenses
  <div @click="onRefresh">
    <PhArrowClockwise :color="iconColorPrimary" :weight="iconWeight" />
  </div>
  <ExpenseList />
</template>

<style lang="scss" scoped></style>
