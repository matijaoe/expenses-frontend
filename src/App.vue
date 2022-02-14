<script setup lang="ts">
import { useStoredLogin } from 'composables/api/auth'

const { checkSavedLogin } = useStoredLogin()
checkSavedLogin()
</script>

<template>
  <div class="bg-red-200 h-full" bg="light-50">
    <router-view />
  </div>
</template>
