import React, { memo } from 'react';
import { Platform, View } from 'react-native';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useSx } from '../../hooks/useSx';
import { useColorRole } from '../../hooks/useColorRole';
import type { PaperProps, PaperElevation } from './types';

type ElevationKey = `level${PaperElevation}`;

/** MD3 tint opacities per elevation level (surface + primary overlay) */
const TINT_OPACITIES: Record<PaperElevation, number> = {
  0: 0,
  1: 0.05,
  2: 0.08,
  3: 0.11,
  4: 0.12,
  5: 0.14,
};

const Paper = memo<PaperProps>(function Paper(rawProps: PaperProps) {
  const props = useComponentDefaults('Paper', rawProps);
  const {
    elevation: elevationProp = 1,
    mode = 'elevated',
    square = false,
    borderRadius: borderRadiusProp,
    style,
    children,
    color,
    sx,
    ...rest
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const { bg, fg, container, onContainer } = useColorRole(color);
  const cs = theme.colorScheme;
  const elevLevel: ElevationKey = `level${elevationProp}`;
  const elevData = theme.elevation[elevLevel];
  const borderRadius =
    borderRadiusProp !== undefined
      ? borderRadiusProp
      : square
      ? 0
      : theme.shape.medium;

  const isElevated = mode === 'elevated';
  const tintOpacity = TINT_OPACITIES[elevationProp];

  const shadowStyle =
    isElevated && elevationProp > 0
      ? Platform.select({
          ios: {
            shadowColor: cs.shadow,
            shadowOffset: { width: elevData.shadowOffsetX, height: elevData.shadowOffsetY },
            shadowRadius: elevData.shadowRadius,
            shadowOpacity: elevData.shadowOpacity,
          },
          android: {
            elevation: elevData.elevation,
          },
          default: {},
        })
      : {};

  return (
    <View
      style={[
        {
          backgroundColor: cs.surface,
          borderRadius,
          overflow: 'hidden',
        },
        shadowStyle,
        mode === 'flat' || !isElevated
          ? { borderWidth: 1, borderColor: cs.outline }
          : undefined,
        sxStyle,
        style,
      ]}
      {...rest}
    >
      {/* MD3 elevation tint overlay */}
      {tintOpacity > 0 && isElevated && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: cs.primary,
            opacity: tintOpacity,
            pointerEvents: 'none',
          }}
          pointerEvents="none"
        />
      )}
      {children}
    </View>
  );
});

import { StyleSheet } from 'react-native';

export { Paper };
