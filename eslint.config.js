import eslint from '@eslint/js';
import hooks from 'eslint-plugin-react-hooks';
import refresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'coverage'] },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  hooks.configs.flat.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { 'react-refresh': refresh },
    rules: { 'react-refresh/only-export-components': ['warn', { allowConstantExport: true }] },
  },
);
