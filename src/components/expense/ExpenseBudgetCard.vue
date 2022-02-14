<script setup lang="ts">
import { usePrice } from 'composables/helpers/useCurrency'
import { useBudgetStore } from 'store/budget'
import { useIconStore } from 'store/icons'

const { iconColorPrimary, iconWeight } = storeToRefs(useIconStore())
const budgetStore = useBudgetStore()
const { formatAmount } = usePrice()

const editBudget = ref(false)
const budgetInput = ref<number>(budgetStore.budget ?? 0)

const toggleBudgetEdit = () => {
  editBudget.value = !editBudget.value
}

const onConfirm = async () => {
  toggleBudgetEdit()
  if (budgetStore.budget == null) {
    await budgetStore.createBudget(budgetInput.value)
    budgetInput.value = budgetStore.budget ?? 0
  } else {
    await budgetStore.editBudget(budgetInput.value)
    budgetInput.value = budgetStore.budget ?? 0
  }
}

budgetStore.fetchBudget()
</script>

<template>
  <BaseCard
    class="pt-16 pb-20 px-6 transition-all"
    bg="blue-100 opacity-20 hover:opacity-45"
    border="2 blue-200 hover:blue-300"
  >
    <div class="flex items-center justify-between mb-4 ml-3 mr-3">
      <h4 class="font-sans text-2xl uppercase text-blue-900 text-opacity-50">
        Budget
      </h4>

      <PhBank :size="32" :color="iconColorPrimary" :weight="iconWeight" />
    </div>
    <div class="flex items-center justify-between">
      <div
        v-if="budgetStore.hasBudget && budgetStore.budget"
        class="flex items-center"
      >
        <CurrencyIcon :size="60" />
        <div v-if="editBudget">
          <el-input-number v-model="budgetInput" size="large" :min="1" />
        </div>
        <span v-else class="font-sans text-6xl font-normal">
          {{ formatAmount(budgetStore.budget) }}
        </span>
      </div>
      <!-- if no budget -->
      <div v-else class="flex items-center">
        <div v-if="editBudget" class="flex items-center">
          <CurrencyIcon :size="60" />
          <el-input-number v-model="budgetInput" size="large" :min="1" />
        </div>
        <span v-else class="font-sans text-4xl font-normal">
          Budget not set
        </span>
      </div>
      <div class="mr-3">
        <el-button v-if="editBudget" type="success" @click.stop="onConfirm">
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
