import React, { useEffect, useMemo } from 'react';
import { Modal, View, Text, TouchableWithoutFeedback, StyleSheet, ScrollView } from 'react-native';
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

/** maxWidth breakpoints (px equivalent, used as dp in RN). */
const MAX_WIDTH_MAP: Record<string, number> = {
  xs: 444,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

export function Dialog(rawProps: DialogProps): React.ReactElement {
  const props = useComponentDefaults('Dialog', rawProps);
  const {
    visible,
    open,
    fullScreen = false,
    fullWidth = false,
    maxWidth = 'sm',
    scroll = 'paper',
    title,
    children,
    actions,
    onDismiss,
    onClose,
    testID,
    color,
    sx,
    style,
    slots,
    slotProps,
  } = props;
  const { theme } = useTheme();
  const sxStyle = useSx(sx, theme);
  const { bg, fg } = useColorRole(color);
  const { colorScheme, shape, typography } = theme;

  // Resolve MUI-idiomatic `open` alias â†’ `visible`
  const isVisible = open ?? visible;

  // Resolve `onClose` â†’ `onDismiss` alias with reason code
  const handleDismiss = () => {
    onClose?.('backdropPress');
    onDismiss?.();
  };
  const handleBackPress = () => {
    onClose?.('hardwareBackPress');
    onDismiss?.();
  };

  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.9);

  const reduceMotion = useReducedMotionValue();

  useEffect(() => {
    if (isVisible) {
      if (reduceMotion.value) { opacity.value = 1; scale.value = 1; }
      else { opacity.value = withTiming(1, { duration: 300 }); scale.value = withTiming(1, { duration: 300 }); }
    } else {
      if (reduceMotion.value) { opacity.value = 0; scale.value = 0.9; }
      else { opacity.value = withTiming(0, { duration: 200 }); scale.value = withTiming(0.9, { duration: 200 }); }
    }
  }, [isVisible, opacity, scale, reduceMotion]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  const SlotRoot = slots?.Root ?? Animated.View;
  const SlotTitle = slots?.Title ?? Text;
  const SlotContent = slots?.Content ?? View;
  const SlotActions = slots?.Actions ?? View;

  // Compute resolved maxWidth dp value
  const resolvedMaxWidth: number | undefined =
    fullScreen ? undefined :
    maxWidth === false ? undefined :
    fullWidth ? (MAX_WIDTH_MAP[maxWidth] ?? 560) :
    560;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        backdrop: {
          flex: 1,
          backgroundColor: `${colorScheme.scrim}52`,
          justifyContent: 'center',
          alignItems: 'center',
          ...(fullScreen ? {} : { padding: 24 }),
        },
        container: {
          ...(fullScreen
            ? { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }
            : {
                width: fullWidth ? '100%' : undefined,
                maxWidth: resolvedMaxWidth ?? 560,
              }),
          backgroundColor: colorScheme.surface,
          borderRadius: fullScreen ? 0 : shape.extraLarge,
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
    [theme, bg, fg, fullScreen, fullWidth, resolvedMaxWidth],
  );

  const dialogContent = (
    <TouchableWithoutFeedback accessible={false}>
      <SlotRoot
        {...slotProps?.Root}
        style={[styles.container, animatedStyle, sxStyle, style, slotProps?.Root?.style]}
        testID={testID}
        accessibilityRole="alert"
        accessibilityViewIsModal
      >
        <SlotTitle {...slotProps?.Title} style={[styles.title, slotProps?.Title?.style]}>{title}</SlotTitle>
        {children != null && (
          scroll === 'paper' ? (
            <ScrollView>
              <SlotContent {...slotProps?.Content} style={[styles.content, slotProps?.Content?.style]}>{children}</SlotContent>
            </ScrollView>
          ) : (
            <SlotContent {...slotProps?.Content} style={[styles.content, slotProps?.Content?.style]}>{children}</SlotContent>
          )
        )}
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
  );

  const innerContent =
    scroll === 'body' ? (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.backdrop}>{dialogContent}</View>
      </ScrollView>
    ) : (
      <View style={styles.backdrop}>{dialogContent}</View>
    );

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="none"
      onRequestClose={handleBackPress}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback testID={testID ? `${testID}-backdrop` : undefined} onPress={handleDismiss} accessible={false}>
        {innerContent}
      </TouchableWithoutFeedback>
    </Modal>
  );
}
