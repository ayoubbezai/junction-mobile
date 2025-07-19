import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { pdfsServices } from '../../services/pdfsServices';

const { width } = Dimensions.get('window');
const primary = '#FB3026';
const cardBg = '#FFF';
const textMain = '#1A1A1A';
const textSecondary = '#666';

export default function PdfsScreen() {
    const [pdfs, setPdfs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPdfs();
    }, []);

    const fetchPdfs = async () => {
        try {
            setLoading(true);
            const response = await pdfsServices.getPdfs();
            console.log("pdfs response:", response?.data);

            if (response.success) {
                setPdfs(response?.data);
            } else {
                console.error('Failed to fetch PDFs:', response.message);
                setPdfs([]);
            }
        } catch (error) {
            console.error('Error fetching PDFs:', error);
            setPdfs([]);
        } finally {
            setLoading(false);
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const openPdf = async (url) => {
        try {
            await Linking.openURL(url);
        } catch (error) {
            console.error('Error opening PDF:', error);
        }
    };

    const getFileIcon = (filename) => {
        const extension = filename.split('.').pop().toLowerCase();
        switch (extension) {
            case 'pdf':
                return 'document-text';
            case 'txt':
                return 'document';
            case 'doc':
            case 'docx':
                return 'document-text';
            default:
                return 'document';
        }
    };

    const getFileColor = (filename) => {
        const extension = filename.split('.').pop().toLowerCase();
        switch (extension) {
            case 'pdf':
                return '#EF4444';
            case 'txt':
                return '#6B7280';
            case 'doc':
            case 'docx':
                return '#3B82F6';
            default:
                return '#6B7280';
        }
    };

    return (
        <View style={styles.root}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Text style={styles.title}>Documents</Text>
                </View>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* PDFs List */}
                {pdfs && pdfs.length > 0 && pdfs.map((pdf, index) => (
                    <TouchableOpacity 
                        key={pdf?.filename} 
                        style={styles.pdfCard}
                        onPress={() => openPdf(pdf.url)}
                    >
                        <View style={styles.pdfHeader}>
                            <View style={styles.pdfIconContainer}>
                                <Ionicons
                                    name={getFileIcon(pdf.filename)}
                                    size={24}
                                    color={getFileColor(pdf.filename)}
                                />
                            </View>
                            <View style={styles.pdfContent}>
                                <Text style={styles.pdfName}>{pdf.filename}</Text>
                                <Text style={styles.pdfDetails}>
                                    {formatFileSize(pdf.size)} • {formatDate(pdf.last_modified)}
                                </Text>
                            </View>
                            <View style={styles.downloadBadge}>
                                <Ionicons name="download" size={16} color="#10B981" />
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}

                {pdfs.length === 0 && !loading && (
                    <View style={styles.emptyState}>
                        <Ionicons name="document-text" size={48} color={textSecondary} />
                        <Text style={styles.emptyText}>No documents found</Text>
                    </View>
                )}

                {loading && (
                    <View style={styles.loadingState}>
                        <Text style={styles.loadingText}>Loading documents...</Text>
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
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => router.push('/(tabs)/tips')}
                >
                    <Ionicons name="bulb" size={24} color="#666" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
                    <Ionicons name="document-text" size={24} color={primary} />
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
    pdfCard: {
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
    pdfHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    pdfIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    pdfContent: {
        flex: 1,
    },
    pdfName: {
        fontSize: 16,
        fontWeight: '600',
        color: textMain,
        marginBottom: 4,
    },
    pdfDetails: {
        fontSize: 14,
        color: textSecondary,
    },
    downloadBadge: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#ECFDF5',
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