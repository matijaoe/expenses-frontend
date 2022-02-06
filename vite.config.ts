import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { presetAttributify, presetIcons, presetUno } from 'unocss'
import Unocss from 'unocss/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue(),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core'],
      resolvers: [ElementPlusResolver()],
      dts: true,
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      resolvers: [ElementPlusResolver()],
      dts: true,
    }),

    // https://github.com/antfu/unocss
    Unocss({
      shortcuts: [
        [
          'btn',
          'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50',
        ],
      ],
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          scale: 1.2,
          extraProperties: {
            'display': 'inline-block',
            'vertical-align': 'middle',
          },
        }),
      ],
    }),
  ],
})
