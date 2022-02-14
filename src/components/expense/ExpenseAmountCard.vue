<script setup lang="ts">
import { usePrice } from 'composables/helpers/useCurrency'
import { useExpensesStore } from 'store/expenses'
import { useIconStore } from 'store/icons'

const expensesStore = useExpensesStore()

const { iconColorPrimary, iconWeight } = storeToRefs(useIconStore())

const { formatAmount } = usePrice()
</script>

<template>
  <BaseCard
    class="pt-16 pb-20 px-6 transition-all"
    bg="blue-100 opacity-20 hover:opacity-45"
    border="2 blue-200 hover:blue-300"
  >
    <div class="flex items-center justify-between mb-4 ml-3 mr-3">
      <h4 class="font-sans text-2xl uppercase text-blue-900 text-opacity-50">
        Total spent
      </h4>
      <PhCoins :size="32" :color="iconColorPrimary" :weight="iconWeight" />
    </div>
    <div class="flex items-center">
      <CurrencyIcon :size="60" />
      <span class="font-sans text-6xl font-normal">
        {{ formatAmount(expensesStore.expenseTotal) }}
      </span>
    </div>
  </BaseCard>
</template>

<style lang="scss" scoped></style>
