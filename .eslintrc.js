module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/recommended',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // Makes airbnb config respect the rule of 1 indentation in <script> tag in *.vue
    indent: 'off',
    'indent-legacy': ['error', 2],
    'vue/no-v-html': 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
