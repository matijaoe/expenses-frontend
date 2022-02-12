<script setup lang="ts">
import { useAuth } from 'composables/api/useAuth'
import type { UserLogin } from 'models/auth.model'
import { useUserStore } from 'store/user'

const userStore = useUserStore()

const userData: UserLogin = reactive({
  email: '',
  password: '',
})

const router = useRouter()

const { login, error, isError } = useAuth()

const loginUser = async() => {
  const loggedIn = await login(userData)
  console.log('loggedIn :>> ', loggedIn)
  if (loggedIn)
    router.push('/')
}
</script>

<route lang="yaml">
meta:
  layout: auth
</route>

<template>
  <div class="max-w-screen-md mx-auto">
    <h1 class="text-2xl text-left mb-2">
      Login
    </h1>
    <p v-if="isError" class="text-red-600">
      {{ error }}
    </p>
    <form v-if="!userStore.isAuthenticated" class="flex flex-col gap-3 items-center mb-4" @submit.prevent="loginUser">
      <el-input v-model="userData.email" placeholder="Email" />
      <el-input
        v-model="userData.password"
        type="password"
        placeholder="Password"
      />
      <el-button class="block" native-type="submit">
        Login
      </el-button>
    </form>
  </div>
</template>

<style lang="scss" scoped></style>
