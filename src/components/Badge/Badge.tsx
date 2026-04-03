import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import type { BadgeProps } from './types';

const DOT_SIZE = 8;
const BADGE_HEIGHT = 18;
const BADGE_OFFSET = -6;

const Badge = memo(function Badge({
  content,
  max = 99,
  visible = true,
  color,
  labelColor,
  children,
  anchorOrigin = { vertical: 'top', horizontal: 'right' },
  testID,
}: BadgeProps) {
  const { theme } = useTheme();

  const bgColor = color ?? theme.colorScheme.error;
  const fgColor = labelColor ?? theme.colorScheme.onError;

  const isDot = content === undefined;

  let label = '';
  if (!isDot) {
    if (typeof content === 'number' && content > max) {
      label = `${max}+`;
    } else {
      label = String(content);
    }
  }

  const positionStyle = {
    top: anchorOrigin.vertical === 'top' ? BADGE_OFFSET : undefined,
    bottom: anchorOrigin.vertical === 'bottom' ? BADGE_OFFSET : undefined,
    right: anchorOrigin.horizontal === 'right' ? BADGE_OFFSET : undefined,
    left: anchorOrigin.horizontal === 'left' ? BADGE_OFFSET : undefined,
  };

  return (
    <View style={styles.wrapper}>
      {children}
      {visible ? (
        <View
          style={[
            isDot ? styles.dot : styles.badge,
            { backgroundColor: bgColor },
            positionStyle,
          ]}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          testID={testID}
        >
          {!isDot && (
            <Text style={[styles.label, { color: fgColor }]} numberOfLines={1}>
              {label}
            </Text>
          )}
        </View>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    alignSelf: 'flex-start',
  },
  dot: {
    position: 'absolute',
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
  },
  badge: {
    position: 'absolute',
    height: BADGE_HEIGHT,
    minWidth: BADGE_HEIGHT,
    borderRadius: BADGE_HEIGHT / 2,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    lineHeight: 13,
  },
});

export { Badge };
