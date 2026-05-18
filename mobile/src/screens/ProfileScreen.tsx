import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppContext } from '../context/AppContext';
import { RootStackParamList } from '../navigation/types';

export function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Profile'>>();
  const { user } = useAppContext();

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Button title="Volver" onPress={() => navigation.goBack()} />
      <Text style={styles.title}>Mi perfil</Text>
      <Text style={styles.label}>Nombre:</Text>
      <Text style={styles.value}>{user.name}</Text>
      <Text style={styles.label}>Correo:</Text>
      <Text style={styles.value}>{user.email}</Text>
      <Text style={styles.label}>Rol:</Text>
      <Text style={styles.value}>{user.role}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#eff3f7',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
    color: '#1f6f8b',
  },
  label: {
    marginTop: 12,
    color: '#444',
    fontWeight: '700',
  },
  value: {
    fontSize: 16,
    color: '#111',
    marginTop: 4,
  },
});
