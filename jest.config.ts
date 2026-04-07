import type { Config } from 'jest';

const config: Config = {
  preset: 'react-native',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@material/material-color-utilities|react-native|@react-native|react-native-reanimated|react-native-gesture-handler|react-native-vector-icons|@react-native-vector-icons|@testing-library)/)',
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    '^mui-native/(.*)$': '<rootDir>/src/$1',
    '^@mui-native(.*)$': '<rootDir>/src$1',
    '^react-native-svg$': '<rootDir>/__mocks__/react-native-svg.tsx',
  },
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    'react-native-gesture-handler/jestSetup',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/lib/', 'apps/showcase/tests/unit/', 'apps/showcase/tests/integration/navigation'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.stories.{ts,tsx}', '!src/**/index.ts'],
};

export default config;
