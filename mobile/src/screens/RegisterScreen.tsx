import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useAppContext } from '../context/AppContext';
import { AppButton } from '../components/AppButton';
import { colors, radii, shadows, sharedStyles, typography } from '../styles/theme';

export function RegisterScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Register'>>();
  const { register } = useAppContext();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Todos los campos son obligatorios');
      return;
    }
    try {
      await register(name, email, password);
    } catch (err) {
      setError('No se pudo registrar. Verifica tus datos.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.iconCircle}>
          <Ionicons name="person-add-outline" size={30} color={colors.primary} />
        </View>
        <Text style={styles.title}>Registro</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TextInput
          placeholder="Nombre"
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholderTextColor={colors.muted}
        />
        <TextInput
          placeholder="Correo electronico"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={colors.muted}
        />
        <TextInput
          placeholder="Contrasena"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor={colors.muted}
        />
        <AppButton title="Crear cuenta" icon="person-add-outline" onPress={handleSubmit} />
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Ya tienes cuenta?</Text>
          <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
            Inicia sesion
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 22,
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    padding: 24,
    ...shadows.card,
  },
  iconCircle: {
    alignItems: 'center',
    backgroundColor: colors.surfaceSoft,
    borderRadius: radii.lg,
    height: 58,
    justifyContent: 'center',
    marginBottom: 16,
    width: 58,
  },
  title: {
    ...typography.title,
    fontSize: 30,
    marginBottom: 24,
    color: colors.primary,
  },
  input: {
    ...sharedStyles.input,
    marginBottom: 14,
  },
  switchContainer: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  switchText: {
    ...typography.body,
    color: colors.muted,
  },
  link: {
    ...typography.body,
    marginLeft: 6,
    color: colors.primary,
    fontWeight: '800',
  },
  error: {
    marginBottom: 12,
    color: colors.danger,
    fontWeight: '700',
  },
});
