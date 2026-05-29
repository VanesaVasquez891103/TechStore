import { NavigatorScreenParams } from '@react-navigation/native';
import { Product } from '../types';

export type MainTabParamList = {
  Products: undefined;
  Cart: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Products: undefined;
  Cart: undefined;
  Profile: undefined;
  OrderHistory: undefined;
  Detail: { product: Product };
  Admin: undefined;
};
