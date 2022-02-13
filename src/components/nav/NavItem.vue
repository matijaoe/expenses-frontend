<script setup lang="ts">
defineProps<{
  label: string
  to?: string | object
}>()
defineEmits(['click'])
</script>

<template>
  <el-link type="primary" @click="$emit('click')">
    <router-link v-if="to" :to="to" class="flex items-center gap-1">
      {{ label }}
      <slot />
    </router-link>
    <div v-else>
      <div class="flex items-center gap-1">
        {{ label }}
        <slot />
      </div>
    </div>
  </el-link>
</template>

<style lang="scss" scoped></style>
