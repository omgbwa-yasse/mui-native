const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

const rootDir = path.resolve(__dirname, '../..');
const showcaseNodeModules = path.resolve(__dirname, 'node_modules');

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
      showcaseNodeModules,
      path.resolve(rootDir, 'node_modules'),
    ],
    resolveRequest: (context, moduleName, platform) => {
      // Force singleton modules to always resolve from showcase's node_modules
      // by pretending the import originates from metro.config.js (in showcase root)
      if (
        moduleName === 'react' ||
        moduleName === 'react-native' ||
        moduleName === 'react-native-reanimated' ||
        moduleName === 'react-native-gesture-handler' ||
        moduleName.startsWith('react/') ||
        moduleName.startsWith('react-native/') ||
        moduleName.startsWith('react-native-reanimated/') ||
        moduleName.startsWith('react-native-gesture-handler/')
      ) {
        return context.resolveRequest(
          { ...context, originModulePath: __filename },
          moduleName,
          platform,
        );
      }
      return context.resolveRequest(context, moduleName, platform);
    },
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
