import type { PropsWithChildren, ReactElement, ReactNode } from 'react';
import { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';

const HEADER_HEIGHT = 250;
const SCROLL_EVENT_THROTTLE = 16;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

const ParallaxScrollView = memo(({
  children,
  headerImage,
  headerBackgroundColor,
}: Props): ReactNode => {
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const bottom = useBottomTabOverflow();
  
  const headerBackgroundColorValue = useMemo(() => 
    headerBackgroundColor?.[colorScheme] ?? '#ffffff',
    [headerBackgroundColor, colorScheme]
  );

  const interpolationRanges = useMemo(() => ({
    inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
    translateYOutputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
    scaleOutputRange: [2, 1, 1],
  }), []);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const scrollValue = scrollOffset.value ?? 0;
    return {
      transform: [
        {
          translateY: interpolate(
            scrollValue,
            interpolationRanges.inputRange,
            interpolationRanges.translateYOutputRange
          ),
        },
        {
          scale: interpolate(
            scrollValue, 
            interpolationRanges.inputRange, 
            interpolationRanges.scaleOutputRange
          ),
        },
      ],
    };
  });

  const headerStyle = useMemo(() => [
    styles.header,
    { backgroundColor: headerBackgroundColorValue },
    headerAnimatedStyle,
  ], [headerBackgroundColorValue, headerAnimatedStyle]);

  const scrollIndicatorInsets = useMemo(() => ({ 
    bottom: bottom ?? 0 
  }), [bottom]);

  const contentContainerStyle = useMemo(() => ({ 
    paddingBottom: bottom ?? 0 
  }), [bottom]);

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={SCROLL_EVENT_THROTTLE}
        scrollIndicatorInsets={scrollIndicatorInsets}
        contentContainerStyle={contentContainerStyle}>
        <Animated.View style={headerStyle}>
          {headerImage}
        </Animated.View>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
});

ParallaxScrollView.displayName = 'ParallaxScrollView';

export default ParallaxScrollView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: 'hidden',
  },
});
