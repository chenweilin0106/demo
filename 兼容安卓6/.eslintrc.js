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
    indent: ['error', 2],
    'space-before-function-paren': 0,
    eqeqeq: 0,
    'space-before-blocks': 0,
    'no-unreachable': 0,
    'vue/multi-word-component-names': 0,
    // == class 方法之间空1行
    'lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true }
    ]
    // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
