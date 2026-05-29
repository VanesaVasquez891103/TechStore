import { Platform } from 'react-native';

export const colors = {
  background: '#F5F7FA',
  surface: '#FFFFFF',
  surfaceSoft: '#EEF3F8',
  primary: '#0B4F8A',
  primaryDark: '#073B68',
  accent: '#0F9F7A',
  accentDark: '#087A5C',
  navy: '#0F172A',
  success: '#0F9F7A',
  danger: '#E5484D',
  text: '#111827',
  muted: '#64748B',
  border: '#E2E8F0',
  warning: '#F59E0B',
};

export const fontFamily = Platform.select({
  web: 'Inter, Poppins, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  ios: 'Inter',
  android: 'sans-serif',
  default: undefined,
});

export const typography = {
  title: {
    fontFamily,
    fontWeight: '800' as const,
    color: colors.text,
  },
  body: {
    fontFamily,
    color: colors.text,
  },
};

export const radii = {
  sm: 8,
  md: 12,
  lg: 18,
  xl: 24,
  pill: 999,
};

export const shadows = {
  card: {
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  soft: {
    shadowColor: '#0F172A',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
};

export const sharedStyles = {
  input: {
    ...typography.body,
    backgroundColor: colors.surface,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    fontSize: 15,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
};
