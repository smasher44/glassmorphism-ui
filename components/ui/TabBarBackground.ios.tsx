import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';

export default function BlurTabBarBackground() {
  return (
    <BlurView
      // True glassmorphism with strong blur and transparency
      tint="systemChromeMaterial"
      intensity={120}
      style={[
        StyleSheet.absoluteFill, 
        { 
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderTopWidth: 1,
          borderTopColor: 'rgba(255, 255, 255, 0.2)',
        }
      ]}
    />
  );
}

export function useBottomTabOverflow() {
  return useBottomTabBarHeight();
}
