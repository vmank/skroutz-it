const scss = require('rollup-plugin-scss');

export default {
  input: 'scripts/src/main.js',
  output: {
    file: 'scripts/dist/bundle.js',
    format: 'esm'
  },
  plugins: [
    scss({
      output: "assets/css/main.css",
      failOnError: true,
    }),
  ]
};