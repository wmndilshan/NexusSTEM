import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { CartItem } from '../types';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';
import { Shadow, Layout } from '../constants/spacing';
import { QuantityControl } from './QuantityControl';

interface Props {
  item: CartItem;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

function formatLKR(amount: number) {
  return `LKR ${amount.toLocaleString('en-LK')}`;
}

export function CartRow({ item, onUpdateQuantity, onRemove }: Props) {
  return (
    <View style={[styles.container, Shadow.sm]}>
      <Image
        source={{ uri: item.product.images[0] }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={2}>{item.product.name}</Text>
          <Pressable onPress={onRemove} hitSlop={8}>
            <Text style={styles.remove}>✕</Text>
          </Pressable>
        </View>
        <Text style={styles.sku}>{item.product.sku}</Text>
        <View style={styles.footer}>
          <QuantityControl
            quantity={item.quantity}
            onDecrement={() => onUpdateQuantity(item.quantity - 1)}
            onIncrement={() => onUpdateQuantity(item.quantity + 1)}
            max={item.product.stockCount > 0 ? item.product.stockCount : 99}
            size="sm"
          />
          <Text style={styles.price}>{formatLKR(item.product.price * item.quantity)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: Layout.cardRadius,
    overflow: 'hidden',
    gap: 12,
    padding: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: Colors.neutral[100],
  },
  content: {
    flex: 1,
    gap: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  name: {
    ...Typography.bodySmall,
    fontWeight: '600',
    color: Colors.textPrimary,
    flex: 1,
    lineHeight: 18,
  },
  remove: {
    fontSize: 14,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  sku: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  price: {
    ...Typography.price,
    color: Colors.textPrimary,
  },
});
