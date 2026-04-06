/**
 * React Native CLI configuration for the showcase app.
 *
 * react-native-vector-icons lives only in the root node_modules but does NOT
 * need a native module bridge — icon glyphs render via font files in
 * android/app/src/main/assets/fonts/.  Disable native autolinking to prevent
 * CMake from trying to include codegen JNI artifacts that don't exist there.
 */
module.exports = {
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        android: null,
        ios: null,
      },
    },
  },
};
