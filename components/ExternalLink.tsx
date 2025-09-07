import { Href, Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { memo, ReactNode, useCallback, type ComponentProps } from 'react';


import { Platform } from 'react-native';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: Href & string };

export const ExternalLink = memo(({ href, ...rest }: Props): ReactNode => {
  const handlePress = useCallback(async (event: any) => {
    if (Platform.OS !== 'web') {
      // Prevent the default behavior of linking to the default browser on native.
      event?.preventDefault();
      // Open the link in an in-app browser.
      await openBrowserAsync(href);
    }
  }, [href]);

  return (
    <Link
      target="_blank"
      {...rest}
      href={href}
      onPress={handlePress}
    />
  );
});

ExternalLink.displayName = 'ExternalLink';
