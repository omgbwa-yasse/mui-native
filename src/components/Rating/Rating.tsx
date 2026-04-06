import React, { memo, useCallback, useState } from 'react';
import type { AccessibilityRole } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import { useColorRole } from '../../hooks/useColorRole';
import { Icon } from '../Icon/Icon';
import { TouchableRipple } from '../TouchableRipple/TouchableRipple';
import type { RatingProps } from './types';

const SIZE_MAP = { small: 16, medium: 24, large: 32 } as const;

const FILLED_STAR = '★';
const EMPTY_STAR = '☆';

const Rating = memo(function Rating(rawProps: RatingProps) {
  const props = useComponentDefaults('Rating', rawProps);
  const {
    value,
    onValueChange,
    max = 5,
    precision = 1,
    disabled = false,
    readOnly = false,
    size = 'medium',
    icon,
    emptyIcon,
    testID,
    color,
    sx,
    style,
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const { bg, fg, container, onContainer } = useColorRole(color);
  const [internalValue, setInternalValue] = useState<number>(0);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;
  const starSize = SIZE_MAP[size];
  const isInteractive = !disabled && !readOnly;

  const handlePress = useCallback(
    (starIndex: number, isHalf: boolean) => {
      if (!isInteractive) return;
      const newValue = precision === 0.5 && isHalf ? starIndex + 0.5 : starIndex + 1;
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [isInteractive, isControlled, onValueChange, precision],
  );

  return (
    <View
      style={[styles.container, sxStyle, style]}
      accessibilityRole={'adjustable' as AccessibilityRole}
      accessibilityValue={{ min: 0, max, now: currentValue }}
      testID={testID}
    >
      {Array.from({ length: max }, (_, i) => {
        const filled = currentValue >= i + 1;
        const halfFilled = precision === 0.5 && currentValue >= i + 0.5 && currentValue < i + 1;
        const isEmpty = !filled && !halfFilled;

        if (precision === 0.5) {
          return (
            <View key={i} style={styles.starWrapper}>
              {/* Left half — A11Y-NOTE: width=starSize/2 is below 48dp per half-star UX constraint; height ≥48dp via TouchableRipple default */}
              {isInteractive ? (
                <TouchableRipple
                  style={{ width: starSize / 2, overflow: 'hidden' }}
                  onPress={() => handlePress(i, true)}
                  accessibilityLabel={`Rate ${i + 0.5} out of ${max}`}
                  accessibilityRole="button"
                >
                  <View style={{ width: starSize, height: starSize }}>
                    {icon && !isEmpty && !halfFilled ? (
                      <Icon source={icon} size={starSize} color={bg} />
                    ) : emptyIcon && isEmpty ? (
                      <Icon source={emptyIcon} size={starSize} color={theme.colorScheme.onSurfaceVariant} />
                    ) : (
                      <Text style={{ fontSize: starSize, color: halfFilled || filled ? bg : theme.colorScheme.onSurfaceVariant }}>
                        {halfFilled || filled ? FILLED_STAR : EMPTY_STAR}
                      </Text>
                    )}
                  </View>
                </TouchableRipple>
              ) : (
                <View style={{ width: starSize / 2, height: starSize, overflow: 'hidden' }}>
                  <Text style={{ fontSize: starSize, color: halfFilled || filled ? bg : theme.colorScheme.onSurfaceVariant }}>
                    {halfFilled || filled ? FILLED_STAR : EMPTY_STAR}
                  </Text>
                </View>
              )}
              {/* Right half — A11Y-NOTE: width=starSize/2 is below 48dp per half-star UX constraint; height ≥48dp via TouchableRipple default */}
              {isInteractive ? (
                <TouchableRipple
                  style={{ width: starSize / 2 }}
                  onPress={() => handlePress(i, false)}
                  accessibilityLabel={`Rate ${i + 1} out of ${max}`}
                  accessibilityRole="button"
                >
                  <View />
                </TouchableRipple>
              ) : (
                <View style={{ width: starSize / 2, height: starSize }} />
              )}
            </View>
          );
        }

        // precision = 1
        const starColor = filled ? bg : theme.colorScheme.onSurfaceVariant;
        const starContent = filled ? (icon ? (
          <Icon source={icon} size={starSize} color={bg} />
        ) : (
          <Text style={{ fontSize: starSize, color: starColor }}>{FILLED_STAR}</Text>
        )) : (emptyIcon ? (
          <Icon source={emptyIcon} size={starSize} color={theme.colorScheme.onSurfaceVariant} />
        ) : (
          <Text style={{ fontSize: starSize, color: starColor }}>{EMPTY_STAR}</Text>
        ));

        return isInteractive ? (
          <TouchableRipple
            key={i}
            style={styles.starBtn}
            onPress={() => handlePress(i, false)}
            accessibilityLabel={`Rate ${i + 1} out of ${max}`}
            accessibilityRole="button"
          >
            {starContent}
          </TouchableRipple>
        ) : (
          <View key={i} style={styles.starBtn}>
            {starContent}
          </View>
        );
      })}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starWrapper: {
    flexDirection: 'row',
  },
  starBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
  },
});

export { Rating };
