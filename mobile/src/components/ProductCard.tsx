import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../types';
import { resolveImageUrl } from '../services/api';
import { colors, radii, shadows, typography } from '../styles/theme';

interface Props {
  product: Product;
  onPress: () => void;
  onAdd: () => void;
  fullWidth?: boolean;
}

export function ProductCard({ product, onPress, onAdd, fullWidth = false }: Props) {
  const imageUri = resolveImageUrl(product.image);
  const [imageFailed, setImageFailed] = useState(false);
  const shouldShowImage = imageUri && !imageFailed;

  return (
    <View style={[styles.card, fullWidth && styles.fullCard]}>
      <View style={styles.badge}>
        <Ionicons name="star" size={12} color={colors.warning} />
        <Text style={styles.badgeText}>Oferta</Text>
      </View>
      <View style={styles.imageFrame}>
        {shouldShowImage ? (
          <Image
            source={{ uri: encodeURI(imageUri) }}
            style={styles.image}
            resizeMode="cover"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <View style={[styles.image, styles.imageFallback]}>
            <Text style={styles.imageFallbackText}>Sin imagen</Text>
          </View>
        )}
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>$ {product.price.toLocaleString('es-CO')}</Text>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={12} color={colors.warning} />
          <Text style={styles.rating}>4.{product.id % 7}</Text>
        </View>
        <Text style={styles.description} numberOfLines={2}>{product.description}</Text>
        <View style={styles.actionsRow}>
          <Pressable
            style={state => [
              styles.detailButton,
              (state.pressed || Boolean((state as { hovered?: boolean }).hovered)) && styles.buttonActive,
            ]}
            onPress={onPress}
          >
            <Ionicons name="eye-outline" size={15} color={colors.accent} style={styles.actionIcon} />
            <Text style={styles.detailText}>Ver</Text>
          </Pressable>
          <Pressable
            style={state => [
              styles.addButton,
              (state.pressed || Boolean((state as { hovered?: boolean }).hovered)) && styles.buttonActive,
            ]}
            onPress={onAdd}
          >
            <Ionicons name="cart-outline" size={15} color={colors.surface} style={styles.actionIcon} />
            <Text style={styles.addText}>Agregar</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 0,
    padding: 10,
    marginBottom: 12,
    ...shadows.card,
  },
  fullCard: {
    width: '100%',
  },
  imageFrame: {
    width: '100%',
    height: 96,
    borderRadius: radii.md,
    overflow: 'hidden',
    backgroundColor: colors.surfaceSoft,
    marginBottom: 8,
    padding: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageFallback: {
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageFallbackText: {
    ...typography.body,
    color: colors.muted,
    fontSize: 13,
    fontWeight: '800',
    textAlign: 'center',
  },
  info: {
    flex: 1,
  },
  name: {
    ...typography.body,
    color: colors.text,
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 4,
  },
  price: {
    ...typography.title,
    color: colors.primary,
    marginBottom: 3,
    fontSize: 18,
  },
  ratingRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
    marginBottom: 6,
  },
  rating: {
    ...typography.body,
    color: colors.muted,
    fontSize: 13,
    fontWeight: '800',
  },
  description: {
    ...typography.body,
    color: colors.muted,
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 10,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  detailButton: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 9,
    borderRadius: radii.sm,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 9,
    borderRadius: radii.sm,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    marginRight: 5,
  },
  buttonActive: {
    opacity: 0.86,
    transform: [{ scale: 0.98 }],
  },
  detailText: {
    ...typography.body,
    color: colors.accent,
    fontWeight: '800',
    fontSize: 13,
  },
  addText: {
    ...typography.body,
    color: colors.surface,
    fontWeight: '800',
    fontSize: 13,
  },
  badge: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#EAF7F2',
    borderRadius: radii.sm,
    flexDirection: 'row',
    gap: 3,
    marginBottom: 6,
    paddingHorizontal: 7,
    paddingVertical: 4,
  },
  badgeText: {
    ...typography.body,
    color: colors.text,
    fontSize: 11,
    fontWeight: '800',
  },
});
