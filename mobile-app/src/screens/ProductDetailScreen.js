import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

export const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params || {};
  const { products, cart, addToCart, updateCartQuantity, selectedAddress } = useApp();

  const product = products.find(p => p.id === productId) || products[0];
  const cartItem = cart.find(ci => ci.product.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = product.stock <= 0;

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={20} color="#0F172A" />
        </TouchableOpacity>
        <Text style={styles.headerBrand}>{product.brand}</Text>
        <TouchableOpacity onPress={() => alert('Demo share link copied!')} style={styles.backBtn}>
          <Ionicons name="share-outline" size={18} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Large Product Image */}
        <View style={styles.imageCard}>
          {product.discountPercent > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>{product.discountPercent}% OFF</Text>
            </View>
          )}

          <Image source={{ uri: product.image }} style={styles.heroImage} resizeMode="contain" />
        </View>

        {/* Product Info */}
        <View style={styles.infoSection}>
          <Text style={styles.brandTitle}>{product.brand}</Text>
          <Text style={styles.productTitle}>{product.name}</Text>
          <Text style={styles.unitText}>Unit: {product.unit}</Text>

          {/* Pricing & 10 Min delivery */}
          <View style={styles.priceRow}>
            <View>
              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>₹{product.price}</Text>
                {product.mrp > product.price && (
                  <Text style={styles.mrpText}>₹{product.mrp}</Text>
                )}
              </View>
              <Text style={styles.taxText}>(Inclusive of all taxes)</Text>
            </View>

            <View style={styles.deliveryBadge}>
              <Ionicons name="flash" size={12} color="#FFFFFF" />
              <Text style={styles.deliveryBadgeText}>10 MINS</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descContainer}>
            <Text style={styles.descTitle}>About Product</Text>
            <Text style={styles.descText}>{product.description}</Text>

            {product.storage && (
              <View style={styles.storageBox}>
                <Text style={styles.storageTitle}>Storage:</Text>
                <Text style={styles.storageText}>{product.storage}</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Floating Bottom Add Bar */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.totalPriceLabel}>Total Price</Text>
          <Text style={styles.totalPriceText}>
            ₹{quantity > 0 ? product.price * quantity : product.price}
          </Text>
        </View>

        {isOutOfStock ? (
          <View style={styles.outOfStockBtn}>
            <Text style={styles.outOfStockText}>Out of Stock</Text>
          </View>
        ) : quantity === 0 ? (
          <TouchableOpacity
            onPress={() => addToCart(product, 1)}
            style={styles.addCartBtn}
          >
            <Text style={styles.addCartBtnText}>ADD TO CART</Text>
            <Ionicons name="add" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        ) : (
          <View style={styles.stepperContainer}>
            <TouchableOpacity
              onPress={() => updateCartQuantity(product.id, quantity - 1)}
              style={styles.stepperBtn}
            >
              <Ionicons name="remove" size={16} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.stepperQty}>{quantity}</Text>
            <TouchableOpacity
              onPress={() => updateCartQuantity(product.id, quantity + 1)}
              style={styles.stepperBtn}
            >
              <Ionicons name="add" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9'
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerBrand: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B'
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 90
  },
  imageCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 24,
    height: 240,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    padding: 16
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#7C3AED',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800'
  },
  heroImage: {
    width: '80%',
    height: '80%'
  },
  infoSection: {
    marginTop: 16
  },
  brandTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#7C3AED',
    textTransform: 'uppercase'
  },
  productTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
    marginTop: 4,
    lineHeight: 24
  },
  unitText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
    fontWeight: '600'
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    padding: 14,
    borderRadius: 16,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  priceText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0F172A'
  },
  mrpText: {
    fontSize: 12,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
    marginLeft: 6
  },
  taxText: {
    fontSize: 10,
    color: '#94A3B8'
  },
  deliveryBadge: {
    backgroundColor: '#EA580C',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14
  },
  deliveryBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '900',
    marginLeft: 3
  },
  descContainer: {
    marginTop: 20
  },
  descTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 6
  },
  descText: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18
  },
  storageBox: {
    backgroundColor: '#F5F3FF',
    padding: 12,
    borderRadius: 12,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#EDE9FE'
  },
  storageTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#5B21B6'
  },
  storageText: {
    fontSize: 11,
    color: '#6D28D9',
    marginTop: 2
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 8
  },
  totalPriceLabel: {
    fontSize: 10,
    color: '#94A3B8'
  },
  totalPriceText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0F172A'
  },
  addCartBtn: {
    backgroundColor: '#7C3AED',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14
  },
  addCartBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '900',
    marginRight: 4
  },
  stepperContainer: {
    backgroundColor: '#7C3AED',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    overflow: 'hidden'
  },
  stepperBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10
  },
  stepperQty: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    minWidth: 20,
    textAlign: 'center'
  },
  outOfStockBtn: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12
  },
  outOfStockText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700'
  }
});
