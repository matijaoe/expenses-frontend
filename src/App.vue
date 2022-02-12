<script setup lang="ts">
import { useAuth, useStoredLogin } from 'composables/api/auth'
import { useUserStore } from 'store/user'

const userStore = useUserStore()

const { logout } = useAuth()
const { checkSavedLogin } = useStoredLogin()

checkSavedLogin()
</script>

<template>
  <main font-sans p="x-4 y-10" text="center true-gray-700 dark:true-gray-200">
    <nav class="flex gap-8 justify-center items-center mb-4">
      <el-link v-if="!userStore.isAuthenticated" type="primary">
        <router-link to="/login">
          Login
          <Icon class="i-carbon-login" />
        </router-link>
      </el-link>
      <el-button v-else type="text" @click="logout">
        Logout
        <Icon class="i-carbon-logout" />
      </el-button>
      <el-link type="primary">
        <router-link to="/">
          Home
          <Icon class="i-carbon-home" />
        </router-link>
      </el-link>
    </nav>
    <router-view />
  </main>
</template>
