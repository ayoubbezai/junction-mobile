import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { tipsServices } from '../../services/tipsServices';

const { width } = Dimensions.get('window');
const primary = '#FB3026';
const cardBg = '#FFF';
const textMain = '#1A1A1A';
const textSecondary = '#666';

export default function TipsScreen() {
    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedTips, setExpandedTips] = useState(new Set());

    useEffect(() => {
        fetchTips();
    }, []);

    const fetchTips = async () => {
        try {
            setLoading(true);
            const response = await tipsServices.getTips();
            console.log("tips response:", response?.data);

            if (response.success) {
                setTips(response?.data);
            } else {
                console.error('Failed to fetch tips:', response.message);
                setTips([]);
            }
        } catch (error) {
            console.error('Error fetching tips:', error);
            setTips([]);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const truncateMessage = (message, maxLength = 150) => {
        if (message.length <= maxLength) return message;
        return message.substring(0, maxLength) + '...';
    };

    const toggleTipExpansion = (tipId) => {
        const newExpandedTips = new Set(expandedTips);
        if (newExpandedTips.has(tipId)) {
            newExpandedTips.delete(tipId);
        } else {
            newExpandedTips.add(tipId);
        }
        setExpandedTips(newExpandedTips);
    };

    const getDisplayMessage = (tip) => {
        const isExpanded = expandedTips.has(tip.id);
        if (isExpanded) {
            return tip.message;
        }
        return truncateMessage(tip.message, 150);
    };

    return (
        <View style={styles.root}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Text style={styles.title}>Tips</Text>
                </View>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Tips List */}
                {tips && tips.length > 0 && tips.map((tip, index) => (
                    <View key={tip?.id} style={styles.tipCard}>
                        <View style={styles.tipHeader}>
                            <View style={styles.tipIconContainer}>
                                <Ionicons
                                    name="bulb"
                                    size={24}
                                    color="#10B981"
                                />
                            </View>
                            <View style={styles.tipContent}>
                                <Text style={styles.tipMessage}>{getDisplayMessage(tip)}</Text>
                                <Text style={styles.tipTime}>{formatDate(tip.created_at)}</Text>
                                {tip.message.length > 150 && (
                                    <TouchableOpacity
                                        style={styles.seeMoreButton}
                                        onPress={() => toggleTipExpansion(tip.id)}
                                    >
                                        <Text style={styles.seeMoreText}>
                                            {expandedTips.has(tip.id) ? 'See Less' : 'See More'}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                            <View style={styles.pondBadge}>
                                <Text style={styles.pondText}>
                                    Pond {tip.pond_id}
                                </Text>
                            </View>
                        </View>
                    </View>
                ))}

                {tips.length === 0 && !loading && (
                    <View style={styles.emptyState}>
                        <Ionicons name="bulb" size={48} color={textSecondary} />
                        <Text style={styles.emptyText}>No tips found</Text>
                    </View>
                )}

                {loading && (
                    <View style={styles.loadingState}>
                        <Text style={styles.loadingText}>Loading tips...</Text>
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
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => router.push('/(tabs)/alerts')}
                >
                    <Ionicons name="alert-circle" size={24} color="#666" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
                    <Ionicons name="bulb" size={24} color={primary} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => router.push('/(tabs)/pdfs')}
                >
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
    tipCard: {
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
    tipHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tipIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#ECFDF5',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    tipContent: {
        flex: 1,
    },
    tipMessage: {
        fontSize: 16,
        fontWeight: '600',
        color: textMain,
        marginBottom: 4,
        lineHeight: 22,
    },
    tipTime: {
        fontSize: 14,
        color: textSecondary,
    },
    seeMoreButton: {
        marginTop: 8,
        paddingVertical: 4,
    },
    seeMoreText: {
        fontSize: 14,
        color: '#10B981',
        fontWeight: '600',
    },
    pondBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        backgroundColor: '#E0F2FE',
    },
    pondText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#0284C7',
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