import tseslint from 'typescript-eslint';
import eslintJs from '@eslint/js';
import { n8nCommunityNodesPlugin } from '@n8n/eslint-plugin-community-nodes';
import n8nNodesBase from 'eslint-plugin-n8n-nodes-base';

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  
  // Base TypeScript rules
  {
    files: ['**/*.ts'],
    extends: [
      eslintJs.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    rules: {
      'prefer-spread': 'off',
      'no-console': 'error',
    },
  },

  // n8n Cloud compatibility rules (strict mode)
  {
    files: ['**/*.ts'],
    ...n8nCommunityNodesPlugin.configs.recommended,
  },

  // n8n credential rules
  {
    files: ['credentials/**/*.ts'],
    plugins: { 'n8n-nodes-base': n8nNodesBase },
    rules: {
      ...n8nNodesBase.configs.credentials.rules,
    },
  },

  // n8n node rules
  {
    files: ['nodes/**/*.ts'],
    plugins: { 'n8n-nodes-base': n8nNodesBase },
    rules: {
      ...n8nNodesBase.configs.nodes.rules,
    },
  },

  // Test files - disable Cloud restrictions
  {
    files: ['__tests__/**/*.ts', '**/*.test.ts', '**/*.spec.ts'],
    rules: {
      '@n8n/community-nodes/no-restricted-imports': 'off',
      '@n8n/community-nodes/no-restricted-globals': 'off',
    },
  },
);