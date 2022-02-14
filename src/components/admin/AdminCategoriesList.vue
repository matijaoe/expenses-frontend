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
    <div class="flex items-center justify-between gap-4 mb-4">
      <el-alert
        title="Only global categories are shown"
        type="info"
        show-icon
        :closable="false"
      ></el-alert>
      <el-button plain @click="onRefresh">Refresh</el-button>
    </div>
    <ul class="flex flex-col gap-4 h-[72vh] overflow-auto pr-4 pb-4">
      <AdminCategoryItem
        v-for="category in categoryStore.categories"
        :key="category._id"
        :category="category"
      />
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>
