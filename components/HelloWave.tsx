import type { ReactNode } from 'react';
import { memo, useCallback, useEffect, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/ThemedText';

export const HelloWave = memo((): ReactNode => {
  const rotationAnimation = useSharedValue(0);

  const animationConfig = useMemo(() => ({
    duration: 150,
    repeatCount: 4,
    rotationAngle: 25,
  }), []);

  const startAnimation = useCallback(() => {
    rotationAnimation.value = withRepeat(
      withSequence(
        withTiming(animationConfig.rotationAngle, { duration: animationConfig.duration }), 
        withTiming(0, { duration: animationConfig.duration })
      ),
      animationConfig.repeatCount
    );
  }, [rotationAnimation, animationConfig]);

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotationAnimation.value ?? 0}deg` }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <ThemedText style={styles.text}>👋</ThemedText>
    </Animated.View>
  );
});

HelloWave.displayName = 'HelloWave';

const styles = StyleSheet.create({
  text: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
  },
});
