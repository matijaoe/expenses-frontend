<script setup lang="ts">
import type { Expense } from 'models/expenses.model'
import { useIconStore } from 'store/icons'
import { PhReceipt } from 'phosphor-vue'
import { titleCase } from 'title-case'
import { DateFormat, useDate } from 'composables/helpers/useDate'
import { usePrice } from 'composables/helpers/useCurrency'
const { iconColorPrimary, iconWeight } = storeToRefs(useIconStore())

const props = defineProps<{
  expense: Expense
  loading: boolean
}>()

const { formatDate } = useDate()
const { formatAmount } = usePrice()

const formattedDate = computed(() =>
  formatDate(props.expense.date, DateFormat.SHORT)
)
const formattedAmount = computed(() => formatAmount(props.expense.amount))
</script>

<script lang="ts">
export default {
  methods: {
    onContextMenu(e: MouseEvent) {
      // prevent the browser's default menu
      e.preventDefault()
      // shou our menu
      this.$contextmenu({
        x: e.x,
        y: e.y,
        items: [
          {
            label: 'A menu item',
            onClick: () => {
              alert('You click a menu item')
            },
          },
          {
            label: 'A submenu',
            children: [
              { label: 'Item1' },
              { label: 'Item2' },
              { label: 'Item3' },
            ],
          },
        ],
      })
    },
  },
}
</script>

<template>
  <transition name="el-fade-in-linear" mode="in-out">
    <router-link v-if="!loading" :to="`/expenses/${expense._id}`">
      <article
        class="expense rounded transition duration-100 ease-in-out"
        bg="hover:blue-100 hover:opacity-20 "
        border="true-gray-100 2 hover:blue-200"
        p="4"
        :data-id="expense._id"
        @contextmenu="onContextMenu($event)"
      >
        <div class="h-full flex items-center">
          <ph-receipt
            :size="64"
            :color="iconColorPrimary"
            :weight="iconWeight"
          />
        </div>
        <div class="flex flex-col gap-2">
          <div class="flex items-center justify-between">
            <h3 class="text-xl">{{ titleCase(expense.title) }}</h3>
            <p class="text-true-gray-500 text-xs uppercase font-normal">
              {{ formattedDate }}
            </p>
          </div>
          <div class="flex justify-between gap-2">
            <div class="flex flex-col gap-2">
              <div>
                <p
                  class="expense-description text-true-gray-800 text-sm font-normal max-w-[75ch]"
                >
                  {{ expense.description }}
                </p>
              </div>
              <div>
                <el-tag size="small">School</el-tag>
              </div>
            </div>
            <p class="flex self-end items-center">
              <CurrencyIcon :currency="expense.currency" :size="32" />
              <span class="text-2xl font-light text-true-gray-900">
                {{ formattedAmount }}
              </span>
            </p>
          </div>
        </div>
      </article>
    </router-link>
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
