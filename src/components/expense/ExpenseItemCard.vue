<script setup lang="ts">
import type { Expense } from 'models/expenses.model'
import { useIconStore } from 'store/icons'
import { titleCase } from 'title-case'
import { DateFormat, useDate } from 'composables/helpers/useDate'
import { usePrice } from 'composables/helpers/useCurrency'
import { useDeleteHandle } from 'composables/helpers/useDeleteHandle'
import { useCategoryStore } from 'store/categories'

const props = defineProps<{
  expense: Expense
  loading: boolean
}>()

const router = useRouter()
const { iconColorPrimary, iconWeight } = storeToRefs(useIconStore())
const { formatDate } = useDate()
const { formatAmount } = usePrice()
const { handleExpenseDelete } = useDeleteHandle()
const categoryStore = useCategoryStore()

const formattedDate = computed(() =>
  formatDate(props.expense.date, DateFormat.SHORT)
)

const category = computed(
  () => categoryStore.getCategoryById(props.expense.category)?.name ?? 'Unknown'
)

const formattedAmount = computed(() => formatAmount(props.expense.amount))
</script>

<template>
  <transition name="el-fade-in-linear" mode="in-out">
    <article
      v-if="!loading"
      class="expense rounded transition duration-100 ease-in-out"
      bg="white hover:blue-100 hover:opacity-20 "
      border="true-gray-100 2 hover:blue-200"
      p="4"
      :data-id="expense._id"
      @click="router.push(`/expenses/${expense._id}`)"
    >
      <div class="h-full flex items-center">
        <ph-receipt :size="64" :color="iconColorPrimary" :weight="iconWeight" />
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <h3 class="text-xl">{{ titleCase(expense.title) }}</h3>
          <p class="text-true-gray-500 text-xs uppercase font-normal">
            {{ formattedDate }}
          </p>
        </div>
        <div class="flex justify-between gap-2 mt-auto">
          <div class="flex flex-col gap-2">
            <div>
              <p
                class="expense-description text-true-gray-800 text-sm font-normal max-w-[75ch]"
              >
                {{ expense.description }}
              </p>
            </div>
            <div class="flex items-center gap-4">
              <el-tag size="small">{{ category }}</el-tag>
              <el-tooltip
                effect="light"
                content="Delete expense"
                placement="bottom"
              >
                <button>
                  <PhTrash
                    :weight="iconWeight"
                    class="hover:text-red-500 text-lg block"
                    @click.stop="handleExpenseDelete(expense._id)"
                  />
                </button>
              </el-tooltip>
            </div>
          </div>
          <p class="flex self-end items-center">
            <CurrencyIcon :currency="expense.currency" :size="32" />
            <span class="text-2xl font-light">
              {{ formattedAmount }}
            </span>
          </p>
        </div>
      </div>
    </article>
  </transition>
</template>

<style lang="scss" scoped>
article.expense {
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 1.5rem;
  text-align: left;
}

.expense-description {
  max-width: 75ch;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
