<script setup lang="ts">
import { usePrice } from 'composables/helpers/useCurrency'
import { DateFormat, useDate } from 'composables/helpers/useDate'
import type { Expense } from 'models/expenses.model'
import { titleCase } from 'title-case'
import { PhPencil, PhTrash } from 'phosphor-vue'
import { useIconStore } from 'store/icons'
import { useDeleteHandle } from 'composables/helpers/useDeleteHandle'
import { useCategoryStore } from 'store/categories'

const props = defineProps<{
  expense: Expense
  loading?: boolean
}>()

const router = useRouter()
const { iconWeight } = storeToRefs(useIconStore())
const { formatDate } = useDate()
const { formatAmount } = usePrice()
const { handleExpenseDelete } = useDeleteHandle()
const categoryStore = useCategoryStore()

const formattedDate = computed(() =>
  formatDate(props.expense.date, DateFormat.LONG)
)
const formattedAmount = computed(() => formatAmount(props.expense.amount))
const category = computed(
  () => categoryStore.getCategoryById(props.expense.category)?.name ?? 'Unknown'
)

const onDelete = async () => {
  const success = await handleExpenseDelete(props.expense._id)
  if (success) {
    router.replace('/expenses')
  }
}

const onEditReq = () => {
  router.push(`/expenses/${props.expense._id}/edit`)
}
</script>

<template>
  <div>
    <div class="flex items-baseline justify-between gap-4">
      <div class="flex items-center gap-2">
        <el-tag size="small">{{ category }}</el-tag>
      </div>
      <div>
        <el-button size="small" type="primary" plain @click="onEditReq">
          <div class="flex items-center gap-2">
            Edit
            <PhPencil :weight="iconWeight" />
          </div>
        </el-button>
        <el-button size="small" type="danger" plain @click="onDelete">
          <div class="flex items-center gap-2">
            Delete
            <PhTrash :weight="iconWeight" />
          </div>
        </el-button>
      </div>
    </div>
    <div class="flex items-baseline justify-between mt-3">
      <div>
        <h2 class="font-sans text-6xl">{{ titleCase(expense.title) }}</h2>
        <p class="text-true-gray-500 text-base uppercase font-normal mt-2">
          {{ formattedDate }}
        </p>
      </div>
      <div>
        <p class="flex self-end items-center translate-y-1">
          <CurrencyIcon :currency="expense.currency" class="text-6xl" />
          <span class="text-6xl font-light">
            {{ formattedAmount }}
          </span>
        </p>
      </div>
    </div>
    <div class="my-8">
      <p class="text-true-gray-600 text-base font-light mt-2">
        {{ expense.description }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
