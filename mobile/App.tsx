import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppContextProvider, useAppContext } from './src/context/AppContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { LoadingScreen } from './src/screens/LoadingScreen';
import { ProductDetailScreen } from './src/screens/ProductDetailScreen';
import { AdminPanelScreen } from './src/screens/AdminPanelScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { ProductListScreen } from './src/screens/ProductListScreen';
import { CartScreen } from './src/screens/CartScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { OrderHistoryScreen } from './src/screens/OrderHistoryScreen';
import { RootStackParamList } from './src/navigation/types';

const AuthStack = createNativeStackNavigator<RootStackParamList>();
const AppStack = createNativeStackNavigator<RootStackParamList>();

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

function AppNavigator() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: true }}>
      <AppStack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
      <AppStack.Screen name="Products" component={ProductListScreen} options={{ title: 'Productos' }} />
      <AppStack.Screen name="Cart" component={CartScreen} options={{ title: 'Carrito' }} />
      <AppStack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
      <AppStack.Screen name="OrderHistory" component={OrderHistoryScreen} options={{ title: 'Historial' }} />
      <AppStack.Screen name="Detail" component={ProductDetailScreen} options={{ title: 'Detalle' }} />
      <AppStack.Screen name="Admin" component={AdminPanelScreen} options={{ title: 'Admin' }} />
    </AppStack.Navigator>
  );
}

function AppContent() {
  const { user, loading } = useAppContext();

  if (loading) {
    return <LoadingScreen />;
  }

  return user ? <AppNavigator /> : <AuthNavigator />;
}

export default function App() {
  return (
    <AppContextProvider>
      <NavigationContainer>
        <AppContent />
      </NavigationContainer>
    </AppContextProvider>
  );
}
