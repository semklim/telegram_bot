import antfu from '@antfu/eslint-config';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default antfu({
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
    semi: true,
  },
  plugins: {
    'simple-import-sort': simpleImportSort,
  },
  rules: {
    'import/prefer-default-export': 'off', // Named export is easier to refactor automatically
    'simple-import-sort/imports': 'error', // Import configuration for `eslint-plugin-simple-import-sort`
    'simple-import-sort/exports': 'error', // Export configuration for `eslint-plugin-simple-import-sort`
    'import/order': 'off', // Avoid conflict rule between `eslint-plugin-import` and `eslint-plugin-simple-import-sort`
    'import/no-extraneous-dependencies': 'warn',
    'import/extensions': 'off', // Avoid missing file extension errors, TypeScript already provides a similar feature
  },
});
