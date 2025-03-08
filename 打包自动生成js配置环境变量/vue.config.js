const fs = require('fs');
const path = require('path');
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'development') {
      // 开发环境，将环境变量赋值给 window.config
      const configContent = `
        window.config = {
          VUE_APP_TEST: '${process.env.VUE_APP_TEST || 'default_value'}',
          VUE_APP_TEST2: '${process.env.VUE_APP_TEST2 || 'default_value'}'
        };
      `;
      fs.writeFileSync(path.resolve(__dirname, 'dist/config.js'), configContent);
    } else if (process.env.NODE_ENV === 'production') {
      // 生产环境，生成 config.js
      config.plugins.push({
        apply: (compiler) => {
          compiler.hooks.emit.tapAsync('GenerateConfigFile', (compilation, callback) => {
            const configContent = `
              window.config = {
                VUE_APP_TEST: process.env.VUE_APP_TEST || 'default_value',
                VUE_APP_TEST2: process.env.VUE_APP_TEST2 || 'default_value'
              };
            `;
            fs.writeFileSync(path.resolve(__dirname, 'dist/config.js'), configContent);
            callback();
          });
        }
      });
    }
  }
});