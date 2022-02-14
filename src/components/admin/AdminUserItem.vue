<script setup lang="ts">
import { useUserUpdate } from 'composables/api/users'
import { useDate } from 'composables/helpers/useDate'
import { useDeleteHandle } from 'composables/helpers/useDeleteHandle'
import type { User } from 'models/user.model'
import { UserRole } from 'models/user.model'
import { useIconStore } from 'store/icons'
import { useUserStore } from 'store/user'
import { titleCase } from 'title-case'

const props = defineProps<{
  user: User
}>()
const emits = defineEmits(['delete', 'changeRole'])

const { formatDateTime } = useDate()
const { updateUser } = useUserUpdate()
const { handleGlobalUserDelete } = useDeleteHandle()
const { iconWeight } = storeToRefs(useIconStore())

const onDelete = async () => {
  await handleGlobalUserDelete(props.user._id)
  emits('delete')
}

const changeAdminPrivilegies = async (newRole: UserRole) => {
  try {
    const updatedUser = await updateUser(props.user._id, { role: newRole })
    if (updatedUser) {
      emits('changeRole', { newRole })
    }
  } catch (err) {
    console.log('Error while fetching user role')
  }
}

const userStore = useUserStore()

const isMyself = computed(() => userStore.user?._id === props.user._id)

const isAdmin = computed(() => props.user.role === UserRole.Admin)
</script>

<template>
  <transition name="el-fade-in-linear" mode="in-out">
    <el-descriptions class="margin-top" :column="2" size="large" border>
      <template #title>
        <div class="flex items-center gap-2">
          <PhCircleWavyCheck
            v-if="isAdmin"
            class="text-green-600 text-xl"
            :weight="iconWeight"
          />
          <h4>{{ titleCase(props.user.name) }}</h4>
          <p v-if="isMyself" class="uppercase font-bold">(YOU)</p>
        </div>
      </template>
      <template #extra>
        <div class="flexitems-center">
          <el-button
            v-if="isAdmin"
            type="warning"
            size="small"
            :disabled="isMyself"
            @click="changeAdminPrivilegies(UserRole.User)"
          >
            Revoke admin privilegies
          </el-button>
          <el-button
            v-if="!isAdmin"
            type="success"
            size="small"
            :disabled="isMyself"
            @click="changeAdminPrivilegies(UserRole.Admin)"
          >
            Give admin privilegies
          </el-button>
          <el-button
            type="danger"
            size="small"
            :disabled="isMyself"
            @click="onDelete"
          >
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
        <el-tag :type="isAdmin ? 'success' : 'info'">{{ user.role }}</el-tag>
      </el-descriptions-item>
    </el-descriptions>
  </transition>
</template>

<style lang="scss" scoped></style>
