import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, Platform, ScrollView, StyleSheet, View } from 'react-native';

import { GlassButton } from '@/components/GlassButton';
import { GlassCard } from '@/components/GlassCard';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';

const { width } = Dimensions.get('window');

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleFeaturePress = (feature: string) => {
    console.log(`Feature pressed: ${feature}`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Background Gradient */}
      <LinearGradient
        colors={isDark ? ['#020617', '#0B1426', '#1E3A8A', '#1E40AF'] : ['#0B1426', '#1E3A8A', '#3B82F6', '#60A5FA']}
        style={styles.backgroundGradient}
      />
      
      {/* Header Section */}
      <View style={styles.header}>
        <GlassCard intensity={20} style={styles.headerCard}>
          <ThemedText style={styles.headerTitle}>Ocean Features</ThemedText>
          <ThemedText style={styles.headerSubtitle}>Discover water management tools</ThemedText>
        </GlassCard>
      </View>

      {/* Interactive Features Grid */}
      <View style={styles.featuresGrid}>
        <GlassCard intensity={25} style={styles.featureGridCard}>
          <View style={styles.featureGridContent}>
            <Ionicons name="water" size={32} color="#0EA5E9" />
            <ThemedText style={styles.featureGridTitle}>Flow Control</ThemedText>
            <ThemedText style={styles.featureGridDescription}>
              Advanced water flow management
            </ThemedText>
          </View>
        </GlassCard>

        <GlassCard intensity={25} style={styles.featureGridCard}>
          <View style={styles.featureGridContent}>
            <Ionicons name="thermometer" size={32} color="#10B981" />
            <ThemedText style={styles.featureGridTitle}>Temperature</ThemedText>
            <ThemedText style={styles.featureGridDescription}>
              Precise temperature monitoring
            </ThemedText>
          </View>
        </GlassCard>

        <GlassCard intensity={25} style={styles.featureGridCard}>
          <View style={styles.featureGridContent}>
            <Ionicons name="analytics" size={32} color="#8B5CF6" />
            <ThemedText style={styles.featureGridTitle}>Analytics</ThemedText>
            <ThemedText style={styles.featureGridDescription}>
              Real-time data analysis
            </ThemedText>
          </View>
        </GlassCard>

        <GlassCard intensity={25} style={styles.featureGridCard}>
          <View style={styles.featureGridContent}>
            <Ionicons name="shield-checkmark" size={32} color="#EF4444" />
            <ThemedText style={styles.featureGridTitle}>Safety</ThemedText>
            <ThemedText style={styles.featureGridDescription}>
              Water quality protection
            </ThemedText>
          </View>
        </GlassCard>
      </View>

      {/* Component Showcase */}
      <View style={styles.showcaseContainer}>
        <ThemedText style={styles.sectionTitle}>Water Management Tools</ThemedText>
        
        <GlassCard intensity={30} style={styles.showcaseCard}>
          <View style={styles.showcaseHeader}>
            <Ionicons name="water" size={24} color="#0EA5E9" />
            <ThemedText style={styles.showcaseTitle}>Flow Monitoring System</ThemedText>
          </View>
          <ThemedText style={styles.showcaseDescription}>
            Advanced water flow tracking with predictive analytics and automated alerts.
          </ThemedText>
          <View style={styles.codePreview}>
            <ThemedText style={styles.codeText}>
              {'<FlowMonitor\n  rate={1024}\n  unit="L/min"\n/>'}
            </ThemedText>
          </View>
        </GlassCard>

        <GlassCard intensity={30} style={styles.showcaseCard}>
          <View style={styles.showcaseHeader}>
            <Ionicons name="thermometer" size={24} color="#10B981" />
            <ThemedText style={styles.showcaseTitle}>Temperature Control</ThemedText>
          </View>
          <ThemedText style={styles.showcaseDescription}>
            Automated temperature regulation with precision monitoring and control systems.
          </ThemedText>
          <View style={styles.codePreview}>
            <ThemedText style={styles.codeText}>
              {'<TempControl\n  target={22}\n  unit="°C"\n/>'}
            </ThemedText>
          </View>
        </GlassCard>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <GlassButton
          title="View Analytics"
          onPress={() => handleFeaturePress('analytics')}
          icon="analytics"
          style={styles.actionButton}
        />
        
        <GlassButton
          title="Control Panel"
          onPress={() => handleFeaturePress('control')}
          icon="settings"
          style={styles.actionButton}
        />
      </View>

      {/* Bottom Spacing */}
      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  headerCard: {
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#F1F5F9',
  },
  headerSubtitle: {
    fontSize: 16,
    opacity: 0.8,
    color: '#F1F5F9',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 30,
  },
  featureGridCard: {
    width: (width - 52) / 2,
    padding: 16,
  },
  featureGridContent: {
    alignItems: 'center',
  },
  featureGridTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
    textAlign: 'center',
    color: '#F1F5F9',
  },
  featureGridDescription: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 16,
    color: '#F1F5F9',
  },
  showcaseContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#F1F5F9',
  },
  showcaseCard: {
    marginBottom: 16,
    padding: 20,
  },
  showcaseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  showcaseTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
    color: '#F1F5F9',
  },
  showcaseDescription: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
    marginBottom: 16,
    color: '#F1F5F9',
  },
  codePreview: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 8,
    padding: 12,
  },
  codeText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontSize: 12,
    color: '#F1F5F9',
  },
  actionsContainer: {
    paddingHorizontal: 20,
    gap: 12,
    alignItems: 'center',
  },
  actionButton: {
    minWidth: 200,
  },
  bottomSpacing: {
    height: 40,
  },
});
