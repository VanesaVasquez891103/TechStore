import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { OrderItem, Product } from '../types';

interface Props {
  item: OrderItem;
  product: Product;
  onRemove: () => void;
}

export function CartItem({ item, product, onRemove }: Props) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.quantity}>Cantidad: {item.quantity}</Text>
        <Text style={styles.price}>Subtotal: ${(item.quantity * item.price).toFixed(2)}</Text>
      </View>
      <TouchableOpacity onPress={onRemove} style={styles.button}>
        <Text style={styles.buttonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
    elevation: 1,
  },
  name: {
    fontWeight: '700',
    marginBottom: 4,
  },
  quantity: {
    color: '#444',
  },
  price: {
    color: '#1f6f8b',
    fontWeight: '700',
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#ff5c5c',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
});
