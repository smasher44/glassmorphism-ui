import type { ReactNode } from 'react';
import { memo, useCallback, useMemo } from 'react';
import { StyleSheet, Text, type TextProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export const ThemedText = memo(({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps): ReactNode => {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  const getTypeStyle = useCallback((textType: string) => {
    switch (textType) {
      case 'default':
        return styles.default;
      case 'title':
        return styles.title;
      case 'defaultSemiBold':
        return styles.defaultSemiBold;
      case 'subtitle':
        return styles.subtitle;
      case 'link':
        return styles.link;
      default:
        return styles.default;
    }
  }, []);

  const textStyle = useMemo(() => [
    { color },
    getTypeStyle(type ?? 'default'),
    style,
  ], [color, getTypeStyle, type, style]);

  return (
    <Text
      style={textStyle}
      {...rest}
    />
  );
});

ThemedText.displayName = 'ThemedText';

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: '#0a7ea4',
  },
});
