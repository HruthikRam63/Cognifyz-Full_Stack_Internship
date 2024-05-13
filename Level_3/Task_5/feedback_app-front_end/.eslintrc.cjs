module.exports = {
  root: true, // Indicates that ESLint should stop looking for configuration files in parent directories
  env: { browser: true, es2020: true }, // Sets the environment to browser and ES2020
  extends: [ // Extends the configurations from the following sources
    'eslint:recommended', // Uses ESLint's recommended rules
    'plugin:react/recommended', // Uses recommended rules for React
    'plugin:react/jsx-runtime', // Uses recommended rules for JSX runtime
    'plugin:react-hooks/recommended', // Uses recommended rules for React hooks
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'], // Ignores certain files and directories from linting
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' }, // Specifies ECMAScript version and source type
  settings: { react: { version: '18.2' } }, // Configures settings related to React
  plugins: ['react-refresh'], // Adds the react-refresh plugin
  rules: { // Specifies ESLint rules
    'react/jsx-no-target-blank': 'off', // Disables the rule preventing the use of target="_blank" in JSX
    'react-refresh/only-export-components': [ // Specifies rules for react-refresh plugin
      'warn', // Specifies the severity level as warning
      { allowConstantExport: true }, // Allows constant export of components
    ],
  },
};
