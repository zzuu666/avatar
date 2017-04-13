import typescript from '@alexlur/rollup-plugin-typescript'

export default {
  entry: 'src/index.ts',
  format: 'umd',
  dest: 'dist/avatar.js',
  moduleName: 'Avatar',
  plugins: [
    typescript()
  ]
}