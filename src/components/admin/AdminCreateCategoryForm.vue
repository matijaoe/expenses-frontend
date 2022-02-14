<script setup lang="ts">
import { useNotification } from 'composables/useNotification'
import type { ExpenseCategoryCreate } from 'models/category.model'
import type { FormInstance } from 'models/element.model'
import { useCategoryStore } from 'store/categories'

const categoryStore = useCategoryStore()

const form: ExpenseCategoryCreate = reactive({
  name: '',
})

const rules = reactive({
  name: [
    {
      required: true,
      message: 'Please enter category name',
      trigger: 'blur',
    },
  ],
})

const resetFields = () => {
  form.name = ''
}

const formRef = ref<FormInstance | null>(null)

const { showNotification } = useNotification()

const submitForm = async () => {
  const res = await categoryStore.createGlobalCategory(form)
  console.log(res)
  if (res) {
    showNotification({
      title: 'Category created',
      message: `Successfully created category "${form.name}"`,
      type: 'success',
    })
    resetFields()
  } else {
    showNotification({
      title: 'Error creating category',
      message: 'Please check your details and again later',
      type: 'error',
    })
  }
}
</script>

<template>
  <div class="border-2 border-true-gray-200 rounded p-3 flex-1">
    <h2 class="mb-5 font-semibold">Create new global category</h2>
    <el-form
      ref="formRef"
      label-position="top"
      :model="form"
      :rules="rules"
      label-width="120px"
      size="large"
      @submit.prevent="submitForm"
    >
      <el-form-item label="Name" prop="text">
        <el-input v-model="form.name" type="text">Category name</el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">Create</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style lang="scss" scoped></style>
