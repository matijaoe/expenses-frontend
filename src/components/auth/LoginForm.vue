<script setup lang="ts">
import { useAuth } from 'composables/api/auth'
import type { UserLogin } from 'models/auth.model'
import { PhEnvelope, PhEye, PhEyeClosed } from 'phosphor-vue'
import { useGlobalStore } from 'store'

import * as EmailValidator from 'email-validator'

const router = useRouter()
const { login, isSuccess, error } = useAuth()
const { inputIconSize } = useGlobalStore()

const form: UserLogin = reactive({
  email: '',
  password: '',
})
const formRef = ref<HTMLFormElement | null>(null)
const passwordVisible = ref(false)

const togglePasswordVisiblity = () =>
  set(passwordVisible, !get(passwordVisible.value))

// TODO: replace with better validation lib
const rules = reactive({
  email: [
    {
      required: true,
      message: 'Please input your email',
      trigger: 'blur',
    },
    {
      validator: () => EmailValidator.validate(form.email),
      message: 'Please input a valid email',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: 'Please input your password',
      trigger: 'blur',
    },
    {
      min: 5,
      message: 'Password should be at least 5 characters',
      trigger: 'blur',
    },
  ],
})

const showInvalidLoginNotification = () => {
  ElNotification({
    title: 'Invalid login',
    message: error.value || 'Please check your details and try again',
    type: 'error',
  })
}

const onSubmit = async () => {
  const res = await login(form)
  console.log('res', res)
  console.log('isSuccess', isSuccess.value)
  if (isSuccess.value) {
    router.replace('/')
  } else {
    showInvalidLoginNotification()
  }
}
</script>

<template>
  <el-form
    ref="formRef"
    :model="form"
    :rules="rules"
    label-width="120px"
    class="max-w-[450px] mx-auto -translate-x-10"
    size="large"
    @submit.prevent="onSubmit">
    <el-form-item label="Email" prop="email">
      <el-input v-model="form.email" type="text">
        <template #prefix>
          <PhEnvelope :size="inputIconSize" />
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input
        id="passwordInput"
        v-model="form.password"
        :type="passwordVisible ? 'text' : 'password'">
        <template #prefix>
          <div class="cursor-pointer" @click.stop="togglePasswordVisiblity">
            <PhEye v-if="passwordVisible" :size="inputIconSize" />
            <PhEyeClosed v-else :size="inputIconSize" />
          </div>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">Login</el-button>
      <el-button native-type="button" @click="router.push('/register')">
        Register
      </el-button>
    </el-form-item>
  </el-form>
</template>
