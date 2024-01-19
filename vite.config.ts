import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import vitePluginSvgr from 'vite-plugin-svgr'
import path from 'node:path'

const PORT: number = Number(process.env.PORT) || 3000

/** @type {import('vite').UserConfig} */
export default defineConfig({
  base: '/',
  build: {
    outDir: './docs',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [react(), viteTsconfigPaths(), vitePluginSvgr()],
  server: {
    open: true,
    host: true,
    port: PORT,
    watch: {
      usePolling: true,
    },
  },
  // test: { // use after set tests
  //   globals: true,
  //   resolveSnapshotPath: (testPath: never, snapExtension: never) => testPath + snapExtension,
  //   environment: 'jsdom',
  //   setupFiles: '.vitest/setup.ts',
  // },
  // reporters: ['verbose'],
  // coverage: {
  //   all: true,
  //   reporter: ['text', 'html', 'lcov'],
  //   include: ['**/src/**/*.{js,jsx,ts,tsx}'],
  //   exclude: [
  //     '**/src/main.{js,jsx,ts,tsx}',
  //     '**/*.types.{ts,tsx}',
  //     '**/*.test.{js,jsx,ts,tsx}',
  //     '**/src/vite-env*',
  //   ],
  //   statements: 0,
  //   branches: 0,
  //   functions: 0,
  //   lines: 0,
  // },
})
