import React, { useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { useAppContext } from '../context/AppContext';
import { RootStackParamList } from '../navigation/types';

export function ProductDetailScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Detail'>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Detail'>>();
  const { addToCart } = useAppContext();
  const [quantity, setQuantity] = useState('1');
  const { product } = route.params;

  const handleAdd = () => {
    const qty = Number(quantity);
    if (qty > 0) {
      addToCart(product, qty);
      navigation.navigate('Cart');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Button title="Volver" onPress={() => navigation.goBack()} />
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.stock}>Stock disponible: {product.stock}</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={quantity}
          onChangeText={setQuantity}
          placeholder="Cantidad"
        />
        <Button title="Agregar al carrito" onPress={handleAdd} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eff3f7',
  },
  image: {
    width: '100%',
    height: 260,
    resizeMode: 'cover',
  },
  details: {
    padding: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  price: {
    color: '#1f6f8b',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: '#444',
  },
  stock: {
    marginBottom: 12,
    color: '#777',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});
