const path = require('node:path')

module.exports = {
  plugins: {
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
      features: {
        'nesting-rules': true,
        'custom-media-queries': {
          importFrom: {
            from: path.join(__dirname, 'src/layouts/App/global.scss'),
            type: 'css',
          },
        },
      },
    },
  },
}
