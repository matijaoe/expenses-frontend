<script setup lang="ts">
import { useUsers } from 'composables/api/users'

const { users, fetchUsers } = useUsers()

fetchUsers()

const onRefresh = async () => {
  await fetchUsers()
}

const adminOnly = ref(false)

const filteredUsers = computed(() => {
  return adminOnly.value
    ? users.value.filter((user) => user.role === 'admin')
    : users.value
})
</script>

<template>
  <div>
    <div class="flex items-center justify-between gap-4 mb-4">
      <el-alert
        title="All users are listed"
        type="info"
        show-icon
        :closable="false"
      ></el-alert>
      <div class="flex items-center gap-3 mx-2">
        <span class="uppercase text-sm">All</span>
        <el-switch
          v-model="adminOnly"
          active-color="#13ce66"
          inactive-color="#ff4949"
        />
        <span class="uppercase text-sm">Admin</span>
      </div>
      <el-button plain @click="onRefresh">Refresh</el-button>
    </div>
    <ul class="flex flex-col gap-4 h-[72vh] overflow-auto pr-4 pb-4">
      <AdminUserItem
        v-for="user in filteredUsers"
        :key="user._id"
        :user="user"
        @delete="fetchUsers"
        @change-role="fetchUsers"
      />
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>
