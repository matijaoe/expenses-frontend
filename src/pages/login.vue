<script setup lang="ts">
import { useLogin, useLogout } from 'composables/api/useAuth'
import type { UserLogin } from 'models/auth.model'

const userData: UserLogin = reactive({
  email: '',
  password: '',
})
const { login, data, isError, error } = useLogin()
const { logout } = useLogout()
</script>

<template>
  <h1>Login</h1>
  <pre v-if="data">
      {{ data }}
  </pre>
  <div v-if="isError">
    {{ error }}
  </div>
  <el-input v-model="userData.email" placeholder="Email" />
  <el-input v-model="userData.password" type="password" placeholder="Password" />
  <el-button class="block" @click="() => login(userData)">
    Login
  </el-button>
  <el-button class="block" type="danger" @click="logout">
    Logout
  </el-button>
</template>

<style lang="scss" scoped></style>
