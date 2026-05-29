import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { useAppContext } from '../context/AppContext';
import { RootStackParamList } from '../navigation/types';
import { resolveImageUrl } from '../services/api';
import { AppButton } from '../components/AppButton';
import { colors, radii, shadows, sharedStyles, typography } from '../styles/theme';

export function ProductDetailScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Detail'>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Detail'>>();
  const { addToCart, user } = useAppContext();
  const [quantity, setQuantity] = useState('1');
  const [imageFailed, setImageFailed] = useState(false);
  const { product } = route.params;
  const imageUri = resolveImageUrl(product.image);
  const shouldShowImage = imageUri && !imageFailed;

  const handleAdd = () => {
    const qty = Number(quantity);
    if (qty > 0) {
      addToCart(product, qty);
      navigation.navigate('Cart');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <AppButton title="Volver" icon="arrow-back-outline" variant="secondary" onPress={() => navigation.goBack()} style={styles.backButton} />
      <View style={styles.imageSection}>
        {shouldShowImage ? (
          <Image
            source={{ uri: encodeURI(imageUri) }}
            style={styles.image}
            resizeMode="contain"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <View style={[styles.image, styles.imageFallback]}>
            <Text style={styles.imageFallbackText}>Sin imagen</Text>
          </View>
        )}
      </View>
      <View style={styles.details}>
        {user ? <Text style={styles.userName}>Compra protegida para {user.name}</Text> : null}
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>$ {product.price.toLocaleString('es-CO')}</Text>
        <Text style={styles.shipping}>Envio gratis - llega rapido</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.stock}>Disponible: {product.stock} unidades</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={quantity}
          onChangeText={setQuantity}
          placeholder="Cantidad"
        />
        <AppButton title="Ver el carrito" icon="cart-outline" onPress={handleAdd} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 14,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 14,
  },
  imageSection: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 18,
    padding: 22,
    ...shadows.card,
  },
  image: {
    width: '100%',
    maxWidth: 260,
    height: 240,
    borderRadius: radii.lg,
    overflow: 'hidden',
  },
  imageFallback: {
    backgroundColor: colors.surfaceSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageFallbackText: {
    ...typography.body,
    color: colors.muted,
    fontWeight: '800',
    textAlign: 'center',
  },
  details: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderColor: colors.border,
    borderWidth: 1,
    padding: 20,
    ...shadows.card,
  },
  userName: {
    ...typography.body,
    color: colors.muted,
    fontSize: 15,
    marginBottom: 10,
  },
  name: {
    ...typography.title,
    fontSize: 24,
    marginBottom: 10,
  },
  price: {
    ...typography.title,
    color: colors.text,
    fontSize: 30,
    marginBottom: 4,
  },
  shipping: {
    ...typography.body,
    color: colors.success,
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 14,
  },
  description: {
    ...typography.body,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 14,
    color: colors.text,
  },
  stock: {
    ...typography.body,
    marginBottom: 14,
    color: colors.success,
    fontWeight: '800',
  },
  input: {
    ...sharedStyles.input,
    marginBottom: 14,
  },
});
