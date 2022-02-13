<script setup lang="ts">
import { useStoredLogin } from 'composables/api/auth'
import { useCategoryStore } from 'store/categories'

const { checkSavedLogin } = useStoredLogin()
const categoryStore = useCategoryStore()
checkSavedLogin()
categoryStore.fetchCategories()
</script>

<template>
  <div>
    <router-view />
  </div>
</template>
