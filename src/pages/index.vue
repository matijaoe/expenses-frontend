<script lang="ts" setup>
import { useUserStore } from 'store/user'
import { titleCase } from 'title-case'

const userStore = useUserStore()
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    <h2 v-if="userStore.user" class="mt-4 text-5xl">
      Welcome back
      <span>{{ titleCase(userStore.user?.name as string) }}!</span>
    </h2>
  </div>
</template>
