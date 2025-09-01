import { BlurView } from 'expo-blur';
import type { ReactNode } from 'react';
import React, { memo, useMemo } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';

interface GlassCardProps {
  children: ReactNode;
  intensity?: number;
  style?: ViewStyle;
  padding?: number;
  borderRadius?: number;
}

export const GlassCard = memo(({
  children,
  intensity = 25,
  style,
  padding = 16,
  borderRadius = 16,
}: GlassCardProps): ReactNode => {
  const cardStyle = useMemo(() => [
    styles.glassCard, 
    { padding, borderRadius }, 
    style
  ], [padding, borderRadius, style]);

  const blurIntensity = useMemo(() => intensity ?? 25, [intensity]);

  return (
    <BlurView intensity={blurIntensity} style={cardStyle}>
      {children}
    </BlurView>
  );
});

GlassCard.displayName = 'GlassCard';

const styles = StyleSheet.create({
  glassCard: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(14, 165, 233, 0.2)',
    backgroundColor: 'rgba(14, 165, 233, 0.05)',
  },
}); 