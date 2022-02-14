import type { ElForm } from 'element-plus'
import * as EmailValidator from 'email-validator'
import type { UserRegister } from 'models/auth.model'
import { UserRole } from 'models/user.model'
import { reactive } from 'vue'
import { useAuth } from '../api/auth'

export const useRegisterForm = () => {
  const form: UserRegister = reactive({
    name: '',
    email: '',
    password: '',
    role: UserRole.User,
  })
  const repeatedPassword = ref('')

  const roles = computed(() =>
    Object.entries(UserRole).map(([label, value]) => ({ label, value }))
  )

  const passwordMatch = () =>
    form.password.trim() !== '' &&
    form.password.trim().toString() === get(repeatedPassword).trim().toString()

  const rules = reactive({
    name: [
      {
        required: true,
        message: 'Please enter your name',
        trigger: 'blur',
      },
      {
        min: 2,
        max: 24,
        message: 'Name should be between 2 and 24 characters',
        trigger: 'blur',
      },
    ],
    email: [
      {
        required: true,
        message: 'Please enter your email',
        trigger: 'blur',
      },
      {
        validator: () => EmailValidator.validate(form.email),
        message: 'Please enter a valid email',
        trigger: 'blur',
      },
    ],
    password: [
      {
        required: true,
        message: 'Please enter your password',
        trigger: 'blur',
      },
      {
        required: true,
        min: 5,
        message: 'Password too short',
        trigger: 'blur',
      },
    ],
    repeatedPassword: [
      {
        required: true,
        validator: passwordMatch,
        message: 'Passwords do not match',
        trigger: 'blur',
      },
    ],
    role: [
      {
        message: 'Please select a role',
        trigger: 'change',
      },
    ],
  })

  const auth = useAuth()

  const onSubmit = async (
    formEl: InstanceType<typeof ElForm> | null,
    onSuccess: Function,
    onError: Function
  ) => {
    if (!formEl) return
    formEl.validate(async (valid: any) => {
      if (valid) {
        const res = await auth.register(form)
        if (res) {
          return onSuccess()
        }
      }
      onError()
    })
  }

  return {
    form,
    repeatedPassword,
    rules,
    onSubmit,
    roles,
    ...auth,
  }
}
