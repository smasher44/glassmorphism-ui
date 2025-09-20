import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';
import type { ReactNode } from 'react';
import { memo, useCallback } from 'react';

export const HapticTab = memo((props: BottomTabBarButtonProps): ReactNode => {
  const { onPressIn, ...restProps } = props;
  
  const handlePressIn = useCallback((ev: any) => {
    if (process.env.EXPO_OS === 'ios') {
      // Add a soft haptic feedback when pressing down on the tabs.
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {
        // Silently handle haptic errors
      });
    }
    onPressIn?.(ev);
  }, [onPressIn]);

  return (
    <PlatformPressable
      {...restProps}
      onPressIn={handlePressIn}
    />
  );
});

HapticTab.displayName = 'HapticTab';
