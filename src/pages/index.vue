<script lang="ts" setup>
import { useAuth } from 'composables/api/useAuth'
import {
  useUser,
  useUserDelete,
  useUserUpdate,
  useUsers,
} from 'composables/api/users'
import { useUserStore } from 'store/user'

const { user } = useAuth()
const userStore = useUserStore()

const name = ref<string>('')

const { user: fetchedUser, fetchUser, isSuccess } = useUser()
const { users: fetchedUsers, fetchUsers } = useUsers()
const { user: updatedUser, updateUser } = useUserUpdate()
const { user: deletedUser, deleteUser } = useUserDelete()
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    Hello
    {{ user }}

    <div class="flex gap-2">
      <el-input v-model="name" placeholder="change name" />
      <el-button
        type="warning"
        @click="() => userStore.updateCurrentUser({ name })"
      >
        Update
      </el-button>
      <el-button type="danger" @click="userStore.deleteCurrentUser">
        Delete
      </el-button>
    </div>
    <div>
      <div v-if="isSuccess" class="text-orange-500">
        {{ fetchedUser }}
      </div>
      <el-button
        type="info"
        @click="() => fetchUser('62050bd539b35db07b20a340')"
      >
        Fetch user
      </el-button>
    </div>
    <div>
      <div v-if="fetchedUsers" class="text-orange-500">
        {{ fetchedUsers }}
      </div>
      <el-button type="info" @click="() => fetchUsers()">
        Fetch users
      </el-button>
    </div>
    <div>
      <div v-if="updatedUser" class="text-orange-500">
        {{ updatedUser }}
      </div>
      <el-button
        type="info"
        @click="() => updateUser('62050bd539b35db07b20a340', { name: 'tomek' })"
      >
        update tomo
      </el-button>
    </div>
    <div>
      <div v-if="deletedUser" class="text-orange-500">
        {{ deletedUser }}
      </div>
      <el-button
        type="info"
        @click="() => deleteUser('6207c04f7ee130cea06860a4')"
      >
        delete visnja
      </el-button>
    </div>
  </div>
</template>
