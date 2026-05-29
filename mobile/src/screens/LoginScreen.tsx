import React, { useState } from 'react';
import { ImageBackground, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useAppContext } from '../context/AppContext';
import { api } from '../services/api';
import { colors, radii, sharedStyles, typography } from '../styles/theme';

const heroImage = 'https://images.pexels.com/photos/5201936/pexels-photo-5201936.jpeg?auto=compress&cs=tinysrgb&w=900';

export function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Login'>>();
  const { login } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Correo y contraseña son obligatorios');
      return;
    }
    try {
      const userData = await api.login(email, password);
      await login(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo conectar con el servidor');
    }
  };

  return (
    <ImageBackground source={{ uri: heroImage }} style={styles.container} resizeMode="cover">
      <View style={styles.overlay} />
      <KeyboardAvoidingView
        style={styles.keyboardArea}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 20 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.panel}>
            <Text style={styles.brand}>Optica Clara</Text>
            <Text style={styles.title}>Monturas premium para tu estilo</Text>
            <Text style={styles.subtitle}>Compra gafas modernas con fotografias reales, promociones y entrega rapida.</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TextInput
              placeholder="Correo electronico"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              placeholderTextColor={colors.muted}
            />
            <TextInput
              placeholder="Contrasena"
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
              placeholderTextColor={colors.muted}
            />
            <View style={styles.actions}>
              <Pressable style={styles.signUpButton} onPress={() => navigation.navigate('Register')}>
                <Text style={styles.signUpText}>Crear cuenta</Text>
              </Pressable>
              <Pressable style={styles.signInButton} onPress={handleSubmit}>
                <Text style={styles.signInText}>Ingresar</Text>
              </Pressable>
            </View>
            <Text style={styles.guestText} onPress={() => navigation.navigate('Products')}>Continuar como invitado</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingTop: 32,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.08)',
  },
  panel: {
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    padding: 22,
    paddingBottom: 26,
  },
  brand: {
    ...typography.title,
    color: colors.primary,
    fontSize: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  title: {
    ...typography.title,
    color: colors.navy,
    fontSize: 28,
    lineHeight: 32,
    marginBottom: 8,
  },
  subtitle: {
    ...typography.body,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 18,
    color: colors.muted,
  },
  input: {
    ...sharedStyles.input,
    backgroundColor: colors.surface,
    marginBottom: 10,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  signUpButton: {
    alignItems: 'center',
    borderColor: colors.primary,
    borderRadius: radii.md,
    borderWidth: 1,
    flex: 1,
    paddingVertical: 13,
  },
  signInButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radii.md,
    flex: 1,
    paddingVertical: 13,
  },
  signUpText: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '800',
  },
  signInText: {
    ...typography.body,
    color: colors.surface,
    fontWeight: '800',
  },
  guestText: {
    ...typography.body,
    color: colors.primary,
    marginTop: 18,
  },
  error: {
    marginBottom: 12,
    color: colors.danger,
    fontWeight: '700',
  },
});
