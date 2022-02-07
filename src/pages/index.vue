<script lang="ts" setup>
import { useQuote } from '~/composables'
import { useCounterStore } from '~/store'

const { counter, increment } = toRefs(useCounterStore())

const {
  data,
  isLoading,
  isFetching,
  isSuccess,
  isError,
  refetch,
  error,
  status,
} = useQuote()

watch(counter, () => refetch.value())
</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    Hello
    <p text="9xl" font="bold mono">
      {{ counter }}
    </p>
    <p
      class="uppercase rounded"
      text="true-gray-500 dark:true-gray-300 xs"
      bg="true-gray-100 dark:true-gray-800"
      font="bold"
      p="x-2 y-1"
      m="t--4"
    >
      {{ status }}
    </p>
    <el-button type="primary" @click="increment">
      incrementaj za 1
      <Icon i-carbon-add />
    </el-button>
    <p v-if="isLoading" class="flex items-center" text="true-gray-500 dark:true-gray-300 xl">
      Loading...
      <Icon i-carbon-progress-bar-round ml-2 />
    </p>
    <p v-else-if="isSuccess && data" class="italic" text="orange-400">
      {{ data.quote }}
      <Icon i-carbon-checkmark ml-2 />
    </p>
    <p v-else-if="isError" class="italic flex items-center" text="red-500 xl">
      {{ error }}
      <Icon i-carbon-error ml-2 />
    </p>
    <el-button type="warning" :disabled="isFetching" @click="refetch()">
      another
    </el-button>
  </div>
</template>
