const withCss = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');

module.exports = withSass(
  withCss({
    webpack(config) {
      config.module.rules.push({
        test: /\.csv$/,
        loader: 'csv-loader',
        options: {
          dynamicTyping: true,
          header: true,
          skipEmptyLines: true,
        },
      });

      return config;
    },
  }),
);
