<script setup lang="ts">
import { useUsers } from 'composables/api/users'

const { users, fetchUsers } = useUsers()

fetchUsers()

const onRefresh = async () => {
  await fetchUsers()
}
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
      <el-button plain @click="onRefresh">Refresh</el-button>
    </div>
    <ul class="flex flex-col gap-4 h-[72vh] overflow-auto pr-4 pb-4">
      <AdminUserItem
        v-for="user in users"
        :key="user._id"
        :user="user"
        @delete="fetchUsers"
      />
    </ul>
  </div>
</template>

<style lang="scss" scoped></style>
