import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import type { BadgeProps } from './types';

const DOT_SIZE = 8;
const BADGE_HEIGHT = 18;
const BADGE_OFFSET = -6;

const Badge = memo(function Badge(rawProps: BadgeProps) {
  const props = useComponentDefaults('Badge', rawProps);
  const {
    content,
    badgeContent,
    max = 99,
    visible = true,
    invisible,
    labelColor,
    children,
    anchorOrigin = { vertical: 'top', horizontal: 'right' },
    sx,
    style,
    testID,
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);

  const bgColor = color ?? theme.colorScheme.error;
  const fgColor = labelColor ?? theme.colorScheme.onError;

  const resolvedContent = badgeContent ?? content;
  const isVisible = invisible !== undefined ? !invisible : visible;

  const isDot = resolvedContent === undefined;

  let label = '';
  if (!isDot) {
    if (typeof resolvedContent === 'number' && resolvedContent > max) {
      label = `${max}+`;
    } else {
      label = String(resolvedContent);
    }
  }

  const positionStyle = {
    top: anchorOrigin.vertical === 'top' ? BADGE_OFFSET : undefined,
    bottom: anchorOrigin.vertical === 'bottom' ? BADGE_OFFSET : undefined,
    right: anchorOrigin.horizontal === 'right' ? BADGE_OFFSET : undefined,
    left: anchorOrigin.horizontal === 'left' ? BADGE_OFFSET : undefined,
  };

  return (
    <View style={[styles.wrapper, sxStyle, style]}>
      {children}
      {isVisible ? (
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
