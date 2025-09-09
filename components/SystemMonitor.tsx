import { Ionicons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';

import { GlassCard } from '@/components/GlassCard';
import { ThemedText } from '@/components/ThemedText';

const { width } = Dimensions.get('window');

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

interface SystemMonitorProps {
  metrics: SystemMetric[];
  intensity?: number;
  style?: any;
}

export const SystemMonitor = memo(({
  metrics,
  intensity = 25,
  style,
}: SystemMonitorProps): ReactNode => {
  const pulseAnimationsRef = useRef<{ [key: string]: Animated.Value }>({});
  const valueAnimationsRef = useRef<{ [key: string]: Animated.Value }>({});
  
  const pulseAnimations = pulseAnimationsRef.current;
  const valueAnimations = valueAnimationsRef.current;

  const getMetricStatus = useCallback((metric: SystemMetric): 'normal' | 'warning' | 'critical' => {
    const percentage = (metric.value - metric.minValue) / (metric.maxValue - metric.minValue);
    if (percentage < 0.2 || percentage > 0.8) return 'critical';
    if (percentage < 0.3 || percentage > 0.7) return 'warning';
    return 'normal';
  }, []);

  const getStatusColor = useCallback((status: 'normal' | 'warning' | 'critical'): string => {
    switch (status) {
      case 'normal':
        return '#10B981';
      case 'warning':
        return '#F59E0B';
      case 'critical':
        return '#EF4444';
    }
  }, []);

  const getStatusIcon = useCallback((status: 'normal' | 'warning' | 'critical'): keyof typeof Ionicons.glyphMap => {
    switch (status) {
      case 'normal':
        return 'checkmark-circle';
      case 'warning':
        return 'warning';
      case 'critical':
        return 'alert-circle';
    }
  }, []);

  const systemHealthStats = useMemo(() => {
    const normalCount = metrics.filter((m) => getMetricStatus(m) === 'normal').length;
    const warningCount = metrics.filter((m) => getMetricStatus(m) === 'warning').length;
    const criticalCount = metrics.filter((m) => getMetricStatus(m) === 'critical').length;
    
    return { normalCount, warningCount, criticalCount };
  }, [metrics, getMetricStatus]);

  const containerStyle = useMemo(() => [styles.container, style] as any, [style]);

  useEffect(() => {
    // Initialize animations for each metric
    metrics.forEach((metric) => {
      if (!pulseAnimations[metric.id]) {
        pulseAnimations[metric.id] = new Animated.Value(1);
        valueAnimations[metric.id] = new Animated.Value(0);
      }
    });

    // Start pulse animations for critical metrics
    const startPulseAnimations = () => {
      const criticalMetrics = metrics.filter((m) => m.isCritical);
      criticalMetrics.forEach((metric) => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(pulseAnimations[metric.id], {
              toValue: 1.2,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(pulseAnimations[metric.id], {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
          ])
        ).start();
      });
    };

    // Start value count-up animations
    const startValueAnimations = () => {
      metrics.forEach((metric) => {
        Animated.timing(valueAnimations[metric.id], {
          toValue: metric.value,
          duration: 2000,
          useNativeDriver: false,
        }).start();
      });
    };

    startPulseAnimations();
    startValueAnimations();

    return () => {
      // Cleanup animations
      Object.values(pulseAnimations).forEach((anim) => anim.stopAnimation());
      Object.values(valueAnimations).forEach((anim) => anim.stopAnimation());
    };
  }, [metrics, pulseAnimations, valueAnimations]);

  const renderMetric = useCallback((metric: SystemMetric) => {
    const status = getMetricStatus(metric);
    const statusColor = getStatusColor(status);
    const statusIcon = getStatusIcon(status);
    const isCritical = metric.isCritical;
    const progressPercentage = ((metric.value - metric.minValue) / (metric.maxValue - metric.minValue)) * 100;

    const iconContainerStyle = [
      styles.iconContainer,
      {
        backgroundColor: `${metric.color}20`,
        transform: [
          {
            scale: isCritical
              ? pulseAnimations[metric.id] ?? 1
              : 1,
          },
        ],
      },
    ];

    const progressFillStyle = [
      styles.progressFill,
      {
        width: `${progressPercentage}%` as any,
        backgroundColor: statusColor,
      },
    ];

    return (
      <View key={metric.id} style={styles.metricCard}>
        <View style={styles.metricHeader}>
          <Animated.View style={iconContainerStyle}>
            <Ionicons name={metric.icon} size={20} color={metric.color} />
          </Animated.View>
          <View style={styles.statusIndicator}>
            <Ionicons name={statusIcon} size={16} color={statusColor} />
          </View>
        </View>

        <View style={styles.metricContent}>
          <Animated.Text style={styles.metricValue}>
            {valueAnimations[metric.id]?.interpolate({
              inputRange: [0, metric.value],
              outputRange: ['0', metric.value.toString()],
            }) ?? metric.value}
          </Animated.Text>
          <ThemedText style={styles.metricUnit}>{metric.unit}</ThemedText>
          <ThemedText style={styles.metricLabel}>{metric.label}</ThemedText>
        </View>

        {/* Progress bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBackground}>
            <View style={progressFillStyle} />
          </View>
          <View style={styles.progressLabels}>
            <ThemedText style={styles.progressMin}>{metric.minValue}</ThemedText>
            <ThemedText style={styles.progressMax}>{metric.maxValue}</ThemedText>
          </View>
        </View>
      </View>
    );
  }, [getMetricStatus, getStatusColor, getStatusIcon, pulseAnimations, valueAnimations]);

  return (
    <GlassCard intensity={intensity} style={containerStyle}>
      <View style={styles.header}>
        <Ionicons name="pulse" size={24} color="#EF4444" />
        <ThemedText style={styles.title}>Real-time System Monitor</ThemedText>
      </View>

      <View style={styles.metricsGrid}>
        {metrics.map(renderMetric)}
      </View>

      {/* System Status Summary */}
      <View style={styles.statusSummary}>
        <View style={styles.summaryHeader}>
          <Ionicons name="shield-checkmark" size={20} color="#10B981" />
          <ThemedText style={styles.summaryTitle}>System Health</ThemedText>
        </View>
        <View style={styles.summaryStats}>
          <View style={styles.summaryStat}>
            <ThemedText style={styles.summaryNumber}>
              {systemHealthStats.normalCount}
            </ThemedText>
            <ThemedText style={styles.summaryLabel}>Normal</ThemedText>
          </View>
          <View style={styles.summaryStat}>
            <ThemedText style={styles.summaryNumber}>
              {systemHealthStats.warningCount}
            </ThemedText>
            <ThemedText style={styles.summaryLabel}>Warning</ThemedText>
          </View>
          <View style={styles.summaryStat}>
            <ThemedText style={styles.summaryNumber}>
              {systemHealthStats.criticalCount}
            </ThemedText>
            <ThemedText style={styles.summaryLabel}>Critical</ThemedText>
          </View>
        </View>
      </View>
    </GlassCard>
  );
});

SystemMonitor.displayName = 'SystemMonitor';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
    color: '#F1F5F9',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 20,
  },
  metricCard: {
    minWidth: (width - 80) / 2,
    alignItems: 'center',
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusIndicator: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: 'rgba(15, 23, 42, 0.9)',
    borderRadius: 10,
    padding: 2,
  },
  metricContent: {
    alignItems: 'center',
    marginBottom: 12,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F1F5F9',
    marginBottom: 4,
  },
  metricUnit: {
    fontSize: 12,
    opacity: 0.7,
    color: '#F1F5F9',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#F1F5F9',
    textAlign: 'center',
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressBackground: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  progressMin: {
    fontSize: 10,
    opacity: 0.6,
    color: '#F1F5F9',
  },
  progressMax: {
    fontSize: 10,
    opacity: 0.6,
    color: '#F1F5F9',
  },
  statusSummary: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(14, 165, 233, 0.2)',
    paddingTop: 16,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    color: '#F1F5F9',
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryStat: {
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#F1F5F9',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    opacity: 0.7,
    color: '#F1F5F9',
  },
});
