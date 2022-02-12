<script setup lang="ts">
import { useLogin, useLogout } from 'composables/api/useAuth'
import type { UserLogin } from 'models/auth.model'

const userData: UserLogin = reactive({
  email: '',
  password: '',
})
const { login, data, isError, error } = useLogin()
const { logout } = useLogout()

const loginUser = () => login(userData)
</script>

<template>
  <div class="max-w-screen-md mx-auto">
    <h1>Login</h1>
    <pre v-if="data">
      {{ data.user }}
  </pre>
    <div v-if="isError">
      {{ error }}
    </div>
    <form @submit.prevent="loginUser">
      <el-input v-model="userData.email" placeholder="Email" />
      <el-input v-model="userData.password" type="password" placeholder="Password" />
    </form>
    <el-button class="block" @click="loginUser">
      Login
    </el-button>
    <el-button class="block" type="danger" @click="logout">
      Logout
    </el-button>
  </div>
</template>

<style lang="scss" scoped></style>
