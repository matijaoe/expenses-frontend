<script setup lang="ts">
import { useDeleteHandle } from 'composables/helpers/useDeleteHandle'
import type { ExpenseCategory } from 'models/category.model'

const props = defineProps<{
  category: ExpenseCategory
}>()

const { handleGlobalCategoryDelete } = useDeleteHandle()

const onDelete = () => {
  handleGlobalCategoryDelete(props.category._id)
}
</script>

<template>
  <transition name="el-fade-in-linear" mode="in-out">
    <el-descriptions
      class="margin-top"
      :title="props.category.name"
      :column="2"
      size="large"
      border
    >
      <template #extra>
        <el-button type="danger" size="small" @click="onDelete">
          Delete
        </el-button>
      </template>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">ID</div>
        </template>
        {{ category._id }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">Version Key</div>
        </template>
        {{ category.__v }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">Tag</div>
        </template>
        <el-tag size="small">{{ category.name }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">Name</div>
        </template>
        {{ category.name }}
      </el-descriptions-item>
    </el-descriptions>
  </transition>
</template>

<style lang="scss" scoped></style>
