<script setup lang="ts">
import { ExpenseAction } from 'models/expenses.model'
import { useExpense } from 'composables/api/expenses'
import { useErrorNotification } from 'composables/useErrorNotification'
import type { FormInstance } from 'models/element.model'

const route = useRoute()
const router _= useRouter()
const expenseId = computed(() => route.params.expenseId as string)

const { fetchExpense, expense } = useExpense()
const { showMutateExpenseError } = useErrorNotification()
watchEffect(() => {
  if (expenseId.value) {
    fetchExpense(expenseId.value)
  }
})

const submitForm = (ruleFormRef: FormInstance | null) =>
  onSubmit(
    get(ruleFormRef),
    () => {
      ElNotification.closeAll()
      router.replace('/expenses')
    },
    () => showMutateExpenseError(null)
  )
</script>

<template>
  <div>
    <PageTitle>Edit expense</PageTitle>
    <ExpenseForm
      v-if="expense"
      :action="ExpenseAction.EDIT"
      class="mt-8"
      :current-expense="expense"
      submit-msg="Add expense"
      @submit="submitForm"
    />
  </div>
</template>

<style lang="scss" scoped></style>
