import type { StorybookConfig } from '@storybook/react-native';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-native',
    options: {},
  },
};

export default config;
