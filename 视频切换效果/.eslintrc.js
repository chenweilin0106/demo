module.exports = {
  root: true,
  env: {
    node: true,
    jquery: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 6,
    sourceType: 'module'
  },
  rules: {
    'no-unneeded-ternary': 0,
    'no-trailing-spaces': 0,
    'space-before-function-paren': 0,
    'no-unused-vars': 'off',
    eqeqeq: 0,
    'space-before-blocks': 0,
    'no-unreachable': 0,
    'vue/multi-word-component-names': 0
    // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
