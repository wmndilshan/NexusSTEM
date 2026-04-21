import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Product } from '../types';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Shadow, Layout } from '../constants/spacing';
import { StockBadge } from './StockBadge';
import { PreorderBadge } from './PreorderBadge';

interface Props {
  product: Product;
  onPress: () => void;
  style?: object;
}

function formatLKR(amount: number) {
  return `LKR ${amount.toLocaleString('en-LK')}`;
}

export function ProductCard({ product, onPress, style }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, Shadow.sm, style, pressed && styles.pressed]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.images[0] }}
          style={styles.image}
          resizeMode="cover"
        />
        {product.isPreorder && (
          <View style={styles.imageBadge}>
            <PreorderBadge />
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.category} numberOfLines={1}>{product.categoryName}</Text>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>{formatLKR(product.price)}</Text>
          <StockBadge status={product.stockStatus} count={product.stockCount} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Layout.cardRadius,
    overflow: 'hidden',
    flex: 1,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.985 }],
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: Colors.neutral[100],
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
  },
  content: {
    padding: 12,
    gap: 4,
  },
  category: {
    ...Typography.caption,
    color: Colors.brandAccent,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  name: {
    ...Typography.bodySmall,
    color: Colors.textPrimary,
    fontWeight: '600',
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
    gap: 4,
    flexWrap: 'wrap',
  },
  price: {
    ...Typography.price,
    color: Colors.textPrimary,
  },
});
