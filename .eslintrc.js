module.exports = {
  extends: ['standard', 'plugin:react/recommended'],
  parser: "babel-eslint",
  rules: {
    semi: ['error', 'always'],
    'comma-dangle': ['error', {
      arrays: 'never',
      objects: 'ignore',
      imports: 'never',
      exports: 'never',
      functions: 'ignore',
    }],
    'space-before-function-paren': 0,
  },
};
