import { defineStore } from 'pinia'

type Weight = 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone'
interface State {
  inputIconSize: number
  iconWeight: Weight
  iconColorPrimary: string
}

export const useIconStore = defineStore({
  id: 'iconStore',
  state: (): State => ({
    inputIconSize: 20,
    iconWeight: 'duotone',
    iconColorPrimary: '#409eff',
  }),
  getters: {},
  actions: {},
})
