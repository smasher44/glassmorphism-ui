import type { ReactNode } from 'react';
import { memo, useMemo } from 'react';
import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export const ThemedView = memo(({ 
  style, 
  lightColor, 
  darkColor, 
  ...otherProps 
}: ThemedViewProps): ReactNode => {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  const viewStyle = useMemo(() => [{ backgroundColor }, style], [backgroundColor, style]);

  return <View style={viewStyle} {...otherProps} />;
});

ThemedView.displayName = 'ThemedView';
