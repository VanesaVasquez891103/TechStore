import React from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Category, Product } from '../types';
import { CategoryFilter } from '../components/CategoryFilter';
import { ProductCard } from '../components/ProductCard';
import { useAppContext } from '../context/AppContext';
import { RootStackParamList } from '../navigation/types';

export function ProductListScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();
  const {
    user,
    products,
    categories,
    search,
    categoryId,
    setSearch,
    setCategoryId,
    refreshProducts,
    logout,
  } = useAppContext();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Optica Clara</Text>
        <Text style={styles.subtitle}>Hola, {user?.name}. Encuentra monturas, lentes y cuidado visual.</Text>
        <View style={styles.buttons}>
          <Button title="Carrito" onPress={() => navigation.navigate('Cart')} />
          <Button title="Perfil" onPress={() => navigation.navigate('Profile')} />
          {user?.role === 'admin' && <Button title="Admin" onPress={() => navigation.navigate('Admin')} />}
          <Button title="Salir" onPress={logout} />
        </View>
      </View>
      <TextInput
        placeholder="Buscar monturas, lentes o accesorios"
        style={styles.search}
        value={search}
        onChangeText={value => setSearch(value)}
        onSubmitEditing={refreshProducts}
      />
      <CategoryFilter categories={categories} selectedId={categoryId} onSelect={id => setCategoryId(id)} />
      <FlatList
        data={products}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <ProductCard product={item} onPress={() => navigation.navigate('Detail', { product: item })} />}
        contentContainerStyle={styles.products}
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
  header: {
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f6f8b',
    marginBottom: 4,
  },
  subtitle: {
    color: '#4b5563',
    marginBottom: 12,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  search: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
  },
  products: {
    paddingBottom: 24,
  },
});
