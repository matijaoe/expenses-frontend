<script setup lang="ts">
import { usePrice } from 'composables/helpers/useCurrency'
import { useExpensesStore } from 'store/expenses'
import { useIconStore } from 'store/icons'

const expensesStore = useExpensesStore()

const { iconColorPrimary, iconWeight } = storeToRefs(useIconStore())

const { formatAmount } = usePrice()

const budget = ref(Number((30_000).toFixed(2)))

const editBudget = ref(false)

const toggleBudgetEdit = () => {
  editBudget.value = !editBudget.value
}

const onEditBudget = () => {
  toggleBudgetEdit()
}
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

      <PhBank :size="32" :color="iconColorPrimary" :weight="iconWeight" />
    </div>
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <CurrencyIcon :size="60" />
        <div v-if="editBudget">
          <el-input-number v-model="budget" size="large"></el-input-number>
        </div>
        <span v-else class="font-sans text-6xl font-normal">
          {{ formatAmount(budget) }}
        </span>
      </div>
      <div class="mr-3">
        <el-button v-if="editBudget" type="success" @click.stop="onEditBudget">
          <div class="flex items-center gap-2" size="large">
            Confirm
            <PhCheckSquare :size="20" :weight="iconWeight" />
          </div>
        </el-button>
        <PhPencil
          v-else
          :size="32"
          :weight="iconWeight"
          class="cursor-pointer"
          @click.stop="toggleBudgetEdit"
        />
      </div>
    </div>
  </BaseCard>
</template>

<style lang="scss" scoped></style>
