<script setup lang="ts">
import { useStoredLogin } from 'composables/api/auth'

const { checkSavedLogin } = useStoredLogin()

checkSavedLogin()
</script>

<template>
  <main >
    <router-view />
  </main>
</template>
