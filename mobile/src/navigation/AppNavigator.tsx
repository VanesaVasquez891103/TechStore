import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import TabNavigator from './TabNavigator';
import { ProductDetailScreen } from '../screens/ProductDetailScreen';
import { OrderHistoryScreen } from '../screens/OrderHistoryScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>

      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />

      {/* APP PRINCIPAL */}
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="Detail" component={ProductDetailScreen} />
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} options={{ title: 'Historial de pedidos' }} />

    </Stack.Navigator>
  );
}
