import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';

export const HomeScreen = ({ navigation }) => {
  const { products, categories, selectedAddress, cart, getCartTotals } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  const { itemCount, grandTotal } = getCartTotals();

  const filteredProducts = searchQuery.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const trendingProducts = products.slice(0, 4);
  const dairyProducts = products.filter(p => p.categoryId === 'cat-dairy').slice(0, 4);
  const freshProduce = products.filter(p => p.categoryId === 'cat-groceries').slice(0, 4);

  return (
    <View style={styles.container}>
      {/* Top Location Bar */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.locationContainer} activeOpacity={0.8}>
          <View style={styles.locationIconWrapper}>
            <Ionicons name="location" size={14} color="#7C3AED" />
          </View>
          <View style={styles.locationTextWrapper}>
            <View style={styles.locationTitleRow}>
              <Text style={styles.locationTitle}>{selectedAddress?.tag || 'Home'}</Text>
              <Ionicons name="chevron-down" size={12} color="#475569" />
            </View>
            <Text style={styles.locationSubtitle} numberOfLines={1}>
              {selectedAddress?.flat || 'Linking Rd'}, {selectedAddress?.area || 'Bandra West'}
            </Text>
          </View>
        </TouchableOpacity>

        {/* 10 Min Guarantee Tag */}
        <View style={styles.etaPill}>
          <Ionicons name="flash" size={12} color="#FFFFFF" />
          <Text style={styles.etaText}>10 MINS</Text>
        </View>
      </View>

      {/* Search Input Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={16} color="#94A3B8" />
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder='Search "Alphonso Mango", "Milk", "Earbuds"...'
          placeholderTextColor="#94A3B8"
          style={styles.searchInput}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={16} color="#94A3B8" />
          </TouchableOpacity>
        )}
      </View>

      {/* Main Content Area */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {searchQuery.trim().length > 0 ? (
          <View style={styles.searchResultsContainer}>
            <Text style={styles.sectionTitle}>
              Found {filteredProducts.length} items for "{searchQuery}"
            </Text>
            <View style={styles.productsGrid}>
              {filteredProducts.map(item => (
                <View key={item.id} style={styles.gridItem}>
                  <ProductCard product={item} />
                </View>
              ))}
            </View>
          </View>
        ) : (
          <>
            {/* Promo Carousel Banner */}
            <View style={styles.banner}>
              <View style={styles.bannerBadge}>
                <Text style={styles.bannerBadgeText}>⚡ 10 MINS DISPATCH</Text>
              </View>
              <Text style={styles.bannerTitle}>Midnight Cravings & Essentials</Text>
              <Text style={styles.bannerSubtitle}>Use code LAXFIRST for Flat ₹100 OFF</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Categories')}
                style={styles.bannerBtn}
              >
                <Text style={styles.bannerBtnText}>Shop Now</Text>
                <Ionicons name="arrow-forward" size={12} color="#0F172A" />
              </TouchableOpacity>
            </View>

            {/* Category Circular Quick Rails */}
            <View style={styles.categorySection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Explore Categories</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
                  <Text style={styles.seeAllText}>See All</Text>
                </TouchableOpacity>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRail}>
                {categories.map(cat => (
                  <TouchableOpacity
                    key={cat.id}
                    onPress={() => navigation.navigate('Categories', { categoryId: cat.id })}
                    style={styles.categoryBubble}
                  >
                    <Image source={{ uri: cat.banner }} style={styles.categoryImg} />
                    <Text style={styles.categoryName} numberOfLines={1}>{cat.name.split(',')[0]}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Trending Rail */}
            <View style={styles.railSection}>
              <View style={styles.sectionHeader}>
                <View style={styles.titleWithIcon}>
                  <Text style={styles.fireEmoji}>🔥</Text>
                  <Text style={styles.sectionTitle}>Trending in Bandra West</Text>
                </View>
                <Text style={styles.etaSubtitle}>10-12 Mins</Text>
              </View>

              <View style={styles.productsGrid}>
                {trendingProducts.map(p => (
                  <View key={p.id} style={styles.gridItem}>
                    <ProductCard product={p} />
                  </View>
                ))}
              </View>
            </View>

            {/* Farm Fresh Greens Rail */}
            <View style={styles.railSection}>
              <View style={styles.sectionHeader}>
                <View style={styles.titleWithIcon}>
                  <Text style={styles.fireEmoji}>🥬</Text>
                  <Text style={styles.sectionTitle}>Farm Fresh Daily Produce</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Categories', { categoryId: 'cat-groceries' })}>
                  <Text style={styles.seeAllText}>View All</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.productsGrid}>
                {freshProduce.map(p => (
                  <View key={p.id} style={styles.gridItem}>
                    <ProductCard product={p} />
                  </View>
                ))}
              </View>
            </View>

            {/* Dairy & Breakfast */}
            <View style={styles.railSection}>
              <View style={styles.sectionHeader}>
                <View style={styles.titleWithIcon}>
                  <Text style={styles.fireEmoji}>🥛</Text>
                  <Text style={styles.sectionTitle}>Dairy & Bakery</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Categories', { categoryId: 'cat-dairy' })}>
                  <Text style={styles.seeAllText}>View All</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.productsGrid}>
                {dairyProducts.map(p => (
                  <View key={p.id} style={styles.gridItem}>
                    <ProductCard product={p} />
                  </View>
                ))}
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {/* Floating Bottom Cart Bar (Appears when items are in cart) */}
      {itemCount > 0 && (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate('Cart')}
          style={styles.floatingCart}
        >
          <View style={styles.floatingCartLeft}>
            <View style={styles.cartCountBadge}>
              <Text style={styles.cartCountText}>{itemCount}</Text>
            </View>
            <View>
              <Text style={styles.cartPriceText}>₹{grandTotal}</Text>
              <Text style={styles.cartEtaText}>⚡ 10 min express dispatch</Text>
            </View>
          </View>

          <View style={styles.cartViewBtn}>
            <Text style={styles.cartViewText}>View Cart</Text>
            <Ionicons name="arrow-forward" size={14} color="#7C3AED" />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC'
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9'
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  locationIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#EDE9FE',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8
  },
  locationTitleRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  locationTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    marginRight: 4
  },
  locationSubtitle: {
    fontSize: 10,
    color: '#64748B',
    maxWidth: 180
  },
  etaPill: {
    backgroundColor: '#EA580C',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20
  },
  etaText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
    marginLeft: 3
  },
  searchBar: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 14,
    marginVertical: 10,
    paddingHorizontal: 12,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: '#0F172A',
    marginLeft: 8
  },
  scrollContent: {
    paddingBottom: 90
  },
  banner: {
    marginHorizontal: 14,
    backgroundColor: '#4C1D95',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16
  },
  bannerBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 6
  },
  bannerBadgeText: {
    color: '#FBBF24',
    fontSize: 9,
    fontWeight: '800'
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 20
  },
  bannerSubtitle: {
    color: '#DDD6FE',
    fontSize: 11,
    marginTop: 4
  },
  bannerBtn: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 10
  },
  bannerBtnText: {
    color: '#0F172A',
    fontSize: 11,
    fontWeight: '800',
    marginRight: 4
  },
  categorySection: {
    marginBottom: 16
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 10
  },
  titleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  fireEmoji: {
    fontSize: 14,
    marginRight: 6
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A'
  },
  seeAllText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7C3AED'
  },
  etaSubtitle: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '600'
  },
  categoryRail: {
    paddingLeft: 14
  },
  categoryBubble: {
    alignItems: 'center',
    marginRight: 12,
    width: 64
  },
  categoryImg: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  categoryName: {
    fontSize: 10,
    fontWeight: '700',
    color: '#334155',
    marginTop: 4,
    textAlign: 'center'
  },
  railSection: {
    marginBottom: 16
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 9
  },
  gridItem: {
    width: '50%'
  },
  searchResultsContainer: {
    paddingHorizontal: 14
  },
  floatingCart: {
    position: 'absolute',
    bottom: 12,
    left: 14,
    right: 14,
    backgroundColor: '#7C3AED',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6
  },
  floatingCartLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cartCountBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10
  },
  cartCountText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800'
  },
  cartPriceText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900'
  },
  cartEtaText: {
    color: '#DDD6FE',
    fontSize: 10,
    fontWeight: '500'
  },
  cartViewBtn: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10
  },
  cartViewText: {
    color: '#7C3AED',
    fontSize: 12,
    fontWeight: '800',
    marginRight: 4
  }
});
