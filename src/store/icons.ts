import { defineStore } from 'pinia'

type Weight = 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'
interface State {
  inputIconSize: number
  inputWeight: Weight
  inputColorPrimary: string
}

export const useIconStore = defineStore({
  id: 'iconStore',
  state: (): State => ({
    inputIconSize: 20,
    inputWeight: 'duotone',
    inputColorPrimary: '#409eff',
  }),
  getters: {},
  actions: {},
})
