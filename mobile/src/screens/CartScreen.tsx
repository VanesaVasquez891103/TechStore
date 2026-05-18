import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppContext } from '../context/AppContext';
import { RootStackParamList } from '../navigation/types';
import { CartItem } from '../components/CartItem';

export function CartScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Cart'>>();
  const { cartItems, products, user, placeOrder, removeFromCart } = useAppContext();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <Button title="Volver" onPress={() => navigation.goBack()} />
      <Text style={styles.title}>Carrito</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.empty}>El carrito está vacío.</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={item => String(item.productId)}
          renderItem={({ item }) => {
            const product = products.find(product => product.id === item.productId) || {
              id: item.productId,
              name: 'Producto desconocido',
              price: item.price,
              stock: 0,
              categoryId: 0,
              description: '',
              image: '',
            };
            return <CartItem item={item} product={product} onRemove={() => removeFromCart(item.productId)} />;
          }}
        />
      )}
      <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
      <Button disabled={!user || cartItems.length === 0} title="Confirmar pedido" onPress={async () => {
          await placeOrder();
          navigation.replace('Home');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#eff3f7',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginVertical: 16,
    color: '#1f6f8b',
  },
  empty: {
    marginVertical: 24,
    fontSize: 16,
    color: '#777',
  },
  total: {
    fontSize: 20,
    fontWeight: '700',
    marginVertical: 16,
  },
});
