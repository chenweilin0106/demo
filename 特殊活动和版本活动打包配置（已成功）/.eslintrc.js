module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 12,
    sourceType: 'module',
    requireConfigFile: false
  },
  plugins: ['vue'],
  rules: {
    eqeqeq: 0,
    'space-before-function-paren': 0,
    indent: 0,
    camelcase: 0,
    'dot-notation': 0
  }
}
