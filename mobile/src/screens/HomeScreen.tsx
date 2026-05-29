import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useAppContext } from '../context/AppContext';
import { AppButton } from '../components/AppButton';
import { colors, radii, shadows, typography } from '../styles/theme';

const actions = [
  { label: 'Productos', icon: 'glasses-outline' as const, route: 'Products' as const, description: 'Explora la coleccion de lentes y monturas.' },
  { label: 'Carrito', icon: 'cart-outline' as const, route: 'Cart' as const, description: 'Revisa los productos que agregaste al carrito.' },
  { label: 'Perfil', icon: 'person-circle-outline' as const, route: 'Profile' as const, description: 'Actualiza tu informacion y datos de usuario.' },
  { label: 'Historial', icon: 'receipt-outline' as const, route: 'OrderHistory' as const, description: 'Consulta tus pedidos anteriores.' },
];

export function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();
  const { user, logout } = useAppContext();
  const initials = user?.name
    ? user.name
        .split(' ')
        .map(part => part[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'US';

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.brand}>Optica Clara</Text>
          <Text style={styles.welcome}>Hola{user ? `, ${user.name}` : ''}</Text>
          <Text style={styles.subtitle}>Compra monturas premium con una experiencia limpia y profesional.</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
      </View>

      <View style={styles.cardsRow}>
        {actions.map(action => (
          <Pressable
            key={action.label}
            style={state => [
              styles.card,
              (state.pressed || Boolean((state as { hovered?: boolean }).hovered)) && styles.cardActive,
            ]}
            onPress={() => navigation.navigate(action.route)}
          >
            <View style={styles.cardIconContainer}>
              <Ionicons name={action.icon} size={25} color={colors.accent} />
            </View>
            <Text style={styles.cardTitle}>{action.label}</Text>
            <Text style={styles.cardDescription}>{action.description}</Text>
          </Pressable>
        ))}
      </View>

      <AppButton title="Cerrar sesion" icon="log-out-outline" variant="danger" onPress={logout} style={styles.logoutButton} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
  },
  container: {
    flexGrow: 1,
    padding: 22,
  },
  header: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radii.lg,
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'space-between',
    marginBottom: 24,
    padding: 18,
  },
  headerText: {
    flex: 1,
  },
  brand: {
    ...typography.title,
    color: colors.primary,
    fontSize: 24,
    marginBottom: 8,
  },
  welcome: {
    ...typography.title,
    color: colors.navy,
    fontSize: 20,
    marginBottom: 6,
  },
  subtitle: {
    ...typography.body,
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 26,
    height: 52,
    justifyContent: 'center',
    width: 52,
  },
  avatarText: {
    ...typography.body,
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  cardsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radii.lg,
    marginBottom: 14,
    padding: 20,
    width: '48%',
    ...shadows.card,
  },
  cardActive: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
  cardIconContainer: {
    alignItems: 'center',
    backgroundColor: colors.surfaceSoft,
    borderRadius: radii.md,
    height: 46,
    justifyContent: 'center',
    marginBottom: 14,
    width: 46,
  },
  cardTitle: {
    ...typography.title,
    fontSize: 16,
    marginBottom: 8,
  },
  cardDescription: {
    ...typography.body,
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
  },
  logoutButton: {
    marginTop: 12,
  },
});
