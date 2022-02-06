<script lang="ts" setup>
import { useQuery } from 'vue-query'
import { getKanyeQuote } from '~/services/api/kanye'
import { useCounterStore } from '~/store'

const counterStore = useCounterStore()
const quote = ref<string | null>()

const useKanyeQuote = () => useQuery('kanye', getKanyeQuote, {
  onSuccess: data => quote.value = data.quote,
  onError: () => quote.value = null,
})

const { isLoading, refetch, isSuccess, error, isError, isFetching } = useKanyeQuote()

watch(() => counterStore.counter, () => refetch.value())

</script>

<template>
  <div class="flex flex-col gap-4 items-center">
    Hello
    <p>{{ counterStore.counter }}</p>
    <el-button type="primary" @click="counterStore.increment">
      incrementaj za 1
    </el-button>
    <p v-if="isLoading">
      Loading...
    </p>
    <p v-if="isSuccess" class="italic text-orange-400">
      {{ quote }}
    </p>
    <p v-if="isError" class="italic text-red-500 text-2xl">
      {{ error }}
      <span class="i-carbon-error text-4xl ml-2" />
    </p>
    <el-button type="warning" :disabled="isFetching" @click="refetch()">
      get another one
    </el-button>
  </div>
</template>
