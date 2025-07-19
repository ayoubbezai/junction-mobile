import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { pondsServices } from '../../services/pondsServices';

const { width } = Dimensions.get('window');
const primary = '#FB3026';
const cardBg = '#FFF';
const textMain = '#1A1A1A';
const textSecondary = '#666';



export default function PondsScreen() {
  const [ponds, setPonds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPonds();
  }, []);

  const fetchPonds = async () => {
    try {
      setLoading(true);
      const response = await pondsServices.getPonds();
      console.log("response?.data",response?.data)
      
      if (response.success) {
        
        setPonds(response?.data);
      } else {
        console.error('Failed to fetch ponds:', response.message);
        setPonds([]);
      }
    } catch (error) {
      console.error('Error fetching ponds:', error);
      setPonds([]);
    } finally {
      setLoading(false);
    }
  };

  const getSizeColor = (size) => {
    switch (size.toLowerCase()) {
      case 'large': return '#10B981';
      case 'medium': return '#F59E0B';
      case 'small': return '#EF4444';
      default: return textSecondary;
    }
  };

  return (
    <View style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Ponds</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>Pond Name</Text>
          </View>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>Location</Text>
          </View>
          <View style={styles.headerCell}>
            <Text style={styles.headerText}>Size</Text>
          </View>
        </View>

        {/* Table Rows */}
        {ponds && ponds.length > 0 && ponds.map((pond, index) => (
          <TouchableOpacity key={pond?.id} style={styles.tableRow}>
            <View style={styles.cell}>
              <Text style={styles.cellText}>{pond?.pond_name}</Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.cellText}>{pond.location}</Text>
            </View>
            <View style={styles.cell}>
              <View style={[styles.sizeBadge, { backgroundColor: getSizeColor(pond.size) + '20' }]}>
                <Text style={[styles.sizeText, { color: getSizeColor(pond.size) }]}>
                  {pond.size}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {ponds.length === 0 && !loading && (
          <View style={styles.emptyState}>
            <Ionicons name="water" size={48} color={textSecondary} />
            <Text style={styles.emptyText}>No ponds found</Text>
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
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Ionicons name="water" size={24} color={primary} />
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: textMain,
  },
  addButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: cardBg,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerCell: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: textMain,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: cardBg,
    borderRadius: 12,
    marginBottom: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    fontSize: 14,
    color: textMain,
    textAlign: 'center',
  },
  sizeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  sizeText: {
    fontSize: 12,
    fontWeight: 'bold',
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