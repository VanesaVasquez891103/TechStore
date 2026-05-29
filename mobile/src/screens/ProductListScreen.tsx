import React from 'react';
import { FlatList, ImageBackground, Pressable, StyleSheet, Text, TextInput, useWindowDimensions, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CategoryFilter } from '../components/CategoryFilter';
import { ProductCard } from '../components/ProductCard';
import { useAppContext } from '../context/AppContext';
import { RootStackParamList } from '../navigation/types';
import { colors, radii, sharedStyles, typography } from '../styles/theme';

type ProductListNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Products'>;
const bannerImage = 'https://images.pexels.com/photos/5201936/pexels-photo-5201936.jpeg?auto=compress&cs=tinysrgb&w=1000';

export function ProductListScreen() {
  const navigation = useNavigation<ProductListNavigationProp>();
  const { width } = useWindowDimensions();
  const columns = width < 390 ? 1 : 2;
  const {
    user,
    products,
    categories,
    search,
    categoryId,
    setSearch,
    setCategoryId,
    refreshProducts,
    addToCart,
  } = useAppContext();

  return (
    <View style={styles.container}>
      <View style={styles.marketHeader}>
        <View style={styles.brandRow}>
          <View style={styles.logoRow}>
            <View style={styles.logoMark}>
              <Ionicons name="glasses-outline" size={20} color={colors.surface} />
            </View>
            <Text style={styles.logoText}>Optica Clara</Text>
          </View>
          <Pressable style={styles.profileButton}>
            <Text style={styles.avatarText}>{user?.name?.[0]?.toUpperCase() ?? 'O'}</Text>
          </Pressable>
        </View>
        <TextInput
          placeholder="Buscar monturas premium"
          style={styles.search}
          value={search}
          onChangeText={value => setSearch(value)}
          onSubmitEditing={refreshProducts}
          placeholderTextColor={colors.muted}
        />
      </View>
      <FlatList
        data={products}
        keyExtractor={item => String(item.id)}
        ListHeaderComponent={(
          <>
            <ImageBackground source={{ uri: bannerImage }} style={styles.banner} imageStyle={styles.bannerImage}>
              <View style={styles.bannerOverlay}>
                <Text style={styles.bannerKicker}>Promocion destacada</Text>
                <Text style={styles.bannerTitle}>Nueva coleccion de monturas</Text>
                <Text style={styles.bannerText}>Hasta 30% OFF en estilos seleccionados.</Text>
              </View>
            </ImageBackground>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Productos destacados</Text>
              <Text style={styles.sectionLink}>Ver todos</Text>
            </View>
            <CategoryFilter categories={categories} selectedId={categoryId} onSelect={id => setCategoryId(id)} />
          </>
        )}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            fullWidth={columns === 1}
            onPress={() => navigation.navigate('Detail', { product: item })}
            onAdd={() => addToCart(item, 1)}
          />
        )}
        key={columns}
        numColumns={columns}
        columnWrapperStyle={columns === 2 ? styles.columnWrapper : undefined}
        contentContainerStyle={styles.products}
      />
      <View style={styles.bottomNav}>
        <Ionicons name="home" size={22} color={colors.primary} />
        <Ionicons name="heart-outline" size={22} color={colors.muted} />
        <Pressable style={styles.floatingCart} onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="cart-outline" size={22} color={colors.surface} />
        </Pressable>
        <Ionicons name="notifications-outline" size={22} color={colors.muted} />
        <Ionicons name="person-outline" size={22} color={colors.muted} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  marketHeader: {
    backgroundColor: colors.surface,
    paddingHorizontal: 18,
    paddingBottom: 14,
    paddingTop: 18,
  },
  brandRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  logoRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  logoMark: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radii.md,
    height: 38,
    justifyContent: 'center',
    width: 38,
  },
  logoText: {
    ...typography.title,
    color: colors.navy,
    fontSize: 20,
  },
  profileButton: {
    alignItems: 'center',
    backgroundColor: colors.surfaceSoft,
    borderRadius: 19,
    height: 38,
    justifyContent: 'center',
    width: 38,
  },
  avatarText: {
    ...typography.title,
    color: colors.primary,
  },
  search: {
    ...sharedStyles.input,
    backgroundColor: colors.background,
    borderRadius: radii.md,
    minHeight: 44,
  },
  banner: {
    height: 112,
    marginHorizontal: 18,
    marginTop: 12,
    marginBottom: 14,
    overflow: 'hidden',
    borderRadius: radii.lg,
  },
  bannerImage: {
    borderRadius: radii.lg,
  },
  bannerOverlay: {
    backgroundColor: 'rgba(15, 23, 42, 0.48)',
    flex: 1,
    justifyContent: 'flex-end',
    padding: 14,
  },
  bannerKicker: {
    ...typography.body,
    color: '#CFFAE9',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  bannerTitle: {
    ...typography.title,
    color: colors.surface,
    fontSize: 18,
    marginBottom: 4,
  },
  bannerText: {
    ...typography.body,
    color: '#EAF2F8',
    fontSize: 13,
  },
  sectionHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    marginBottom: 12,
  },
  sectionTitle: {
    ...typography.title,
    color: colors.navy,
    fontSize: 18,
  },
  sectionLink: {
    ...typography.body,
    color: colors.accent,
    fontWeight: '800',
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  products: {
    paddingBottom: 94,
    paddingHorizontal: 10,
  },
  bottomNav: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    bottom: 0,
    flexDirection: 'row',
    height: 70,
    justifyContent: 'space-around',
    left: 0,
    paddingHorizontal: 24,
    position: 'absolute',
    right: 0,
  },
  floatingCart: {
    alignItems: 'center',
    backgroundColor: colors.accent,
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
    marginTop: -24,
    width: 48,
    ...typography.body,
  },
});
