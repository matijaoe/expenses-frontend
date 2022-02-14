<script setup lang="ts">
import { useNotification } from 'composables/useNotification'
import { useIconStore } from 'store/icons'
import { usePasswordVisibility } from 'composables/form/usePasswordVisibility'
import { useRegisterForm } from 'composables/form/useRegisterForm'
import type { FormInstance } from 'models/element.model'

const formRef = ref<FormInstance | null>(null)

const router = useRouter()
const { inputIconSize, iconWeight } = storeToRefs(useIconStore())
const { visible, toggleVisiblity } = usePasswordVisibility()
const { visible: repeatedVisible, toggleVisiblity: toggleRepeatedVisibility } =
  usePasswordVisibility()

const { form, repeatedPassword, rules, error, onSubmit, roles } =
  useRegisterForm()
const { showRegisterError } = useNotification()

const submitForm = () =>
  onSubmit(
    get(formRef),
    () => {
      ElNotification.closeAll()
      router.replace('/')
    },
    () => showRegisterError(error.value)
  )
</script>

<template>
  <el-form
    ref="formRef"
    label-position="top"
    :model="form"
    :rules="rules"
    label-width="180px"
    class="w-full md:w-[500px]"
    size="large"
    @submit.prevent="submitForm"
  >
    <el-form-item label="Name" prop="name">
      <el-input v-model="form.name" type="text">
        <template #prefix>
          <PhUserSquare :size="inputIconSize" :weight="iconWeight" />
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="Email" prop="email">
      <el-input v-model="form.email" type="text">
        <template #prefix>
          <PhEnvelope :size="inputIconSize" :weight="iconWeight" />
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input v-model="form.password" :type="visible ? 'text' : 'password'">
        <template #prefix>
          <div class="cursor-pointer" @click.stop="toggleVisiblity">
            <PhEye v-if="visible" :size="inputIconSize" :weight="iconWeight" />
            <PhEyeClosed v-else :size="inputIconSize" :weight="iconWeight" />
          </div>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="Repeated password" prop="repeatedPassword">
      <el-input
        v-model="repeatedPassword"
        :type="repeatedVisible ? 'text' : 'password'"
      >
        <template #prefix>
          <div class="cursor-pointer" @click.stop="toggleRepeatedVisibility">
            <PhEye
              v-if="repeatedVisible"
              :size="inputIconSize"
              :weight="iconWeight"
            />
            <PhEyeClosed v-else :size="inputIconSize" :weight="iconWeight" />
          </div>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="Role" prop="role">
      <el-radio-group v-model="form.role" size="large">
        <el-radio-button
          v-for="role in roles"
          :key="role.label"
          :label="role.value"
          type="info"
        />
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="success" native-type="submit">Register</el-button>
      <el-button native-type="button" @click="router.push('/login')">
        Login
      </el-button>
    </el-form-item>
  </el-form>
</template>
