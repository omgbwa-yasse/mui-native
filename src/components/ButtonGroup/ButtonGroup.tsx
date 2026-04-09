import React, { Children } from 'react';
import { View, StyleSheet } from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import { ButtonGroupContext } from './ButtonGroupContext';
import { SizeProvider } from './SizeContext';
import type { ButtonGroupProps } from './types';

export function ButtonGroup(rawProps: ButtonGroupProps) {
  const props = useComponentDefaults('ButtonGroup', rawProps);
  const {
    variant,
    orientation = 'horizontal',
    disabled = false,
    size,
    children,
    testID,
    sx,
    style,
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const isHorizontal = orientation === 'horizontal';
  const childArray = Children.toArray(children);
  const count = childArray.length;

  return (
    <ButtonGroupContext.Provider
      value={{ variant, disabled, size, orientation, count }}
    >
      <SizeProvider value={size ?? 'medium'}>
      <View
        style={[
          styles.container,
          isHorizontal ? styles.row : styles.column,
          sxStyle,
          style,
        ]}
        testID={testID}
      >
        {childArray.map((child, index) => {
          const isFirst = index === 0;
          const isLast = index === count - 1;

          return (
            <React.Fragment key={index}>
              {!isFirst && (
                <View
                  style={[
                    isHorizontal ? styles.dividerV : styles.dividerH,
                    { backgroundColor: theme.colorScheme.outline },
                  ]}
                />
              )}
              <View
                style={[
                  styles.childWrapper,
                  isHorizontal
                    ? {
                        borderTopLeftRadius: isFirst ? (theme.shape.small ?? 4) : 0,
                        borderBottomLeftRadius: isFirst ? (theme.shape.small ?? 4) : 0,
                        borderTopRightRadius: isLast ? (theme.shape.small ?? 4) : 0,
                        borderBottomRightRadius: isLast ? (theme.shape.small ?? 4) : 0,
                      }
                    : {
                        borderTopLeftRadius: isFirst ? (theme.shape.small ?? 4) : 0,
                        borderTopRightRadius: isFirst ? (theme.shape.small ?? 4) : 0,
                        borderBottomLeftRadius: isLast ? (theme.shape.small ?? 4) : 0,
                        borderBottomRightRadius: isLast ? (theme.shape.small ?? 4) : 0,
                      },
                ]}
              >
                {child}
              </View>
            </React.Fragment>
          );
        })}
      </View>
      </SizeProvider>
    </ButtonGroupContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  childWrapper: {
    overflow: 'hidden',
  },
  dividerV: {
    width: 1,
    alignSelf: 'stretch',
  },
  dividerH: {
    height: 1,
    alignSelf: 'stretch',
  },
});
