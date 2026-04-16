import React from 'react';
import { ScrollView } from 'react-native';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { RefreshControl } from '../../../src/components/RefreshControl';
import {
  PixelRatio,
  AccessibilityInfo,
  AppRegistry,
  Easing,
  InteractionManager,
  NativeEventEmitter,
  NativeModules,
  PanResponder,
  Share,
  useWindowDimensions,
} from 'react-native';

function Wrapper({ children }: { children: React.ReactNode }): React.ReactElement {
  return <ThemeProvider>{children}</ThemeProvider>;
}

describe('RefreshControl', () => {
  it('renders with required refreshing={false}', () => {
    const { toJSON } = render(
      <Wrapper>
        <ScrollView
          refreshControl={<RefreshControl refreshing={false} />}
        />
      </Wrapper>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with refreshing={true}', () => {
    const { toJSON } = render(
      <Wrapper>
        <ScrollView
          refreshControl={<RefreshControl refreshing={true} />}
        />
      </Wrapper>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('accepts onRefresh callback', () => {
    const onRefresh = jest.fn();
    const { toJSON } = render(
      <Wrapper>
        <ScrollView
          refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}
        />
      </Wrapper>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('accepts testID prop', () => {
    const { toJSON } = render(
      <Wrapper>
        <ScrollView
          refreshControl={<RefreshControl refreshing={false} testID="refresh-control" />}
        />
      </Wrapper>,
    );
    expect(toJSON()).toBeTruthy();
  });
});

describe('RN utility API re-exports', () => {
  it('exports PixelRatio with get() method', () => {
    expect(PixelRatio).toBeDefined();
    expect(typeof PixelRatio.get).toBe('function');
  });

  it('exports AccessibilityInfo with isScreenReaderEnabled', () => {
    expect(AccessibilityInfo).toBeDefined();
    expect(typeof AccessibilityInfo.isScreenReaderEnabled).toBe('function');
  });

  it('exports AppRegistry with registerComponent', () => {
    expect(AppRegistry).toBeDefined();
    expect(typeof AppRegistry.registerComponent).toBe('function');
  });

  it('exports Easing with linear function', () => {
    expect(Easing).toBeDefined();
    expect(typeof Easing.linear).toBe('function');
  });

  it('exports InteractionManager with runAfterInteractions', () => {
    expect(InteractionManager).toBeDefined();
    expect(typeof InteractionManager.runAfterInteractions).toBe('function');
  });

  it('exports NativeEventEmitter as a constructor', () => {
    expect(NativeEventEmitter).toBeDefined();
    expect(typeof NativeEventEmitter).toBe('function');
  });

  it('exports NativeModules as an object', () => {
    expect(NativeModules).toBeDefined();
    expect(typeof NativeModules).toBe('object');
  });

  it('exports PanResponder with create method', () => {
    expect(PanResponder).toBeDefined();
    expect(typeof PanResponder.create).toBe('function');
  });

  it('exports Share with share method', () => {
    expect(Share).toBeDefined();
    expect(typeof Share.share).toBe('function');
  });

  it('exports useWindowDimensions as a function', () => {
    expect(typeof useWindowDimensions).toBe('function');
  });
});
