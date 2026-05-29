import React from 'react';
import { Pressable, PressableProps, StyleSheet, Text, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radii, shadows, typography } from '../styles/theme';

type Variant = 'primary' | 'secondary' | 'danger';

interface Props extends Omit<PressableProps, 'style'> {
  title: string;
  icon?: React.ComponentProps<typeof Ionicons>['name'];
  variant?: Variant;
  style?: ViewStyle;
}

export function AppButton({ title, icon, variant = 'primary', disabled, style, ...props }: Props) {
  const iconColor = variant === 'secondary' ? colors.primary : colors.surface;

  return (
    <Pressable
      {...props}
      disabled={disabled}
      style={state => [
        styles.base,
        styles[variant],
        disabled && styles.disabled,
        (state.pressed || Boolean((state as { hovered?: boolean }).hovered)) && !disabled && styles.active,
        style,
      ]}
    >
      {icon ? <Ionicons name={icon} size={18} color={iconColor} style={styles.icon} /> : null}
      <Text style={[styles.text, variant === 'secondary' && styles.secondaryText, variant === 'danger' && styles.dangerText]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    borderRadius: radii.md,
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: 48,
    paddingHorizontal: 18,
    paddingVertical: 13,
    ...shadows.soft,
  },
  icon: {
    marginRight: 8,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
  },
  danger: {
    backgroundColor: colors.danger,
  },
  active: {
    opacity: 0.86,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.55,
  },
  secondaryText: {
    color: colors.primary,
  },
  dangerText: {
    color: colors.surface,
  },
  text: {
    ...typography.body,
    color: colors.surface,
    fontSize: 15,
    fontWeight: '800',
  },
});
