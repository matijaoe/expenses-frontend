<script setup lang="ts">
import { useCreateExpenseForm } from 'composables/form/useCreateExpenseForm'
import type { Expense, ExpenseAction } from 'models/expenses.model'
import { useIconStore } from 'store/icons'
import { PhCalendar } from 'phosphor-vue'
import { useErrorNotification } from 'composables/useErrorNotification'
import type { FormInstance } from 'models/element.model'
import { useCategoryStore } from 'store/categories'
defineProps<{
  action: ExpenseAction
  currentExpense?: Expense
}>()

const ruleFormRef = ref<FormInstance | null>(null)

const router = useRouter()
const { inputIconSize, iconWeight, iconColorPrimary } = storeToRefs(
  useIconStore()
)
const { showCreateExpenseError } = useErrorNotification()
const {
  expense: form,
  disabledDate,
  currencies,
  rules,
  onSubmit,
} = useCreateExpenseForm()

const submitForm = () =>
  onSubmit(
    get(ruleFormRef),
    () => {
      ElNotification.closeAll()
      router.replace('/expenses')
    },
    () => showCreateExpenseError(null)
  )

const categoryStore = useCategoryStore()
categoryStore.fetchCategories()
</script>

<template>
  <el-form
    ref="ruleFormRef"
    label-position="top"
    :model="form"
    :rules="rules"
    class="w-full md:w-[500px]"
    size="large"
    hide-required-asterisk
    @submit.prevent="submitForm"
  >
    <el-form-item label="Title" prop="title">
      <el-input v-model="form.title" type="text">
        <template #prefix>
          <PhTextAa
            :size="inputIconSize"
            :weight="iconWeight"
            :color="iconColorPrimary"
          />
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="Description" prop="description">
      <el-input v-model="form.description" type="textarea" rows="4" />
    </el-form-item>
    <!-- price -->
    <div class="flex items-center gap-3">
      <el-form-item label="Currency" prop="currency">
        <el-select v-model="form.currency" placeholder="Select" size="large">
          <el-option
            v-for="item in currencies"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Price" prop="amount" class="flex-1">
        <el-input v-model="form.amount" type="number" :step="0.01">
          <template #prefix>
            <CurrencyIcon
              :currency="form.currency"
              :size="inputIconSize"
              :weight="iconWeight"
            />
          </template>
        </el-input>
      </el-form-item>
    </div>
    <div class="flex items-center gap-3">
      <el-form-item label="Date" prop="date">
        <el-date-picker
          v-model="form.date"
          type="date"
          placeholder="Pick a date"
          :disabled-date="disabledDate"
          :prefix-icon="PhCalendar"
        />
      </el-form-item>
      <el-form-item label="Category" prop="category" class="flex-1">
        <el-select
          v-model="form.category"
          placeholder="Select a category"
          size="large"
        >
          <el-option
            v-for="item in categoryStore.categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          />
        </el-select>
      </el-form-item>
    </div>
    <el-form-item>
      <el-button type="primary" native-type="submit">
        <div class="flex items-center gap-2">
          Create expense
          <PhPlusCircle :weight="iconWeight" size="20" />
        </div>
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped></style>
