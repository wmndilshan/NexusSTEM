import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StockStatus } from '../types';
import { Colors } from '../constants/colors';
import { Typography } from '../constants/typography';

interface Props {
  status: StockStatus;
  count?: number;
  size?: 'sm' | 'md';
}

const BADGE_CONFIG: Record<StockStatus, { label: string; bg: string; text: string }> = {
  in_stock: { label: 'In Stock', bg: Colors.success[50], text: Colors.success[700] },
  low_stock: { label: 'Low Stock', bg: Colors.warning[50], text: Colors.warning[700] },
  out_of_stock: { label: 'Out of Stock', bg: Colors.error[50], text: Colors.error[700] },
  preorder: { label: 'Pre-order', bg: Colors.primary[50], text: Colors.primary[700] },
};

export function StockBadge({ status, count, size = 'sm' }: Props) {
  const config = BADGE_CONFIG[status];
  const label = status === 'low_stock' && count !== undefined
    ? `${count} left`
    : config.label;

  return (
    <View style={[styles.badge, { backgroundColor: config.bg }, size === 'md' && styles.badgeMd]}>
      <Text style={[styles.text, { color: config.text }, size === 'md' && styles.textMd]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  badgeMd: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  text: {
    ...Typography.caption,
    fontWeight: '600',
  },
  textMd: {
    fontSize: 12,
    fontWeight: '600',
  },
});
