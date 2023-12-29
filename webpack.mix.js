const mix = require('laravel-mix');

mix
  .js('./src/main.js', 'dist/app.bundle.js')
  .react()
  .sass('./src/scss/main.scss', 'css/app.bundle.css')
  .setPublicPath('dist')