import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

const primary = '#FB3026';
const cardBg = '#FFF6F5';
const textMain = '#222';
const textSecondary = '#666';
const statusColors: Record<'safe' | 'warning' | 'danger', string> = {
  safe: '#43B581',
  warning: '#FFB300',
  danger: '#FB3026',
};

const ponds: Array<{ name: string; status: 'safe' | 'warning' | 'danger'; temp: number; ph: number; oxygen: number }> = [
  { name: 'North Pond', status: 'safe', temp: 23, ph: 7.4, oxygen: 7.2 },
  { name: 'East Pond', status: 'warning', temp: 29, ph: 6.3, oxygen: 5.8 },
  { name: 'West Pond', status: 'danger', temp: 33, ph: 5.6, oxygen: 4.1 },
];

const alerts = [
  { title: 'Critical Oxygen Drop', message: 'West Pond oxygen level is critically low. Immediate aeration required.' },
  { title: 'High Temperature', message: 'East Pond temperature is approaching unsafe levels.' },
];

const tips = [
  { title: 'Aerate Regularly', message: 'Keep oxygen levels above 6 mg/L for healthy fish.' },
  { title: 'Monitor pH', message: 'Ideal pH for most fish is between 6.5 and 8.5.' },
  { title: 'Shade Ponds', message: 'Provide shade to reduce water temperature spikes.' },
];

export default function FishtaDashboard() {
  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../../assets/images/fishtaLogo.webp')} style={styles.logo} />
        <Text style={styles.title}>Fishta</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Pond Status Summary */}
        <Text style={styles.sectionTitle}>Your Ponds</Text>
        <View style={styles.pondsRow}>
          {ponds.map((pond, idx) => (
            <View key={idx} style={[styles.pondCard, { borderColor: statusColors[pond.status], backgroundColor: cardBg }]}> 
              <Text style={styles.pondName}>{pond.name}</Text>
              <View style={styles.statusRow}>
                <View style={[styles.statusDot, { backgroundColor: statusColors[pond.status] }]} />
                <Text style={[styles.pondStatus, { color: statusColors[pond.status] }]}>{pond.status.charAt(0).toUpperCase() + pond.status.slice(1)}</Text>
              </View>
              <Text style={styles.pondInfo}>Temp: <Text style={{color: textMain}}>{pond.temp}°C</Text></Text>
              <Text style={styles.pondInfo}>pH: <Text style={{color: textMain}}>{pond.ph}</Text></Text>
              <Text style={styles.pondInfo}>O₂: <Text style={{color: textMain}}>{pond.oxygen} mg/L</Text></Text>
              <TouchableOpacity style={styles.detailsBtn}>
                <Text style={styles.detailsBtnText}>View Details</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        {/* Alerts Section */}
        <Text style={styles.sectionTitle}>Alerts</Text>
        {alerts.length === 0 ? (
          <Text style={styles.noAlerts}>No alerts. All ponds are safe!</Text>
        ) : (
          alerts.map((alert, idx) => (
            <View key={idx} style={styles.alertCard}>
              <Text style={styles.alertTitle}>{alert.title}</Text>
              <Text style={styles.alertMsg}>{alert.message}</Text>
            </View>
          ))
        )}
        {/* Tips Section */}
        <Text style={styles.sectionTitle}>Tips for Healthy Ponds</Text>
        {tips.map((tip, idx) => (
          <View key={idx} style={styles.tipCard}>
            <Text style={styles.tipTitle}>{tip.title}</Text>
            <Text style={styles.tipMsg}>{tip.message}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: primary,
    paddingTop: 48,
    paddingBottom: 20,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 4,
  },
  logo: {
    width: 48,
    height: 48,
    marginRight: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: primary,
    marginBottom: 12,
    marginTop: 18,
  },
  pondsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  pondCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    borderWidth: 2,
    elevation: 2,
    alignItems: 'center',
  },
  pondName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: textMain,
    marginBottom: 6,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  pondStatus: {
    fontSize: 14,
    fontWeight: '600',
  },
  pondInfo: {
    fontSize: 13,
    color: textSecondary,
    marginBottom: 2,
  },
  detailsBtn: {
    marginTop: 8,
    backgroundColor: primary,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  detailsBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  alertCard: {
    backgroundColor: '#FFF0EE',
    borderLeftWidth: 5,
    borderLeftColor: primary,
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    elevation: 1,
  },
  alertTitle: {
    color: primary,
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 2,
  },
  alertMsg: {
    color: textMain,
    fontSize: 13,
  },
  noAlerts: {
    color: '#43B581',
    fontSize: 15,
    marginBottom: 10,
  },
  tipCard: {
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    elevation: 1,
  },
  tipTitle: {
    color: primary,
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 2,
  },
  tipMsg: {
    color: textMain,
    fontSize: 13,
  },
});