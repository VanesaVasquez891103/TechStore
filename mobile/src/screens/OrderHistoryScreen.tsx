import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { AppButton } from '../components/AppButton';
import { colors, radii, shadows, typography } from '../styles/theme';

export function OrderHistoryScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'OrderHistory'>>();

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Historial de pedidos</Text>
        <Text style={styles.message}>
          Aqui podras ver tus pedidos anteriores cuando el historial este habilitado.
        </Text>
        <AppButton title="Volver" icon="arrow-back-outline" variant="secondary" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
    padding: 22,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    padding: 24,
    ...shadows.card,
  },
  title: {
    ...typography.title,
    color: colors.primary,
    fontSize: 24,
    marginBottom: 12,
  },
  message: {
    ...typography.body,
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
});
