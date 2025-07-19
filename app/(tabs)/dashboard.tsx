import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { statServices } from '../../services/statServices';

const { width, height } = Dimensions.get('window');
const primary = '#FB3026';
const cardBg = '#FFF';
const textMain = '#1A1A1A';
const textSecondary = '#666';

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function FishtaDashboard() {
  const [stats, setStats] = useState({
    ponds_count: 0,
    regions_count: 0,
    sensors_count: 0,
    weekly_ph_do: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await statServices.getStat();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const processChartData = (apiData: any[], dataKey: string) => {
    if (!apiData || apiData.length === 0) {
      return weekDays.map(day => ({ date: day, [dataKey]: 0 }));
    }

    // Create a map of existing data
    const dataMap = new Map();
    apiData.forEach(item => {
      dataMap.set(item.date, parseFloat(item[dataKey]) || 0);
    });

    // Fill missing days with 0
    return weekDays.map(day => ({
      date: day,
      [dataKey]: dataMap.get(day) || 0
    }));
  };

  const renderChart = (data: any[], color: string, title: string, dataKey: string) => {
    const processedData = processChartData(data, dataKey);
    const values = processedData.map(item => item[dataKey]);
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    const range = maxValue - minValue || 1;
    
    // Get current value (latest non-zero value or 0)
    const currentValue = processedData.reduce((latest, item) => {
      return item[dataKey] > 0 ? item[dataKey] : latest;
    }, 0);

  return (
      <View style={styles.chartCard}>
        <View style={styles.chartHeader}>
          <View style={styles.chartTitleRow}>
            <Text style={styles.chartTitle}>{title}</Text>
            <Text style={[styles.currentValue, { color: color }]}>
              {currentValue.toFixed(1)}
            </Text>
    </View>
          <View style={styles.timeSelector}>
            <Text style={styles.timeText}>Weekly</Text>
            <Ionicons name="chevron-down" size={16} color="#666" />
          </View>
      </View>
        <View style={styles.chartContainer}>
          <View style={styles.chartWithScale}>
            {/* Left Scale */}
            <View style={styles.scaleContainer}>
              <Text style={styles.scaleValue}>{maxValue.toFixed(1)}</Text>
              <Text style={styles.scaleValue}>{((maxValue + minValue) / 2).toFixed(1)}</Text>
              <Text style={styles.scaleValue}>{minValue.toFixed(1)}</Text>
            </View>
            
            {/* Chart Area */}
            <View style={styles.chartArea}>
              {processedData.map((item, index) => {
                const value = item[dataKey];
                const height = ((value - minValue) / range) * 80;
                const isActive = item.date === 'Sun'; // Sunday (last day)
                return (
                  <View key={index} style={styles.barContainer}>
                    <View style={[
                      styles.bar,
                      {
                        height: height,
                        backgroundColor: isActive ? color : `${color}40`,
                        borderColor: isActive ? color : 'transparent',
                        borderWidth: isActive ? 2 : 0
                      }
                    ]} />
                    <Text style={[
                      styles.dayLabel,
                      { color: isActive ? color : '#666' }
                    ]}>
                      {item.date}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Hey Ayoub!</Text>
            <Text style={styles.welcome}>Welcome</Text>
                    </View>
          <TouchableOpacity style={styles.notificationBtn}>
            <Ionicons name="notifications-outline" size={24} color={primary} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
                    </View>
                  </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Overview Cards */}
        <View style={styles.overviewSection}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.overviewCards}>
            <View style={styles.overviewCard}>
              <Text style={styles.overviewLabel}>Ponds</Text>
              <Text style={styles.overviewValue}>+{stats.ponds_count}</Text>
            </View>
            <View style={styles.overviewCard}>
              <Text style={styles.overviewLabel}>Region</Text>
              <Text style={styles.overviewValue}>+{stats.regions_count}</Text>
            </View>
          </View>
        </View>

        {/* Sensor Data Charts */}
        <View style={styles.chartsSection}>
          <Text style={styles.sectionTitle}>sensor data over time</Text>
          {renderChart(stats.weekly_ph_do, '#3B82F6', 'Dissolved Oxygen', 'avgDO')}
          {renderChart(stats.weekly_ph_do, '#10B981', 'Ph', 'avgPH')}
          {renderChart(stats.weekly_ph_do, '#F59E0B', 'temperature', 'avgTemp')}
            </View>
          </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Ionicons name="home" size={24} color={primary} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push('/(tabs)/ponds')}
        >
          <Ionicons name="water" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="alert-circle" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="document-text" size={24} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="person" size={24} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: cardBg,
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: textMain,
    marginBottom: 4,
  },
  welcome: {
    fontSize: 16,
    color: textSecondary,
  },
  notificationBtn: {
    position: 'relative',
    padding: 8,
  },
  notificationDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: primary,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  overviewSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: textMain,
    marginBottom: 16,
  },
  overviewCards: {
    flexDirection: 'row',
    gap: 12,
  },
  overviewCard: {
    flex: 1,
    backgroundColor: cardBg,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  overviewLabel: {
    fontSize: 14,
    color: textSecondary,
    marginBottom: 8,
  },
  overviewValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: textMain,
  },
  chartsSection: {
    marginTop: 24,
    marginBottom: 100,
  },
  chartCard: {
    backgroundColor: cardBg,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: textMain,
  },
  currentValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 14,
    color: textSecondary,
  },
  chartContainer: {
    height: 120,
  },
  chartWithScale: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 80,
  },
  scaleContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingRight: 10,
    height: 80,
  },
  scaleValue: {
    fontSize: 10,
    color: textSecondary,
  },
  chartArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 80,
    paddingHorizontal: 10,
    flex: 1,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 20,
    borderRadius: 10,
    marginBottom: 8,
  },
  dayLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: cardBg,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  navItem: {
    alignItems: 'center',
    padding: 8,
  },
  activeNavItem: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
});