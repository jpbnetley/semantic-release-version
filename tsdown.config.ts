import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/index.ts'],
  platform: 'node',
  dts: {
    isolatedDeclarations: true,
  },
  noExternal: ['zod', '@actions/core', '@actions/github'],
})
