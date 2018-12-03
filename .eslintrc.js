module.exports = {
  extends: ['standard', 'plugin:react/recommended'],
  rules: {
    semi: ['error', 'always'],
    'comma-dangle': ['error', {
      arrays: 'never',
      objects: 'always',
      imports: 'never',
      exports: 'never',
      functions: 'ignore',
    }],
  },
};
