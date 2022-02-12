<script setup lang="ts">
import { useErrorNotification } from 'composables/useErrorNotification'
import { useLoginForm } from 'composables/form/useLoginForm'
import { PhEnvelope, PhEye, PhEyeClosed } from 'phosphor-vue'
import { useIconStore } from 'store/icons'
import type { ElForm } from 'element-plus'
import { usePasswordVisibility } from 'composables/form/usePasswordVisibility'

type FormInstance = InstanceType<typeof ElForm>
const ruleFormRef = ref<FormInstance | null>(null)

const router = useRouter()
const { inputIconSize, iconWeight } = storeToRefs(useIconStore())
const { form, rules, error, onSubmit } = useLoginForm()
const { visible, toggleVisiblity } = usePasswordVisibility()

const { showLoginError } = useErrorNotification()

const submitForm = (form: any) =>
  onSubmit(
    get(ruleFormRef),
    () => {
      ElNotification.closeAll()
      router.replace('/')
    },
    () => showLoginError(error.value)
  )
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="form"
    :rules="rules"
    label-width="120px"
    class="max-w-[450px]"
    size="large"
    @submit.prevent="submitForm"
  >
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
    <el-form-item>
      <el-button type="primary" native-type="submit">Login</el-button>
      <el-button native-type="button" @click="router.push('/register')">
        Register
      </el-button>
    </el-form-item>
  </el-form>
</template>
