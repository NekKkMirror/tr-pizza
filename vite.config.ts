import dts from 'vite-plugin-dts'
import rollupTs from 'rollup-plugin-typescript2'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import vitePluginSvgr from 'vite-plugin-svgr'
import path from 'node:path'
import { defineConfig } from 'vite'

const PORT: number = Number(process.env.PORT) || 3000

/** @type {import('vite').UserConfig} */
export default defineConfig({
  base: './',
  build: {
    sourcemap: true,
    outDir: './docs',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
      '@IMG': path.resolve(__dirname, '/src/assets/img'),
      '@RX-cart': path.resolve(__dirname, '/types/@RX/cart/index.d.ts'),
      '@RX-filter': path.resolve(__dirname, '/types/@RX/filter/index.d.ts'),
      '@RX-pizza': path.resolve(__dirname, '/types/@RX/pizza/index.d.ts'),
      '@CMP-categories': path.resolve(
        __dirname,
        '/types/@CMP/categories/index.d.ts',
      ),
      '@CMP-pagination': path.resolve(
        __dirname,
        '/types/@CMP/pagination/index.d.ts',
      ),
      '@CMP-pizza-block': path.resolve(
        __dirname,
        '/types/@CMP/pizzaBlock/index.d.ts',
      ),
      '@CMP-sort': path.resolve(__dirname, '/types/@CMP/sort/index.d.ts'),
      '@CMP-cart': path.resolve(__dirname, '/types/@CMP/cart/index.d.ts'),
    },
  },
  plugins: [
    dts({ insertTypesEntry: true }),
    {
      ...rollupTs({
        include: [`${path.resolve(__dirname, '/types')}`],
        check: true,
        useTsconfigDeclarationDir: true,
        tsconfig: './tsconfig.json',
        tsconfigOverride: {
          noEmits: true,
        },
      }),
      enforce: 'pre',
    },
    react(),
    viteTsconfigPaths(),
    vitePluginSvgr(),
  ],
  server: {
    open: true,
    host: true,
    port: PORT,
    watch: {
      usePolling: true,
    },
  },
})
