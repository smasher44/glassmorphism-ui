import type { ReactNode } from 'react';
import { memo, PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export const Collapsible = memo(({ 
  children, 
  title 
}: PropsWithChildren & { title: string }): ReactNode => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const iconColor = useMemo(() => 
    theme === 'light' ? Colors.light?.icon : Colors.dark?.icon,
    [theme]
  );

  const iconTransform = useMemo(() => 
    [{ rotate: isOpen ? '90deg' : '0deg' }],
    [isOpen]
  );

  return (
    <ThemedView>
      <TouchableOpacity
        style={styles.heading}
        onPress={toggleOpen}
        activeOpacity={0.8}>
        <IconSymbol
          name="chevron.right"
          size={18}
          weight="medium"
          color={iconColor}
          style={{ transform: iconTransform }}
        />

        <ThemedText type="defaultSemiBold">{title}</ThemedText>
      </TouchableOpacity>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
});

Collapsible.displayName = 'Collapsible';

const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
