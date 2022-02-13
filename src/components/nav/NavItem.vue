<script setup lang="ts">
defineProps<{
  label: string
  to?: string | object
}>()
defineEmits(['click'])
</script>

<template>
  <div>
    <router-link v-if="to" :to="to">
      <el-link>
        <div class="flex items-center gap-1">
          <slot />
          {{ label }}
        </div>
      </el-link>
    </router-link>
    <el-link v-else @click="$emit('click')">
      <div class="flex items-center gap-1">
        {{ label }}
        <slot />
      </div>
    </el-link>
  </div>
</template>

<style lang="scss" scoped></style>
