import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useAppContext } from '../context/AppContext';
import { AppButton } from '../components/AppButton';
import { colors, radii, shadows, sharedStyles, typography } from '../styles/theme';

export function AdminPanelScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Admin'>>();
  const { categories, createProduct, products, refreshProducts, updateProductStock, user } = useAppContext();
  const firstCategoryId = categories[0]?.id;
  const firstProductId = products[0]?.id;
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('Optica Clara');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [inventoryStock, setInventoryStock] = useState('');
  const [categoryId, setCategoryId] = useState<number | undefined>(firstCategoryId);
  const [selectedProductId, setSelectedProductId] = useState<number | undefined>(firstProductId);
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const [updatingInventory, setUpdatingInventory] = useState(false);

  const selectedCategoryId = categoryId ?? firstCategoryId;
  const selectedProduct = products.find(product => product.id === (selectedProductId ?? firstProductId));
  const canSubmit = useMemo(() => {
    return Boolean(
      name.trim() &&
      price.trim() &&
      stock.trim() &&
      selectedCategoryId &&
      image.trim() &&
      description.trim()
    );
  }, [description, image, name, price, selectedCategoryId, stock]);

  const canUpdateInventory = Boolean(selectedProduct && inventoryStock.trim());

  const resetForm = () => {
    setName('');
    setBrand('Optica Clara');
    setPrice('');
    setStock('');
    setCategoryId(firstCategoryId);
    setImage('');
    setDescription('');
  };

  const handleCreate = async () => {
    setMessage('');

    if (!canSubmit || !selectedCategoryId) {
      setMessage('Completa todos los campos obligatorios.');
      return;
    }

    const parsedPrice = Number(price);
    const parsedStock = Number(stock);

    if (Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      setMessage('El precio debe ser un numero mayor que cero.');
      return;
    }

    if (!Number.isInteger(parsedStock) || parsedStock < 0) {
      setMessage('El stock debe ser un numero entero positivo.');
      return;
    }

    try {
      setSaving(true);
      await createProduct({
        name: name.trim(),
        brand: brand.trim() || undefined,
        price: parsedPrice,
        stock: parsedStock,
        categoryId: selectedCategoryId,
        image: image.trim(),
        description: description.trim(),
      });
      await refreshProducts();
      resetForm();
      setMessage('Producto creado y visible para compradores.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No se pudo crear el producto.');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateInventory = async () => {
    setMessage('');

    if (!selectedProduct) {
      setMessage('Selecciona un producto para actualizar inventario.');
      return;
    }

    const parsedStock = Number(inventoryStock);
    if (!Number.isInteger(parsedStock) || parsedStock < 0) {
      setMessage('El stock debe ser un numero entero positivo.');
      return;
    }

    try {
      setUpdatingInventory(true);
      await updateProductStock(selectedProduct.id, parsedStock);
      setInventoryStock('');
      setMessage('Inventario actualizado correctamente.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No se pudo actualizar el inventario.');
    } finally {
      setUpdatingInventory(false);
    }
  };

  if (user?.role !== 'admin') {
    return (
      <View style={styles.container}>
        <AppButton title="Volver" icon="arrow-back-outline" variant="secondary" onPress={() => navigation.goBack()} style={styles.backButton} />
        <Text style={styles.title}>Acceso restringido</Text>
        <Text style={styles.subtitle}>Esta cuenta no tiene permisos para subir productos.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <AppButton title="Volver" icon="arrow-back-outline" variant="secondary" onPress={() => navigation.goBack()} style={styles.backButton} />
      <Text style={styles.title}>{user.name}</Text>
      <Text style={styles.subtitle}>Gestion de catalogo e inventario</Text>

      {message ? <Text style={styles.message}>{message}</Text> : null}

      <View style={styles.formCard}>
        <Text style={styles.sectionTitle}>Actualizar inventario</Text>
        <Text style={styles.label}>Producto</Text>
        <View style={styles.productList}>
          {products.map(product => (
            <Pressable
              key={product.id}
              style={state => [
                styles.productButton,
                selectedProduct?.id === product.id && styles.productSelected,
                (state.pressed || Boolean((state as { hovered?: boolean }).hovered)) && styles.active,
              ]}
              onPress={() => {
                setSelectedProductId(product.id);
                setInventoryStock(String(product.stock));
              }}
            >
              <Text style={[styles.productName, selectedProduct?.id === product.id && styles.productNameSelected]}>
                {product.name}
              </Text>
              <Text style={[styles.productStock, selectedProduct?.id === product.id && styles.productNameSelected]}>
                Stock: {product.stock}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Nuevo stock</Text>
        <TextInput
          placeholder={selectedProduct ? String(selectedProduct.stock) : '0'}
          style={styles.input}
          value={inventoryStock}
          onChangeText={setInventoryStock}
          keyboardType="numeric"
          placeholderTextColor={colors.muted}
        />

        <AppButton
          title={updatingInventory ? 'Actualizando...' : 'Actualizar stock'}
          icon="sync-outline"
          disabled={updatingInventory || !canUpdateInventory}
          onPress={handleUpdateInventory}
        />
      </View>

      <View style={styles.formCard}>
        <Text style={styles.sectionTitle}>Subir producto</Text>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          placeholder="Ej: Montura Aurora Carey"
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholderTextColor={colors.muted}
        />

        <Text style={styles.label}>Marca</Text>
        <TextInput
          placeholder="Ej: Optica Clara"
          style={styles.input}
          value={brand}
          onChangeText={setBrand}
          placeholderTextColor={colors.muted}
        />

        <View style={styles.row}>
          <View style={styles.rowItem}>
            <Text style={styles.label}>Precio</Text>
            <TextInput
              placeholder="129000"
              style={styles.input}
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              placeholderTextColor={colors.muted}
            />
          </View>
          <View style={styles.rowItem}>
            <Text style={styles.label}>Stock</Text>
            <TextInput
              placeholder="18"
              style={styles.input}
              value={stock}
              onChangeText={setStock}
              keyboardType="numeric"
              placeholderTextColor={colors.muted}
            />
          </View>
        </View>

        <Text style={styles.label}>Categoria</Text>
        <View style={styles.categoryList}>
          {categories.map(category => (
            <Pressable
              key={category.id}
              style={state => [
                styles.categoryButton,
                selectedCategoryId === category.id && styles.categorySelected,
                (state.pressed || Boolean((state as { hovered?: boolean }).hovered)) && styles.active,
              ]}
              onPress={() => setCategoryId(category.id)}
            >
              <Text style={[styles.categoryText, selectedCategoryId === category.id && styles.categoryTextSelected]}>
                {category.name}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Imagen</Text>
        <TextInput
          placeholder="/assets/optica/producto.png o URL https://..."
          style={styles.input}
          value={image}
          onChangeText={setImage}
          autoCapitalize="none"
          placeholderTextColor={colors.muted}
        />

        <Text style={styles.label}>Descripcion</Text>
        <TextInput
          placeholder="Describe material, uso y caracteristicas del producto"
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          multiline
          placeholderTextColor={colors.muted}
        />

        <AppButton
          title={saving ? 'Guardando...' : 'Subir producto'}
          icon="cloud-upload-outline"
          disabled={saving || !canSubmit}
          onPress={handleCreate}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 18,
  },
  content: {
    paddingBottom: 30,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  title: {
    ...typography.title,
    fontSize: 26,
    color: colors.primary,
    marginVertical: 16,
  },
  subtitle: {
    ...typography.body,
    color: colors.muted,
    fontSize: 18,
    marginBottom: 16,
  },
  formCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    padding: 20,
    marginBottom: 16,
    ...shadows.card,
  },
  sectionTitle: {
    ...typography.title,
    color: colors.primary,
    fontSize: 18,
    marginBottom: 14,
  },
  label: {
    ...typography.body,
    color: colors.text,
    fontWeight: '800',
    marginBottom: 6,
  },
  input: {
    ...sharedStyles.input,
    marginBottom: 14,
  },
  textArea: {
    minHeight: 96,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  rowItem: {
    flex: 1,
  },
  categoryList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  categoryButton: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  categorySelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  active: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
  categoryText: {
    ...typography.body,
    color: colors.text,
  },
  categoryTextSelected: {
    color: colors.surface,
    fontWeight: '800',
  },
  productList: {
    gap: 8,
    marginBottom: 14,
  },
  productButton: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
  },
  productSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  productName: {
    ...typography.body,
    color: colors.text,
    fontWeight: '800',
  },
  productNameSelected: {
    color: colors.surface,
  },
  productStock: {
    ...typography.body,
    color: colors.muted,
    marginTop: 4,
  },
  message: {
    ...typography.body,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    color: colors.primary,
    fontWeight: '700',
    marginBottom: 14,
    padding: 12,
    ...shadows.soft,
  },
});
