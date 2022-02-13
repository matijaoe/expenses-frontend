<script setup lang="ts">
defineProps<{
  label: string
  to?: string | object
  type?: 'default' | 'primary' | 'success' | 'danger' | 'warning' | 'info'
}>()
defineEmits(['click'])
</script>

<template>
  <div>
    <router-link v-if="to" :to="to">
      <el-link :type="type ?? 'default'">
        <div class="flex items-center gap-1">
          <slot />
          {{ label }}
        </div>
      </el-link>
    </router-link>
    <el-link v-else :type="type ?? 'default'" @click="$emit('click')">
      <div class="flex items-center gap-1">
        {{ label }}
        <slot />
      </div>
    </el-link>
  </div>
</template>

<style lang="scss" scoped></style>
