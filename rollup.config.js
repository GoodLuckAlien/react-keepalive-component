import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import { uglify } from 'rollup-plugin-uglify'

export default [
    {
      input: 'src/index.js',
      output: {
        name: 'keepaliveComponent',
        file: 'lib/index.js',
        format: 'cjs',
        sourcemap: true
      },
      external: [
        'react',
        'react-dom',
        'invariant',
        'hoist-non-react-statics'
      ],
      plugins: [
        resolve(),
        babel({
          exclude: 'node_modules/**'
        })
      ]
    },
    /* 压缩` */
    {
      input: 'src/index.js',
      output: {
        name: 'keepaliveComponent',
        file: 'lib/index.min.js',
        format: 'umd'
      },
      external: [
        'react',
        'react-dom',
        'invariant',
        'hoist-non-react-statics'
      ],
      plugins: [
        resolve(),
        babel({
          exclude: 'node_modules/**'
        }),
        uglify()
      ]
    }
  ]