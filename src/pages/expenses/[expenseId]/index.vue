<script setup lang="ts">
import { useExpense } from 'composables/api/expenses'
import { useIconStore } from 'store/icons'

const { iconWeight } = storeToRefs(useIconStore())

const { expense, fetchExpense, loading } = useExpense()
const route = useRoute()

const expenseId = computed(() => route.params.expenseId as string)

watchEffect(() => {
  if (expenseId.value) {
    fetchExpense(expenseId.value)
  }
})
</script>

<template>
  <div>
    <div class="mb-5">
      <router-link to="/expenses">
        <el-link target="_blank">
          <div class="flex items-center gap-1">
            <ph-caret-left :weight="iconWeight" />
            Back to expenses
          </div>
        </el-link>
      </router-link>
    </div>
    <ExpenseData v-if="expense" :expense="expense" />
    <div v-else-if="!expense && !loading">
      <p
        class="text-2xl font-light text-red-500 flex items-center justify-center gap-2 py-4"
      >
        <PhWarning class="text-current" :size="32" :weight="iconWeight" />
        Expense not found
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
