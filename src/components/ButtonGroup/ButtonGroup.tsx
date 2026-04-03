import React, { Children } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { ButtonGroupContext } from './ButtonGroupContext';
import type { ButtonGroupProps } from './types';

export function ButtonGroup({
  variant,
  orientation = 'horizontal',
  disabled = false,
  size,
  children,
  testID,
}: ButtonGroupProps) {
  const { theme } = useTheme();
  const isHorizontal = orientation === 'horizontal';
  const childArray = Children.toArray(children);
  const count = childArray.length;

  return (
    <ButtonGroupContext.Provider
      value={{ variant, disabled, size, orientation, count }}
    >
      <View
        style={[
          styles.container,
          isHorizontal ? styles.row : styles.column,
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
