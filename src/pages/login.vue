<script setup lang="ts">
import { PhSignIn } from 'phosphor-vue'
import { useIconStore } from 'store/icons'

const { inputColorPrimary, inputWeight } = storeToRefs(useIconStore())
</script>

<route lang="yaml">
meta:
  layout: auth
</route>

<template>
  <div>
    <AuthFormTitle>
      Login
      <PhSignIn :weight="inputWeight" :color="inputColorPrimary" />
    </AuthFormTitle>

    <LoginForm />
  </div>
</template>

<style lang="scss" scoped></style>
