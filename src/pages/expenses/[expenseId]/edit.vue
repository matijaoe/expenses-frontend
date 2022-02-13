<script setup lang="ts">
import { useExpense } from 'composables/api/expenses'
import { useEditExpenseForm } from 'composables/form/useEditExpenseForm'
import type { SubmitFormArgs } from 'models'

const route = useRoute()
const expenseId = computed(() => route.params.expenseId as string)

const { fetchExpense, expense } = useExpense()

const { expenseModel, rules, onSubmit, fillExpenseModel } = useEditExpenseForm()

watchEffect(async () => {
  if (expenseId.value) {
    await fetchExpense(expenseId.value)
    if (expense.value) {
      fillExpenseModel(expense.value)
    }
  }
})

const submitForm = ({ formRef, form }: SubmitFormArgs) =>
  onSubmit(expenseId.value, form, get(formRef), `/expenses/${expenseId.value}`)
</script>

<template>
  <div>
    <PageTitle>Edit expense</PageTitle>
    <ExpenseForm
      v-if="expense"
      class="mt-8"
      :model="expenseModel"
      :rules="rules"
      submit-msg="Edit expense"
      @submit="submitForm"
    />
  </div>
</template>

<style lang="scss" scoped></style>
