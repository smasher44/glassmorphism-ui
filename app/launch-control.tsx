import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, Switch, View } from 'react-native';

import { GlassButton } from '@/components/GlassButton';
import { GlassCard } from '@/components/GlassCard';
import { SystemMonitor } from '@/components/SystemMonitor';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

interface ControlState {
  flowControl: boolean;
  temperatureControl: boolean;
  qualityMonitoring: boolean;
  emergencyShutdown: boolean;
  autoMode: boolean;
}

interface SystemMetrics {
  flowRate: number;
  temperature: number;
  phLevel: number;
  pressure: number;
  oxygenLevel: number;
}

interface SystemMetric {
  id: string;
  label: string;
  value: number;
  unit: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  minValue: number;
  maxValue: number;
  isCritical: boolean;
}

export default function LaunchControlScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const isDark = colorScheme === 'dark';

  const [controlState, setControlState] = useState<ControlState>({
    flowControl: false,
    temperatureControl: false,
    qualityMonitoring: false,
    emergencyShutdown: false,
    autoMode: false,
  });

  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    flowRate: 1024,
    temperature: 22,
    phLevel: 7.2,
    pressure: 2.4,
    oxygenLevel: 8.5,
  });

  const [systemMetricsData, setSystemMetricsData] = useState<SystemMetric[]>([]);

  useEffect(() => {
    const updatedMetrics: SystemMetric[] = [
      {
        id: 'flowRate',
        label: 'Flow Rate',
        value: systemMetrics.flowRate,
        unit: 'L/min',
        icon: 'water',
        color: '#0EA5E9',
        minValue: 0,
        maxValue: 2000,
        isCritical: systemMetrics.flowRate > 1800,
      },
      {
        id: 'temperature',
        label: 'Temperature',
        value: systemMetrics.temperature,
        unit: '°C',
        icon: 'thermometer',
        color: '#10B981',
        minValue: 15,
        maxValue: 35,
        isCritical: systemMetrics.temperature < 18 || systemMetrics.temperature > 30,
      },
      {
        id: 'phLevel',
        label: 'pH Level',
        value: systemMetrics.phLevel,
        unit: '',
        icon: 'analytics',
        color: '#8B5CF6',
        minValue: 6.5,
        maxValue: 8.5,
        isCritical: systemMetrics.phLevel < 6.8 || systemMetrics.phLevel > 8.2,
      },
      {
        id: 'pressure',
        label: 'Pressure',
        value: systemMetrics.pressure,
        unit: 'Bar',
        icon: 'speedometer',
        color: '#F59E0B',
        minValue: 1.5,
        maxValue: 4.0,
        isCritical: systemMetrics.pressure < 2.0 || systemMetrics.pressure > 3.5,
      },
      {
        id: 'oxygenLevel',
        label: 'Oxygen',
        value: systemMetrics.oxygenLevel,
        unit: 'mg/L',
        icon: 'leaf',
        color: '#10B981',
        minValue: 6.0,
        maxValue: 12.0,
        isCritical: systemMetrics.oxygenLevel < 7.0,
      },
    ];
    setSystemMetricsData(updatedMetrics);
  }, [systemMetrics]);

  // Auto-refresh metrics every 5 seconds when auto mode is enabled
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (controlState.autoMode) {
      interval = setInterval(() => {
        simulateMetricsUpdate();
      }, 5000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [controlState.autoMode]);

  const handleControlToggle = (key: keyof ControlState) => {
    setControlState(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleEmergencyShutdown = () => {
    Alert.alert(
      'Emergency Shutdown',
      'Are you sure you want to initiate emergency shutdown? This will stop all systems immediately.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Shutdown',
          style: 'destructive',
          onPress: () => {
            setControlState(prev => ({
              ...prev,
              emergencyShutdown: true,
              flowControl: false,
              temperatureControl: false,
              qualityMonitoring: false,
              autoMode: false,
            }));
            Alert.alert('Emergency Shutdown', 'All systems have been shut down safely.');
          },
        },
      ]
    );
  };

  const handleBackToHome = () => {
    router.back();
  };

  const simulateMetricsUpdate = () => {
    setSystemMetrics(prev => ({
      flowRate: prev.flowRate + (Math.random() - 0.5) * 100,
      temperature: prev.temperature + (Math.random() - 0.5) * 2,
      phLevel: prev.phLevel + (Math.random() - 0.5) * 0.2,
      pressure: prev.pressure + (Math.random() - 0.5) * 0.3,
      oxygenLevel: prev.oxygenLevel + (Math.random() - 0.5) * 0.5,
    }));
  };

  const getStatusColor = (isActive: boolean): string => {
    return isActive ? '#10B981' : '#EF4444';
  };

  const getStatusText = (isActive: boolean): string => {
    return isActive ? 'ACTIVE' : 'INACTIVE';
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
          <View style={styles.headerContent}>
            <View style={styles.headerLeft}>
              <ThemedText style={styles.headerTitle}>Launch Control</ThemedText>
              <ThemedText style={styles.headerSubtitle}>Water Management Control Panel</ThemedText>
            </View>
            <GlassButton
              title="← Back"
              onPress={handleBackToHome}
              icon="arrow-back"
              style={styles.backButton}
            />
          </View>
        </GlassCard>
      </View>

      {/* System Status Overview */}
      <View style={styles.statusContainer}>
        <GlassCard intensity={30} style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Ionicons name="shield-checkmark" size={24} color="#10B981" />
            <ThemedText style={styles.statusTitle}>System Status</ThemedText>
          </View>
          <View style={styles.statusGrid}>
            <View style={styles.statusItem}>
              <ThemedText style={styles.statusLabel}>Flow Control</ThemedText>
              <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(controlState.flowControl) }]} />
              <ThemedText style={styles.statusValue}>{getStatusText(controlState.flowControl)}</ThemedText>
            </View>
            <View style={styles.statusItem}>
              <ThemedText style={styles.statusLabel}>Temperature</ThemedText>
              <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(controlState.temperatureControl) }]} />
              <ThemedText style={styles.statusValue}>{getStatusText(controlState.temperatureControl)}</ThemedText>
            </View>
            <View style={styles.statusItem}>
              <ThemedText style={styles.statusLabel}>Quality Monitor</ThemedText>
              <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(controlState.qualityMonitoring) }]} />
              <ThemedText style={styles.statusValue}>{getStatusText(controlState.qualityMonitoring)}</ThemedText>
            </View>
            <View style={styles.statusItem}>
              <ThemedText style={styles.statusLabel}>Auto Mode</ThemedText>
              <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(controlState.autoMode) }]} />
              <ThemedText style={styles.statusValue}>{getStatusText(controlState.autoMode)}</ThemedText>
            </View>
          </View>
        </GlassCard>
      </View>

      {/* Control Panel */}
      <View style={styles.controlContainer}>
        <GlassCard intensity={25} style={styles.controlCard}>
          <View style={styles.controlHeader}>
            <Ionicons name="settings" size={24} color="#0EA5E9" />
            <ThemedText style={styles.controlTitle}>Control Panel</ThemedText>
          </View>
          
          <View style={styles.controlItem}>
            <View style={styles.controlLeft}>
              <Ionicons name="water" size={20} color="#0EA5E9" />
              <ThemedText style={styles.controlLabel}>Flow Control System</ThemedText>
            </View>
            <Switch
              value={controlState.flowControl}
              onValueChange={() => handleControlToggle('flowControl')}
              trackColor={{ false: '#374151', true: '#0EA5E9' }}
              thumbColor={controlState.flowControl ? '#F1F5F9' : '#9CA3AF'}
            />
          </View>

          <View style={styles.controlItem}>
            <View style={styles.controlLeft}>
              <Ionicons name="thermometer" size={20} color="#10B981" />
              <ThemedText style={styles.controlLabel}>Temperature Control</ThemedText>
            </View>
            <Switch
              value={controlState.temperatureControl}
              onValueChange={() => handleControlToggle('temperatureControl')}
              trackColor={{ false: '#374151', true: '#10B981' }}
              thumbColor={controlState.temperatureControl ? '#F1F5F9' : '#9CA3AF'}
            />
          </View>

          <View style={styles.controlItem}>
            <View style={styles.controlLeft}>
              <Ionicons name="analytics" size={20} color="#8B5CF6" />
              <ThemedText style={styles.controlLabel}>Quality Monitoring</ThemedText>
            </View>
            <Switch
              value={controlState.qualityMonitoring}
              onValueChange={() => handleControlToggle('qualityMonitoring')}
              trackColor={{ false: '#374151', true: '#8B5CF6' }}
              thumbColor={controlState.qualityMonitoring ? '#F1F5F9' : '#9CA3AF'}
            />
          </View>

          <View style={styles.controlItem}>
            <View style={styles.controlLeft}>
              <Ionicons name="sync" size={20} color="#F59E0B" />
              <ThemedText style={styles.controlLabel}>Auto Mode</ThemedText>
            </View>
            <Switch
              value={controlState.autoMode}
              onValueChange={() => handleControlToggle('autoMode')}
              trackColor={{ false: '#374151', true: '#F59E0B' }}
              thumbColor={controlState.autoMode ? '#F1F5F9' : '#9CA3AF'}
            />
          </View>
        </GlassCard>
      </View>

      {/* Real-time System Monitor */}
      <View style={styles.metricsContainer}>
        <SystemMonitor metrics={systemMetricsData} intensity={25} />
      </View>

      {/* Emergency Controls */}
      <View style={styles.emergencyContainer}>
        <GlassCard intensity={35} style={styles.emergencyCard}>
          <View style={styles.emergencyHeader}>
            <Ionicons name="warning" size={24} color="#EF4444" />
            <ThemedText style={styles.emergencyTitle}>Emergency Controls</ThemedText>
          </View>
          
          <View style={styles.emergencyButtons}>
            <GlassButton
              title="Emergency Shutdown"
              onPress={handleEmergencyShutdown}
              icon="power"
              iconColor="#EF4444"
              style={styles.emergencyButton}
            />
            
            <GlassButton
              title="Reset All Systems"
              onPress={() => {
                setControlState({
                  flowControl: false,
                  temperatureControl: false,
                  qualityMonitoring: false,
                  emergencyShutdown: false,
                  autoMode: false,
                });
                Alert.alert('Reset Complete', 'All systems have been reset to default state.');
              }}
              icon="refresh"
              iconColor="#F59E0B"
              style={styles.resetButton}
            />
            
            <GlassButton
              title="Update Metrics"
              onPress={simulateMetricsUpdate}
              icon="sync"
              iconColor="#0EA5E9"
              style={styles.updateButton}
            />
          </View>
        </GlassCard>
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
    paddingBottom: 20,
  },
  headerCard: {
    padding: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#F1F5F9',
  },
  headerSubtitle: {
    fontSize: 14,
    opacity: 0.8,
    color: '#F1F5F9',
  },
  backButton: {
    minWidth: 80,
    paddingHorizontal: 16,
  },
  statusContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statusCard: {
    padding: 20,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
    color: '#F1F5F9',
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statusItem: {
    alignItems: 'center',
    minWidth: (width - 80) / 2,
  },
  statusLabel: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 8,
    color: '#F1F5F9',
    textAlign: 'center',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 10,
    fontWeight: '600',
    color: '#F1F5F9',
  },
  controlContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  controlCard: {
    padding: 20,
  },
  controlHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  controlTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
    color: '#F1F5F9',
  },
  controlItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(14, 165, 233, 0.1)',
  },
  controlLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  controlLabel: {
    fontSize: 16,
    color: '#F1F5F9',
  },
  metricsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  metricsCard: {
    padding: 20,
  },
  metricsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  metricsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
    color: '#F1F5F9',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  metricItem: {
    alignItems: 'center',
    minWidth: (width - 80) / 3,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
    color: '#F1F5F9',
  },
  metricUnit: {
    fontSize: 10,
    opacity: 0.7,
    color: '#F1F5F9',
    textAlign: 'center',
  },
  emergencyContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  emergencyCard: {
    padding: 20,
  },
  emergencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
    color: '#F1F5F9',
  },
  emergencyButtons: {
    gap: 12,
  },
  emergencyButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    borderColor: 'rgba(239, 68, 68, 0.3)',
  },
  resetButton: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  updateButton: {
    backgroundColor: 'rgba(14, 165, 233, 0.2)',
    borderColor: 'rgba(14, 165, 233, 0.3)',
  },
  bottomSpacing: {
    height: 40,
  },
});
