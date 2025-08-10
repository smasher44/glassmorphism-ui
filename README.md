# Ocean Glassmorphism UI Template

A beautiful React Native template featuring modern glassmorphism design patterns with ocean-inspired water themes, blur effects, and stunning blue gradients.

## Features

🌊 **Ocean-Inspired Design** - Beautiful water-themed glassmorphism with blue gradients
💧 **Water Analytics** - Real-time flow monitoring and quality control interfaces
🎨 **Gradient Backgrounds** - Stunning ocean-like color gradients that adapt to light/dark mode
📱 **Responsive Layout** - Works perfectly on all screen sizes
🌙 **Dark Mode Support** - Seamless theme switching with beautiful blue gradients
⚡ **Performance Optimized** - Smooth animations and efficient rendering
🔧 **Reusable Components** - Modular glassmorphism components

## Components

### GlassCard
A reusable glassmorphism card component with customizable blur intensity and water-themed styling.

```tsx
import { GlassCard } from '@/components/GlassCard';

<GlassCard intensity={25} style={{ padding: 20 }}>
  <Text>Your content here</Text>
</GlassCard>
```

**Props:**
- `intensity` (number, optional): Blur intensity (default: 25)
- `style` (ViewStyle, optional): Additional styling
- `padding` (number, optional): Card padding (default: 16)
- `borderRadius` (number, optional): Border radius (default: 16)

### GlassButton
Interactive buttons with glassmorphism effects and ocean-themed colors.

```tsx
import { GlassButton } from '@/components/GlassButton';

<GlassButton
  title="Launch Control"
  onPress={() => console.log('Pressed!')}
  icon="water"
  intensity={40}
/>
```

**Props:**
- `title` (string): Button text
- `onPress` (function): Press handler
- `icon` (string, optional): Ionicons icon name
- `iconColor` (string, optional): Icon color (default: '#0EA5E9')
- `intensity` (number, optional): Blur intensity (default: 40)
- `disabled` (boolean, optional): Disabled state (default: false)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Run on your preferred platform:**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

## Project Structure

```
glassmorphism-ui/
├── app/
│   ├── (tabs)/
│   │   ├── index.tsx          # Ocean dashboard with water analytics
│   │   └── explore.tsx        # Water management features
│   └── _layout.tsx
├── components/
│   ├── GlassCard.tsx          # Reusable glass card component
│   ├── GlassButton.tsx        # Reusable glass button component
│   └── ...
├── constants/
│   └── Colors.ts              # Theme colors
└── hooks/
    └── useColorScheme.ts      # Color scheme hook
```

## Customization

### Colors
Edit `constants/Colors.ts` to customize the color scheme for light and dark modes.

### Gradients
Modify the gradient colors in the screens:
```tsx
<LinearGradient
  colors={isDark ? ['#0B1426', '#1E3A8A', '#3B82F6', '#60A5FA'] : ['#E0F2FE', '#BAE6FD', '#7DD3FC', '#38BDF8']}
  style={styles.backgroundGradient}
/>
```

### Blur Intensity
Adjust the blur intensity for different effects:
- Light blur: `intensity={15-25}`
- Medium blur: `intensity={25-35}`
- Heavy blur: `intensity={35-50}`

## Water Theme Features

- **Flow Monitoring**: Real-time water flow tracking and analytics
- **Temperature Control**: Water temperature monitoring and control
- **Quality Analysis**: pH, turbidity, and chemical analysis
- **Safety Systems**: Comprehensive safety monitoring with alerts
- **Ocean Gradients**: Beautiful blue gradients inspired by ocean depths

## Dependencies

- `expo-blur` - For blur effects
- `expo-linear-gradient` - For gradient backgrounds
- `@expo/vector-icons` - For icons
- `react-native-reanimated` - For smooth animations

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License.
