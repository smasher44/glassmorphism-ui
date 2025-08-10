import { BlurView } from 'expo-blur';
import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';

interface GlassCardProps {
  children: React.ReactNode;
  intensity?: number;
  style?: ViewStyle;
  padding?: number;
  borderRadius?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  intensity = 25,
  style,
  padding = 16,
  borderRadius = 16,
}): React.ReactNode => {
  return (
    <BlurView intensity={intensity ?? 25} style={[styles.glassCard, { padding, borderRadius }, style]}>
      {children}
    </BlurView>
  );
};

const styles = StyleSheet.create({
  glassCard: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(14, 165, 233, 0.2)',
    backgroundColor: 'rgba(14, 165, 233, 0.05)',
  },
}); 