import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { api } from '../services/api';
import { useAppContext } from '../context/AppContext';

export function LoginScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Login'>>();
  const { login } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const user = await api.login(email, password);
      await login(user);
      navigation.replace('Home');
    } catch (err) {
      setError('Credenciales incorrectas.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        placeholder="Correo electrónico"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Ingresar" onPress={handleSubmit} />
      <View style={styles.switchContainer}>
        <Text>¿No tienes cuenta?</Text>
        <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
          Regístrate
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#eff3f7',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
    color: '#1f6f8b',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  switchContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  link: {
    marginLeft: 6,
    color: '#1f6f8b',
    fontWeight: '700',
  },
  error: {
    marginBottom: 12,
    color: '#d02a2a',
  },
});
