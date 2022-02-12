<script lang="ts" setup>
import { useAuth } from 'composables/api/auth'

const { user } = useAuth()
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    Hello
    {{ user }}
  </div>
</template>
