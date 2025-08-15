import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';

import { GlassButton } from '@/components/GlassButton';
import { GlassCard } from '@/components/GlassCard';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const isDark = colorScheme === 'dark';

  const handleGetStarted = () => {
    router.push('/launch-control');
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
          <ThemedText style={styles.headerTitle}>Ocean Analytics</ThemedText>
          <ThemedText style={styles.headerSubtitle}>Water Management Dashboard</ThemedText>
        </GlassCard>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <GlassCard intensity={30} style={styles.statCard}>
          <View style={styles.statItem}>
            <Ionicons name="water" size={24} color="#0EA5E9" />
            <ThemedText style={styles.statNumber}>1,024</ThemedText>
            <ThemedText style={styles.statLabel}>Flow Rate (L/min)</ThemedText>
          </View>
        </GlassCard>

        <GlassCard intensity={30} style={styles.statCard}>
          <View style={styles.statItem}>
            <Ionicons name="thermometer" size={24} color="#10B981" />
            <ThemedText style={styles.statNumber}>22°C</ThemedText>
            <ThemedText style={styles.statLabel}>Temperature</ThemedText>
          </View>
        </GlassCard>

        <GlassCard intensity={30} style={styles.statCard}>
          <View style={styles.statItem}>
            <Ionicons name="analytics" size={24} color="#8B5CF6" />
            <ThemedText style={styles.statNumber}>7.2</ThemedText>
            <ThemedText style={styles.statLabel}>pH Level</ThemedText>
          </View>
        </GlassCard>
      </View>

      {/* Feature Cards */}
      <View style={styles.featuresContainer}>
        <GlassCard intensity={25} style={styles.featureCard}>
          <View style={styles.featureHeader}>
            <View style={styles.iconContainer}>
              <Ionicons name="water" size={28} color="#0EA5E9" />
            </View>
            <ThemedText style={styles.featureTitle}>Flow Monitoring</ThemedText>
          </View>
          <ThemedText style={styles.featureDescription}>
            Real-time water flow tracking with advanced analytics and predictive maintenance.
          </ThemedText>
        </GlassCard>

        <GlassCard intensity={25} style={styles.featureCard}>
          <View style={styles.featureHeader}>
            <View style={styles.iconContainer}>
              <Ionicons name="thermometer" size={28} color="#10B981" />
            </View>
            <ThemedText style={styles.featureTitle}>Temperature Control</ThemedText>
          </View>
          <ThemedText style={styles.featureDescription}>
            Precise temperature monitoring and automated control systems for optimal conditions.
          </ThemedText>
        </GlassCard>

        <GlassCard intensity={25} style={styles.featureCard}>
          <View style={styles.featureHeader}>
            <View style={styles.iconContainer}>
              <Ionicons name="analytics" size={28} color="#8B5CF6" />
            </View>
            <ThemedText style={styles.featureTitle}>Quality Analysis</ThemedText>
          </View>
          <ThemedText style={styles.featureDescription}>
            Comprehensive water quality monitoring with pH, turbidity, and chemical analysis.
          </ThemedText>
        </GlassCard>
      </View>

      {/* Action Button */}
      <View style={styles.actionContainer}>
        <GlassButton
          title="Launch Control"
          onPress={handleGetStarted}
          icon="water"
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
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#F1F5F9',
  },
  headerSubtitle: {
    fontSize: 16,
    opacity: 0.8,
    color: '#F1F5F9',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    padding: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
    color: '#F1F5F9',
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
    color: '#F1F5F9',
  },
  featuresContainer: {
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 30,
  },
  featureCard: {
    padding: 20,
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(14, 165, 233, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#F1F5F9',
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
    color: '#F1F5F9',
  },
  actionContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  actionButton: {
    minWidth: 200,
  },
  bottomSpacing: {
    height: 40,
  },
});
