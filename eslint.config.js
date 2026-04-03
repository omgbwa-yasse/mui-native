// @ts-check
const tseslint = require('typescript-eslint');
const reactNativePlugin = require('eslint-plugin-react-native');
const reactHooksPlugin = require('eslint-plugin-react-hooks');

/**
 * Custom rule: ban 'left' / 'right' as explicit style values.
 * Rule ID: local/no-left-right-style
 *
 * Rationale (R-03): RTL layout must use 'start'/'end' logical properties
 * instead of 'left'/'right' to support bidirectional text properly.
 */
const noLeftRightStyleRule = {
  // @ts-ignore: custom rule definition
  create(context) {
    const BANNED = new Set(['left', 'right']);
    const STYLE_PROPS = new Set([
      'textAlign', 'alignSelf', 'justifyContent', 'alignItems',
      'flexDirection', 'position', 'borderStyle',
    ]);
    return {
      Property(node) {
        if (
          STYLE_PROPS.has(node.key?.name ?? node.key?.value ?? '') &&
          node.value?.type === 'Literal' &&
          BANNED.has(node.value.value)
        ) {
          context.report({
            node,
            message: `Avoid '${node.value.value}': use logical property ('start'/'end') for RTL support.`,
          });
        }
      },
    };
  },
};

module.exports = [
  {
    ignores: ['lib/**', 'node_modules/**', '*.config.js', '*.config.ts', 'coverage/**'],
  },
  // TypeScript strict rules
  ...tseslint.configs.strict.map((c) => ({ ...c, files: ['**/*.{ts,tsx}'] })),
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      'react-native': reactNativePlugin,
      'react-hooks': reactHooksPlugin,
      // Inline plugin for the custom RTL rule
      local: {
        rules: {
          'no-left-right-style': noLeftRightStyleRule,
        },
      },
    },
    rules: {
      // RTL safety — ban left/right style values
      'local/no-left-right-style': 'error',
      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // React Native specific
      'react-native/no-unused-styles': 'warn',
      'react-native/no-inline-styles': 'warn',
      'react-native/no-color-literals': 'warn',
      // TypeScript
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
    },
  },
];

