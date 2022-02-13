<script lang="ts" setup>
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
      Register
      <PhIdentificationBadge :weight="iconWeight" :color="iconColorPrimary" />
    </PageTitle>
    <RegisterForm />
  </div>
</template>
