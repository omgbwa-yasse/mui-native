import React from 'react';
import { Text, BackHandler, PermissionsAndroid, ToastAndroid, ActionSheetIOS } from 'react-native';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../../src/theme/ThemeProvider';
import { DrawerLayoutAndroid } from '../../../src/components/DrawerLayoutAndroid';

function Wrapper({ children }: { children: React.ReactNode }): React.ReactElement {
  return <ThemeProvider>{children}</ThemeProvider>;
}

const renderNavView = () => <Text>Nav</Text>;

describe('DrawerLayoutAndroid', () => {
  it('renders with required renderNavigationView prop', () => {
    const { toJSON } = render(
      <Wrapper>
        <DrawerLayoutAndroid renderNavigationView={renderNavView}>
          <Text>Main content</Text>
        </DrawerLayoutAndroid>
      </Wrapper>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders children', () => {
    const { getByText } = render(
      <Wrapper>
        <DrawerLayoutAndroid renderNavigationView={renderNavView}>
          <Text>hello drawer</Text>
        </DrawerLayoutAndroid>
      </Wrapper>,
    );
    expect(getByText('hello drawer')).toBeTruthy();
  });

  it('renders with testID prop (smoke test)', () => {
    const { toJSON } = render(
      <Wrapper>
        <DrawerLayoutAndroid testID="drawer-android" renderNavigationView={renderNavView}>
          <Text>content</Text>
        </DrawerLayoutAndroid>
      </Wrapper>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with drawerPosition prop without error', () => {
    const { toJSON } = render(
      <Wrapper>
        <DrawerLayoutAndroid
          renderNavigationView={renderNavView}
          drawerPosition="right"
        >
          <Text>content</Text>
        </DrawerLayoutAndroid>
      </Wrapper>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('renders with drawerWidth prop without error', () => {
    const { toJSON } = render(
      <Wrapper>
        <DrawerLayoutAndroid
          renderNavigationView={renderNavView}
          drawerWidth={280}
        >
          <Text>content</Text>
        </DrawerLayoutAndroid>
      </Wrapper>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('applies sx style', () => {
    const { toJSON } = render(
      <Wrapper>
        <DrawerLayoutAndroid
          renderNavigationView={renderNavView}
          sx={{ backgroundColor: 'purple' }}
        >
          <Text>content</Text>
        </DrawerLayoutAndroid>
      </Wrapper>,
    );
    expect(JSON.stringify(toJSON())).toContain('purple');
  });

  it('accepts onDrawerOpen callback prop without error', () => {
    const onOpen = jest.fn();
    const { toJSON } = render(
      <Wrapper>
        <DrawerLayoutAndroid
          renderNavigationView={renderNavView}
          onDrawerOpen={onOpen}
        >
          <Text>content</Text>
        </DrawerLayoutAndroid>
      </Wrapper>,
    );
    expect(toJSON()).toBeTruthy();
  });
});

describe('Android/iOS platform APIs', () => {
  it('exports BackHandler', () => {
    expect(BackHandler).toBeDefined();
  });

  it('exports PermissionsAndroid', () => {
    expect(PermissionsAndroid).toBeDefined();
  });

  it('exports ToastAndroid', () => {
    expect(ToastAndroid).toBeDefined();
  });

  it('exports ActionSheetIOS', () => {
    expect(ActionSheetIOS).toBeDefined();
  });
});
