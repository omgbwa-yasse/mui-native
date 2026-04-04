const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

const rootDir = path.resolve(__dirname, '../..');

/**
 * Metro configuration for MUI-Native showcase app.
 * Resolves `mui-native` from the local workspace ../../src so the showcase
 * consumes the library sources directly without a separate build step.
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  watchFolders: [rootDir],

  resolver: {
    extraNodeModules: {
      'mui-native': path.resolve(rootDir, 'src'),
      '@mui-native': path.resolve(rootDir, 'src'),
    },
    nodeModulesPaths: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(rootDir, 'node_modules'),
    ],
  },

  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
