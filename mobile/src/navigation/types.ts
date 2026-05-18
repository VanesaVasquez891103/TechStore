import { Product } from '../types';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Detail: { product: Product };
  Cart: undefined;
  Profile: undefined;
  Admin: undefined;
};
