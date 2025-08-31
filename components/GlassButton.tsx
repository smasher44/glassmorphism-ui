import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import type { ReactNode } from 'react';
import React, { memo, useCallback, useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

interface GlassButtonProps {
  title: string;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  style?: ViewStyle;
  intensity?: number;
  disabled?: boolean;
}

export const GlassButton = memo(({
  title,
  onPress,
  icon,
  iconColor = '#0EA5E9',
  style,
  intensity = 40,
  disabled = false,
}: GlassButtonProps): ReactNode => {
  const handlePress = useCallback(() => {
    if (!disabled) {
      onPress?.();
    }
  }, [onPress, disabled]);

  const buttonContainerStyle = useMemo(() => [
    styles.buttonContainer, 
    style
  ], [style]);

  const buttonTextStyle = useMemo(() => [
    styles.buttonText, 
    disabled && styles.disabledText
  ], [disabled]);

  const buttonContentStyle = useMemo(() => [
    styles.buttonContent,
    { gap: icon ? 8 : 0 }
  ], [icon]);

  const blurIntensity = useMemo(() => intensity ?? 40, [intensity]);
  const finalIconColor = useMemo(() => iconColor ?? '#0EA5E9', [iconColor]);

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      style={buttonContainerStyle}
      activeOpacity={0.8}
    >
      <BlurView intensity={blurIntensity} style={styles.glassButton}>
        <View style={buttonContentStyle}>
          {icon && <Ionicons name={icon} size={20} color={finalIconColor} />}
          <Text style={buttonTextStyle}>{title}</Text>
        </View>
      </BlurView>
    </TouchableOpacity>
  );
});

GlassButton.displayName = 'GlassButton';

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  glassButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 16,
    backgroundColor: 'rgba(14, 165, 233, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(14, 165, 233, 0.3)',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F1F5F9',
  },
  disabledText: {
    opacity: 0.5,
  },
}); 