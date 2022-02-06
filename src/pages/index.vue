<script setup lang="ts">
import { useCounterStore } from '~/store'

const counterStore = useCounterStore()
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    Hello
    <p>{{ counterStore.counter }}</p>
    <el-button @click="counterStore.increment">
      incrementaj
    </el-button>
  </div>
</template>
