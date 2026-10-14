import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';

export const CategoriesScreen = ({ route, navigation }) => {
  const { categories, products } = useApp();
  const initialCatId = route.params?.categoryId || categories[0]?.id || 'cat-groceries';
  const [selectedCatId, setSelectedCatId] = useState(initialCatId);

  const currentCategory = categories.find(c => c.id === selectedCatId) || categories[0];
  const categoryProducts = products.filter(p => p.categoryId === selectedCatId);

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{currentCategory?.name || 'Categories'}</Text>
        <Text style={styles.headerCount}>{categoryProducts.length} items</Text>
      </View>

      <View style={styles.body}>
        {/* Left Vertical Category Rail */}
        <ScrollView style={styles.leftRail} showsVerticalScrollIndicator={false}>
          {categories.map(cat => {
            const isSelected = cat.id === selectedCatId;
            return (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setSelectedCatId(cat.id)}
                style={[styles.railItem, isSelected && styles.railItemActive]}
              >
                <Image source={{ uri: cat.banner }} style={styles.railImg} />
                <Text
                  style={[styles.railText, isSelected && styles.railTextActive]}
                  numberOfLines={2}
                >
                  {cat.name.split(',')[0]}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Right Products Grid */}
        <ScrollView style={styles.rightContent} showsVerticalScrollIndicator={false}>
          <View style={styles.catBannerCard}>
            <Text style={styles.catBannerTitle}>{currentCategory?.name}</Text>
            <Text style={styles.catBannerSubtitle}>{currentCategory?.description}</Text>
          </View>

          <View style={styles.productsGrid}>
            {categoryProducts.map(prod => (
              <View key={prod.id} style={styles.gridItem}>
                <ProductCard product={prod} />
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A'
  },
  headerCount: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600'
  },
  body: {
    flex: 1,
    flexDirection: 'row'
  },
  leftRail: {
    width: 80,
    backgroundColor: '#F8FAFC',
    borderRightWidth: 1,
    borderRightColor: '#F1F5F9'
  },
  railItem: {
    paddingVertical: 12,
    paddingHorizontal: 6,
    alignItems: 'center'
  },
  railItemActive: {
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 3,
    borderLeftColor: '#7C3AED'
  },
  railImg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 4
  },
  railText: {
    fontSize: 9,
    color: '#64748B',
    textAlign: 'center',
    fontWeight: '600'
  },
  railTextActive: {
    color: '#7C3AED',
    fontWeight: '800'
  },
  rightContent: {
    flex: 1,
    padding: 10
  },
  catBannerCard: {
    backgroundColor: '#F5F3FF',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EDE9FE',
    marginBottom: 10
  },
  catBannerTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#5B21B6'
  },
  catBannerSubtitle: {
    fontSize: 10,
    color: '#7C3AED',
    marginTop: 2
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  gridItem: {
    width: '50%'
  }
});
