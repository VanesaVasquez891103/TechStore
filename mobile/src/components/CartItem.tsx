import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OrderItem, Product } from '../types';
import { resolveImageUrl } from '../services/api';
import { colors, radii, shadows, typography } from '../styles/theme';

interface Props {
  item: OrderItem;
  product: Product;
  onDecrease: () => void;
  onIncrease: () => void;
  onRemove: () => void;
}

export function CartItem({ item, product, onDecrease, onIncrease, onRemove }: Props) {
  const imageUri = resolveImageUrl(product.image);

  return (
    <View style={styles.container}>
      {imageUri ? <Image source={{ uri: encodeURI(imageUri) }} style={styles.image} resizeMode="contain" /> : null}
      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.variant}>With Glass</Text>
        <Text style={styles.price}>$ {(item.quantity * item.price).toLocaleString('es-CO')}</Text>
        <View style={styles.quantityRow}>
          <Pressable onPress={onDecrease} style={state => [styles.quantityButton, (state.pressed || Boolean((state as { hovered?: boolean }).hovered)) && styles.active]}>
            <Ionicons name="remove" size={14} color={colors.primary} />
          </Pressable>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <Pressable onPress={onIncrease} style={state => [styles.quantityButton, (state.pressed || Boolean((state as { hovered?: boolean }).hovered)) && styles.active]}>
            <Ionicons name="add" size={14} color={colors.primary} />
          </Pressable>
        </View>
      </View>
      <Pressable onPress={onRemove} style={state => [styles.removeButton, (state.pressed || Boolean((state as { hovered?: boolean }).hovered)) && styles.active]}>
        <Ionicons name="trash-outline" size={18} color={colors.surface} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 10,
    marginVertical: 8,
    borderRadius: radii.md,
    ...shadows.soft,
  },
  image: {
    backgroundColor: colors.surfaceSoft,
    borderRadius: radii.sm,
    height: 58,
    marginRight: 10,
    width: 72,
  },
  info: {
    flex: 1,
    paddingRight: 12,
  },
  name: {
    ...typography.title,
    fontSize: 13,
    marginBottom: 2,
  },
  variant: {
    ...typography.body,
    color: colors.muted,
    fontSize: 11,
    marginBottom: 3,
  },
  price: {
    ...typography.title,
    color: colors.primary,
    fontSize: 12,
    marginBottom: 8,
  },
  quantityRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  quantityButton: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 4,
    borderWidth: 1,
    height: 20,
    justifyContent: 'center',
    width: 20,
  },
  quantity: {
    minWidth: 26,
    textAlign: 'center',
    ...typography.body,
    color: colors.text,
    fontSize: 12,
    fontWeight: '700',
  },
  removeButton: {
    alignSelf: 'center',
    backgroundColor: colors.danger,
    borderRadius: radii.md,
    height: 56,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  active: {
    opacity: 0.86,
    transform: [{ scale: 0.98 }],
  },
});
