import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { alertsServices } from '../../services/alertsServices';

const { width } = Dimensions.get('window');
const primary = '#FB3026';
const cardBg = '#FFF';
const textMain = '#1A1A1A';
const textSecondary = '#666';

export default function AlertsScreen() {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAlerts();
    }, []);

    const fetchAlerts = async () => {
        try {
            setLoading(true);
            const response = await alertsServices.getAlerts();
            console.log("alerts response:", response?.data);

            if (response.success) {
                setAlerts(response?.data);
            } else {
                console.error('Failed to fetch alerts:', response.message);
                setAlerts([]);
            }
        } catch (error) {
            console.error('Error fetching alerts:', error);
            setAlerts([]);
        } finally {
            setLoading(false);
        }
    };

    const getLevelColor = (level) => {
        switch (level.toLowerCase()) {
            case 'warning': return '#F59E0B';
            case 'danger': return '#EF4444';
            case 'info': return '#3B82F6';
            default: return textSecondary;
        }
    };

    const getLevelIcon = (level) => {
        switch (level.toLowerCase()) {
            case 'warning': return 'warning';
            case 'danger': return 'alert-circle';
            case 'info': return 'information-circle';
            default: return 'notifications';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <View style={styles.root}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Text style={styles.title}>Alerts</Text>
                </View>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Alerts List */}
                {alerts && alerts.length > 0 && alerts.map((alert, index) => (
                    <TouchableOpacity key={alert?.id} style={styles.alertCard}>
                        <View style={styles.alertHeader}>
                            <View style={styles.alertIconContainer}>
                                <Ionicons
                                    name={getLevelIcon(alert.level)}
                                    size={24}
                                    color={getLevelColor(alert.level)}
                                />
                            </View>
                            <View style={styles.alertContent}>
                                <Text style={styles.alertMessage}>{alert.message}</Text>
                                <Text style={styles.alertTime}>{formatDate(alert.created_at)}</Text>
                            </View>
                            <View style={[styles.levelBadge, { backgroundColor: getLevelColor(alert.level) + '20' }]}>
                                <Text style={[styles.levelText, { color: getLevelColor(alert.level) }]}>
                                    {alert.level}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}

                {alerts.length === 0 && !loading && (
                    <View style={styles.emptyState}>
                        <Ionicons name="notifications" size={48} color={textSecondary} />
                        <Text style={styles.emptyText}>No alerts found</Text>
                    </View>
                )}

                {loading && (
                    <View style={styles.loadingState}>
                        <Text style={styles.loadingText}>Loading alerts...</Text>
                    </View>
                )}
            </ScrollView>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => router.push('/(tabs)/dashboard')}
                >
                    <Ionicons name="home" size={24} color="#666" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => router.push('/(tabs)/ponds')}
                >
                    <Ionicons name="water" size={24} color="#666" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
                    <Ionicons name="alert-circle" size={24} color={primary} />
                </TouchableOpacity>
                        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="document-text" size={24} color="#666" />
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: textMain,
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    alertCard: {
        backgroundColor: cardBg,
        borderRadius: 16,
        marginTop: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    alertHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    alertIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#FEF2F2',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    alertContent: {
        flex: 1,
    },
    alertMessage: {
        fontSize: 16,
        fontWeight: '600',
        color: textMain,
        marginBottom: 4,
    },
    alertTime: {
        fontSize: 14,
        color: textSecondary,
    },
    levelBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    levelText: {
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyText: {
        fontSize: 16,
        color: textSecondary,
        marginTop: 12,
    },
    loadingState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    loadingText: {
        fontSize: 16,
        color: textSecondary,
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