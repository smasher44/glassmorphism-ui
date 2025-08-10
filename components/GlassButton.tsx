import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React from 'react';
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

export const GlassButton: React.FC<GlassButtonProps> = ({
  title,
  onPress,
  icon,
  iconColor = '#0EA5E9',
  style,
  intensity = 40,
  disabled = false,
}): React.ReactNode => {
  const handlePress = React.useCallback(() => {
    if (!disabled) {
      onPress?.();
    }
  }, [onPress, disabled]);

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      style={[styles.buttonContainer, style]}
      activeOpacity={0.8}
    >
      <BlurView intensity={intensity ?? 40} style={styles.glassButton}>
        <View style={styles.buttonContent}>
          {icon && <Ionicons name={icon} size={20} color={iconColor ?? '#0EA5E9'} />}
          <Text style={[styles.buttonText, disabled && styles.disabledText]}>{title}</Text>
        </View>
      </BlurView>
    </TouchableOpacity>
  );
};

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