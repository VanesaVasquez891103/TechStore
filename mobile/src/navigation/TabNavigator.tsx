import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ProductListScreen } from '../screens/ProductListScreen';
import { CartScreen } from '../screens/CartScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { MainTabParamList } from './types';
import { useAppContext } from '../context/AppContext';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function TabNavigator() {
  const { user } = useAppContext();

  return (
    <Tab.Navigator
      initialRouteName="Products"
      screenOptions={{
        tabBarStyle: { display: 'none' },
      }}
    >

      <Tab.Screen
        name="Products"
        component={ProductListScreen}
        options={{ title: 'Productos' }}
      />

      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: 'Carrito' }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: user?.name ?? 'Perfil' }}
      />

    </Tab.Navigator>
  );
}
