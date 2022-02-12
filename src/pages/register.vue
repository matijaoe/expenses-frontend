<script lang="ts" setup>
import { PhSignpost } from 'phosphor-vue'
</script>

<route lang="yaml">
meta:
  layout: auth
</route>

<template>
  <div>
    <AuthFormTitle>
      Register
      <PhSignpost weight="duotone" color="#409eff" />
    </AuthFormTitle>
    <RegisterForm />
  </div>
</template>
