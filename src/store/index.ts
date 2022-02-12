import { defineStore } from 'pinia'

export const useGlobalStore = defineStore({
  id: 'global',
  state: () => ({
    inputIconSize: 20,
  }),
  getters: {},
  actions: {},
})
