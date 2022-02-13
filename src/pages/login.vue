<script setup lang="ts">
import { PhSignIn } from 'phosphor-vue'
import { useIconStore } from 'store/icons'

const { iconColorPrimary, iconWeight } = storeToRefs(useIconStore())
</script>

<route lang="yaml">
meta:
  layout: auth
</route>

<template>
  <div>
    <PageTitle class="justify-end mb-8">
      Login
      <PhSignIn :weight="iconWeight" :color="iconColorPrimary" />
    </PageTitle>
    <LoginForm />
  </div>
</template>

<style lang="scss" scoped></style>
