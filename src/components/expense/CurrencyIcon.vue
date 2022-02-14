<script setup lang="ts">
import { Currency } from 'models/currency.model'
import {
  PhCurrencyBtc,
  PhCurrencyDollar,
  PhCurrencyDollarSimple,
  PhCurrencyEur,
  PhCurrencyGbp,
} from 'phosphor-vue'

import { useIconStore } from 'store/icons'

const props = defineProps<{
  currency?: Currency
  size?: number
}>()
const { iconColorPrimary, iconWeight } = storeToRefs(useIconStore())
const currencyIcon = computed(() => {
  switch (props.currency) {
    case Currency.USD:
      return PhCurrencyDollar
    case Currency.EUR:
      return PhCurrencyEur
    case Currency.GBP:
      return PhCurrencyGbp
    case Currency.BTC:
      return PhCurrencyBtc
    default:
      return PhCurrencyDollarSimple
  }
})
</script>

<template>
  <component
    :is="currencyIcon"
    :weight="iconWeight"
    :color="iconColorPrimary"
    :size="size"
  />
</template>

<style lang="scss" scoped></style>
