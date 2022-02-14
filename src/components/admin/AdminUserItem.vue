<script setup lang="ts">
import { useDate } from 'composables/helpers/useDate'
import { useDeleteHandle } from 'composables/helpers/useDeleteHandle'
import type { User } from 'models/user.model'
import { UserRole } from 'models/user.model'
import { titleCase } from 'title-case'

const props = defineProps<{
  user: User
}>()
const emits = defineEmits(['delete'])

const { formatDateTime } = useDate()
const { handleGlobalUserDelete } = useDeleteHandle()

const onDelete = async () => {
  await handleGlobalUserDelete(props.user._id)
  emits('delete')
}

const isAdmin = computed(() => props.user.role === UserRole.Admin)
</script>

<template>
  <transition name="el-fade-in-linear" mode="in-out">
    <el-descriptions
      class="margin-top"
      :title="titleCase(props.user.name)"
      :column="2"
      size="large"
      border
    >
      <template #extra>
        <div class="flexitems-center">
          <el-button
            v-if="isAdmin"
            type="warning"
            size="small"
            @click="onDelete"
          >
            Revoke admin privilegies
          </el-button>
          <el-button
            v-if="!isAdmin"
            type="success"
            size="small"
            @click="onDelete"
          >
            Give admin privilegies
          </el-button>
          <el-button type="danger" size="small" @click="onDelete">
            Delete
          </el-button>
        </div>
      </template>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">ID</div>
        </template>
        {{ user._id }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">Version Key</div>
        </template>
        {{ user.__v }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">Created at</div>
        </template>
        {{ formatDateTime(user.createdAt) }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">Updated at</div>
        </template>
        {{ formatDateTime(user.updatedAt) }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">Name</div>
        </template>
        {{ user.name }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">Email</div>
        </template>
        {{ user.email }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">Role</div>
        </template>
        <el-tag :type="isAdmin ? 'danger' : 'info'">{{ user.role }}</el-tag>
      </el-descriptions-item>
    </el-descriptions>
  </transition>
</template>

<style lang="scss" scoped></style>
