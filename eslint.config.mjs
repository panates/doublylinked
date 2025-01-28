import panatesEslint from '@panates/eslint-config-ts';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: ['node_modules/**/*'],
  },
  ...panatesEslint.configs.node,
  {
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
];
