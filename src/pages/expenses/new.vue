<script setup lang="ts">
import { useCreateExpenseForm } from 'composables/form/useCreateExpenseForm'
import { useErrorNotification } from 'composables/useErrorNotification'
import type { FormInstance } from 'models/element.model'
import type { ExpenseCreate } from 'models/expenses.model'

const router = useRouter()
const { showMutateExpenseError } = useErrorNotification()
const { expenseModel, rules, onSubmit } = useCreateExpenseForm()

const submitForm = ({
  formRef,
  form,
}: {
  formRef: FormInstance | null
  form: ExpenseCreate
}) =>
  onSubmit(
    form,
    get(formRef),
    () => {
      ElNotification.closeAll()
      router.replace('/expenses')
    },
    () => showMutateExpenseError(null)
  )
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
