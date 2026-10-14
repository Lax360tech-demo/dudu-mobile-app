import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

export const ProductCard = ({ product }) => {
  const navigation = useNavigation();
  const { cart, addToCart, updateCartQuantity } = useApp();

  const cartItem = cart.find(item => item.product.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = product.stock <= 0;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate('ProductDetail', { productId: product.id })}
      style={styles.card}
    >
      {/* Top Image Container */}
      <View style={styles.imageContainer}>
        {product.discountPercent > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{product.discountPercent}% OFF</Text>
          </View>
        )}

        <View style={styles.deliveryBadge}>
          <Ionicons name="flash" size={10} color="#FBBF24" />
          <Text style={styles.deliveryBadgeText}>10 MINS</Text>
        </View>

        <View style={styles.vegIndicator}>
          <View style={[styles.vegOuter, { borderColor: product.isVeg ? '#059669' : '#B45309' }]}>
            <View style={[styles.vegInner, { backgroundColor: product.isVeg ? '#059669' : '#B45309' }]} />
          </View>
        </View>

        <Image source={{ uri: product.image }} style={styles.productImage} resizeMode="contain" />
      </View>

      {/* Details Container */}
      <View style={styles.detailsContainer}>
        <Text style={styles.brandText} numberOfLines={1}>{product.brand}</Text>
        <Text style={styles.titleText} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.unitText}>{product.unit}</Text>

        {/* Pricing & Add Stepper */}
        <View style={styles.bottomRow}>
          <View>
            <View style={styles.priceRow}>
              <Text style={styles.priceText}>₹{product.price}</Text>
              {product.mrp > product.price && (
                <Text style={styles.mrpText}>₹{product.mrp}</Text>
              )}
            </View>
          </View>

          {isOutOfStock ? (
            <View style={styles.outOfStockBadge}>
              <Text style={styles.outOfStockText}>SOLD OUT</Text>
            </View>
          ) : quantity === 0 ? (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => addToCart(product, 1)}
              style={styles.addButton}
            >
              <Text style={styles.addButtonText}>ADD</Text>
              <Ionicons name="add" size={14} color="#7C3AED" />
            </TouchableOpacity>
          ) : (
            <View style={styles.stepperContainer}>
              <TouchableOpacity
                onPress={() => updateCartQuantity(product.id, quantity - 1)}
                style={styles.stepperBtn}
              >
                <Ionicons name="remove" size={12} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.stepperQty}>{quantity}</Text>
              <TouchableOpacity
                onPress={() => updateCartQuantity(product.id, quantity + 1)}
                style={styles.stepperBtn}
              >
                <Ionicons name="add" size={12} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    margin: 5,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    justifyContent: 'space-between'
  },
  imageContainer: {
    height: 125,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: 8
  },
  productImage: {
    width: '90%',
    height: '90%'
  },
  discountBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#7C3AED',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    zIndex: 2
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800'
  },
  deliveryBadge: {
    position: 'absolute',
    bottom: 6,
    left: 6,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    zIndex: 2
  },
  deliveryBadgeText: {
    color: '#FBBF24',
    fontSize: 9,
    fontWeight: '800',
    marginLeft: 2
  },
  vegIndicator: {
    position: 'absolute',
    top: 6,
    right: 6,
    zIndex: 2
  },
  vegOuter: {
    width: 12,
    height: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 2
  },
  vegInner: {
    width: 6,
    height: 6,
    borderRadius: 3
  },
  detailsContainer: {
    padding: 10,
    flex: 1,
    justifyContent: 'space-between'
  },
  brandText: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600'
  },
  titleText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1E293B',
    marginTop: 2,
    lineHeight: 16
  },
  unitText: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
    fontWeight: '500'
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#F8FAFC'
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  priceText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A'
  },
  mrpText: {
    fontSize: 10,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
    marginLeft: 4
  },
  addButton: {
    backgroundColor: '#EDE9FE',
    borderWidth: 1,
    borderColor: '#C4B5FD',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  addButtonText: {
    color: '#7C3AED',
    fontSize: 11,
    fontWeight: '800',
    marginRight: 2
  },
  stepperContainer: {
    backgroundColor: '#7C3AED',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden'
  },
  stepperBtn: {
    paddingHorizontal: 7,
    paddingVertical: 5
  },
  stepperQty: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    minWidth: 16,
    textAlign: 'center'
  },
  outOfStockBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 8
  },
  outOfStockText: {
    color: '#94A3B8',
    fontSize: 9,
    fontWeight: '700'
  }
});
