import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppContext } from '../context/AppContext';
import { RootStackParamList } from '../navigation/types';
import { CartItem } from '../components/CartItem';
import { AppButton } from '../components/AppButton';
import { colors, radii, shadows, typography } from '../styles/theme';


export function CartScreen() {
  const [checkoutMode, setCheckoutMode] = useState(false);
  const [orderSummary, setOrderSummary] = useState<{ total: number; itemCount: number } | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Cart'>>();
  const { cartItems, products, user, placeOrder, removeFromCart, updateCartQuantity } = useAppContext();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.headerIcon}>
          <Ionicons name="arrow-back" size={20} color={colors.navy} />
        </Pressable>
        <Text style={styles.title}>Carrito</Text>
        <View style={styles.headerIcon} />
      </View>
      {cartItems.length === 0 ? (
        <Text style={styles.empty}>El carrito está vacío.</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={item => String(item.productId)}
          contentContainerStyle={styles.cartList}
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
            return (
              <CartItem
                item={item}
                product={product}
                onDecrease={() => updateCartQuantity(item.productId, item.quantity - 1)}
                onIncrease={() => updateCartQuantity(item.productId, item.quantity + 1)}
                onRemove={() => removeFromCart(item.productId)}
              />
            );
          }}
        />
      )}
      <View style={styles.totalCard}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{total.toLocaleString('es-CO')}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Descuento</Text>
          <Text style={styles.totalValue}>$27.000</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={[styles.totalLabel, styles.freeText]}>Costo Envio</Text>
          <Text style={styles.freeText}>Gratis</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.totalRow}>
          <Text style={styles.grandLabel}>Total a pagar</Text>
          <Text style={styles.grandTotal}>$ {Math.max(total - 27000, 0).toLocaleString('es-CO')}</Text>
        </View>
      </View>
      <AppButton title="Seguir comprando" icon="storefront-outline" variant="secondary" onPress={() => navigation.navigate('Products')} style={styles.actionButton} />
      <View style={styles.spacer} />
      {orderSummary ? (
        <View style={styles.summaryCard}>
          <Text style={styles.checkoutTitle}>Resumen de compra</Text>
          <Text style={styles.checkoutText}>Cantidad de productos: {orderSummary.itemCount}</Text>
          <Text style={styles.checkoutText}>Total pagado: $ {orderSummary.total.toLocaleString('es-CO')}</Text>
          <View style={styles.spacer} />
          <AppButton title="Seguir comprando" icon="storefront-outline" onPress={() => setOrderSummary(null)} />
        </View>
      ) : checkoutMode ? (
        <View style={styles.summaryCard}>
          <Text style={styles.checkoutTitle}>Resumen de pago</Text>
          <Text style={styles.checkoutText}>Total a pagar: $ {total.toLocaleString('es-CO')}</Text>
          <View style={styles.spacer} />
          <AppButton
            disabled={!user || cartItems.length === 0}
            icon="card-outline"
            title="Pagar"
            onPress={async () => {
              const currentTotal = total;
              const currentItemCount = cartItems.length;
              await placeOrder();
              setOrderSummary({ total: currentTotal, itemCount: currentItemCount });
              setCheckoutMode(false);
            }}
          />
          <View style={styles.spacer} />
          <AppButton title="Volver al carrito" icon="cart-outline" variant="secondary" onPress={() => setCheckoutMode(false)} />
        </View>
      ) : (
        <AppButton
          disabled={!user || cartItems.length === 0}
          icon="arrow-forward"
          title="Ir a pagar"
          onPress={() => setCheckoutMode(true)}
          style={styles.actionButton}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 12,
    backgroundColor: colors.surface,
  },
  headerIcon: {
    alignItems: 'center',
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  title: {
    ...typography.title,
    color: colors.navy,
    fontSize: 18,
  },
  userName: {
    ...typography.body,
    color: colors.muted,
    fontSize: 16,
    marginBottom: 18,
    marginTop: 4,
  },
  empty: {
    paddingHorizontal: 18,
    marginVertical: 24,
    fontSize: 16,
    color: colors.muted,
  },
  cartList: {
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 120,
  },
  totalCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    marginHorizontal: 18,
    marginVertical: 16,
    padding: 18,
    ...shadows.soft,
  },
  totalRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  totalLabel: {
    ...typography.body,
    color: colors.primary,
    fontSize: 13,
  },
  totalValue: {
    ...typography.body,
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  freeText: {
    color: colors.success,
    fontWeight: '800',
  },
  divider: {
    backgroundColor: colors.border,
    height: 1,
    marginBottom: 14,
    marginTop: 4,
  },
  grandLabel: {
    ...typography.title,
    color: colors.primary,
    fontSize: 15,
  },
  grandTotal: {
    ...typography.title,
    color: colors.primary,
    fontSize: 15,
  },
  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    marginHorizontal: 18,
    padding: 18,
    ...shadows.card,
  },
  actionButton: {
    marginHorizontal: 18,
  },
  checkoutTitle: {
    ...typography.title,
    fontSize: 20,
    marginBottom: 10,
    color: colors.primary,
  },
  checkoutText: {
    ...typography.body,
    fontSize: 16,
    marginBottom: 12,
    color: colors.text,
  },
  spacer: {
    height: 12,
  },
});
