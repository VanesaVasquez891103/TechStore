import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppContext } from '../context/AppContext';
import { RootStackParamList } from '../navigation/types';
import { AppButton } from '../components/AppButton';
import { colors, radii, shadows, typography } from '../styles/theme';

export function ProfileScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Profile'>>();
  const { user } = useAppContext();

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <AppButton title="Volver" icon="arrow-back-outline" variant="secondary" onPress={() => navigation.goBack()} style={styles.backButton} />
      <Text style={styles.title}>Mi perfil</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Nombre</Text>
        <Text style={styles.value}>{user.name}</Text>
        <Text style={styles.label}>Correo</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    backgroundColor: colors.background,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  title: {
    ...typography.title,
    fontSize: 30,
    marginBottom: 20,
    marginTop: 18,
    color: colors.text,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    padding: 22,
    ...shadows.card,
  },
  label: {
    ...typography.body,
    marginTop: 12,
    color: colors.muted,
    fontWeight: '800',
  },
  value: {
    ...typography.body,
    fontSize: 16,
    color: colors.text,
    marginTop: 4,
  },
});
