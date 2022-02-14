<script setup lang="ts">
import { useCategoryStore } from 'store/categories'

const categoryStore = useCategoryStore()

categoryStore.fetchCategories(true)

const onRefresh = () => {
  categoryStore.fetchCategories(true)
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between gap-4 mb-8">
      <h4 class="uppercase text-red-500">Only global categories are shown</h4>
      <el-button size="small" plain @click="onRefresh">Refresh</el-button>
    </div>
    <ul class="flex flex-col gap-4 h-[70vh] overflow-auto px-4 pb-4">
      <AdminCategoryItem
        v-for="category in categoryStore.categories"
        :key="category._id"
        :category="category"
      />
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>
