import babel from 'rollup-plugin-babel'
import extensions from 'rollup-plugin-extensions'

export default {
  input: 'src/index.ts',
  output: {
    file: 'build/bundle.js',
    format: 'cjs',
  },
  external: ['stream'],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      extensions: ['.ts', '.js'],
    }),
    extensions({
      extensions: ['.ts', '.js'],
    }),
  ],
}
