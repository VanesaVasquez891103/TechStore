import React from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

export function AdminPanelScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Admin'>>();

  return (
    <ScrollView style={styles.container}>
      <Button title="Volver" onPress={() => navigation.goBack()} />
      <Text style={styles.title}>Panel Administrador</Text>
      <Text style={styles.subtitle}>Gestion del catalogo optico</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Agregar producto</Text>
        <Text style={styles.cardText}>Registrar monturas, lentes o accesorios con imagen, precio y descripcion.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Editar producto</Text>
        <Text style={styles.cardText}>Actualizar referencias, stock e imagenes del catalogo.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Eliminar producto</Text>
        <Text style={styles.cardText}>Quitar del catalogo los que ya no estan disponibles.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eff3f7',
    padding: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1f6f8b',
    marginVertical: 16,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 14,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  cardText: {
    color: '#555',
  },
});
