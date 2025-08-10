import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';

// True glassmorphism background with authentic glass-like appearance
export default function OceanTabBarBackground() {
  return (
    <BlurView
      intensity={100}
      style={[
        StyleSheet.absoluteFill, 
        { 
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          borderTopWidth: 1,
          borderTopColor: 'rgba(255, 255, 255, 0.25)',
        }
      ]}
    />
  );
}

export function useBottomTabOverflow() {
  return 0;
}
