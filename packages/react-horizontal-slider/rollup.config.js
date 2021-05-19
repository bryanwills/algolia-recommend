import { plugins } from '../../rollup.base.config';

import pkg from './package.json';

if (!process.env.BUILD) {
  throw new Error('The `BUILD` environment variable is required to build.');
}

export default {
  input: pkg.source,
  external: ['react', 'react-dom'],
  output: {
    file: pkg['umd:main'],
    name: pkg.name,
    format: 'umd',
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
    sourcemap: true,
  },
  plugins,
};