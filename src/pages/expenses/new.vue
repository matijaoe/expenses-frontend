<script setup lang="ts">
import { useCreateExpenseForm } from 'composables/form/useCreateExpenseForm'
import type { SubmitFormArgs } from 'models'
import { ExpenseAction } from 'models/expenses.model'
const { expenseModel, rules, onSubmit } = useCreateExpenseForm()

const submitForm = ({ formRef, form }: SubmitFormArgs) =>
  onSubmit(form, get(formRef), '/expenses')
</script>

<template>
  <div>
    <PageTitle>New expense</PageTitle>
    <ExpenseForm
      class="mt-8"
      :action="ExpenseAction.CREATE"
      :rules="rules"
      :model="expenseModel"
      submit-msg="New expense"
      @submit="submitForm"
    />
  </div>
</template>

<style lang="scss" scoped></style>
