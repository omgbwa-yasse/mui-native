import React, { useEffect, useMemo } from 'react';
import { Modal, View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useComponentDefaults } from '../../hooks/useComponentDefaults';
import { useTheme } from '../../theme';
import { useReducedMotionValue } from '../../theme/useReduceMotion';
import { useSx } from '../../hooks/useSx';
import { useColorRole } from '../../hooks/useColorRole';
import type { DialogProps } from './types';

export function Dialog(rawProps: DialogProps): React.ReactElement {
  const props = useComponentDefaults('Dialog', rawProps);
  const {
    visible,
    title,
    children,
    actions,
    onDismiss,
    testID,
    color,
    sx,
    style,
    slots,
    slotProps,
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const { bg, fg, container, onContainer } = useColorRole(color);
  const { colorScheme, shape, typography } = theme;

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);

  const reduceMotion = useReducedMotionValue();

  useEffect(() => {
    if (visible) {
      if (reduceMotion.value) { opacity.value = 1; scale.value = 1; }
      else { opacity.value = withTiming(1, { duration: 300 }); scale.value = withTiming(1, { duration: 300 }); }
    } else {
      if (reduceMotion.value) { opacity.value = 0; scale.value = 0.9; }
      else { opacity.value = withTiming(0, { duration: 200 }); scale.value = withTiming(0.9, { duration: 200 }); }
    }
  }, [visible, opacity, scale, reduceMotion]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const SlotRoot = slots?.Root ?? Animated.View;
  const SlotTitle = slots?.Title ?? Text;
  const SlotContent = slots?.Content ?? View;
  const SlotActions = slots?.Actions ?? View;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        backdrop: {
          flex: 1,
          backgroundColor: `${colorScheme.scrim}52`,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 24,
        },
        container: {
          width: '100%',
          maxWidth: 560,
          backgroundColor: colorScheme.surface,
          borderRadius: shape.extraLarge,
          padding: 24,
          shadowColor: colorScheme.shadow,
          shadowOffset: { width: 0, height: 6 },
          shadowRadius: 10,
          shadowOpacity: 0.15,
          elevation: 6,
        },
        title: {
          ...typography.headlineSmall,
          color: colorScheme.onSurface,
          marginBottom: 16,
        },
        content: {
          marginBottom: 24,
        },
        actionsRow: {
          flexDirection: 'row',
          justifyContent: 'flex-end',
          gap: 8,
        },
        actionText: {
          ...typography.labelLarge,
          color: bg,
          padding: 8,
          minWidth: 64,
          textAlign: 'center',
        },
        actionFilled: {
          backgroundColor: bg,
          borderRadius: shape.full,
          paddingHorizontal: 24,
          paddingVertical: 10,
        },
        actionFilledText: {
          ...typography.labelLarge,
          color: fg,
        },
      }),
    [theme, bg, fg],
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onDismiss}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={onDismiss} accessible={false}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback accessible={false}>
            <SlotRoot
              {...slotProps?.Root}
              style={[styles.container, animatedStyle, sxStyle, style, slotProps?.Root?.style]}
              testID={testID}
              accessibilityRole="alert"
              accessibilityViewIsModal
            >
              <SlotTitle {...slotProps?.Title} style={[styles.title, slotProps?.Title?.style]}>{title}</SlotTitle>
              {children != null && <SlotContent {...slotProps?.Content} style={[styles.content, slotProps?.Content?.style]}>{children}</SlotContent>}
              {actions != null && actions.length > 0 && (
                <SlotActions {...slotProps?.Actions} style={[styles.actionsRow, slotProps?.Actions?.style]}>
                  {actions.map((action, idx) =>
                    action.variant === 'filled' ? (
                      <View key={idx} style={styles.actionFilled}>
                        <Text
                          style={styles.actionFilledText}
                          onPress={action.onPress}
                          accessibilityRole="button"
                          accessibilityLabel={action.label}
                        >
                          {action.label}
                        </Text>
                      </View>
                    ) : (
                      <Text
                        key={idx}
                        style={styles.actionText}
                        onPress={action.onPress}
                        accessibilityRole="button"
                        accessibilityLabel={action.label}
                      >
                        {action.label}
                      </Text>
                    ),
                  )}
                </SlotActions>
              )}
            </SlotRoot>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
