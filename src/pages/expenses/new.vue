<script setup lang="ts">
import { useCreateExpenseForm } from 'composables/form/useCreateExpenseForm'
import type { FormInstance } from 'models/element.model'
import type { ExpenseCreate } from 'models/expenses.model'

const router = useRouter()
const { expenseModel, rules, onSubmit } = useCreateExpenseForm()

interface SubmitFormArgs {
  formRef: FormInstance | null
  form: ExpenseCreate
}
const submitForm = ({ formRef, form }: SubmitFormArgs) =>
  onSubmit(form, get(formRef), '/expenses')
</script>

<template>
  <div>
    <PageTitle>New expense</PageTitle>
    <ExpenseForm
      class="mt-8"
      :rules="rules"
      :model="expenseModel"
      submit-msg="New expense"
      @submit="submitForm"
    />
  </div>
</template>

<style lang="scss" scoped></style>
