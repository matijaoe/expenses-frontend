<script setup lang="ts">
import { useExpenseFilters } from 'composables/api/expenses/useExpenseFilters'
import { useCategoryStore } from 'store/categories'
import { useIconStore } from 'store/icons'

const { inputIconSize, iconWeight, iconColorPrimary } = storeToRefs(
  useIconStore()
)
const categoryStore = useCategoryStore()
const { searchQuery, categoryFilter } = useExpenseFilters()
</script>

<template>
  <div class="flex items-center gap-4 justify-between">
    <el-input
      v-model="searchQuery"
      type="text"
      placeholder="Search by title, description, category & price"
      size="large"
      clearable
    >
      <template #prefix>
        <PhMagnifyingGlass
          :size="inputIconSize"
          :weight="iconWeight"
          :color="iconColorPrimary"
        />
      </template>
    </el-input>
    <el-select
      v-model="categoryFilter"
      placeholder="Category"
      size="large"
      clearable
    >
      <el-option
        v-for="item in categoryStore.categories"
        :key="item._id"
        :label="item.name"
        :value="item._id"
      />
    </el-select>
  </div>
</template>

<style lang="scss" scoped></style>
