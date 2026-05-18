import { Order } from '../types';

import { api } from './api';

export async function createOrder(
  order: Order
) {

  return await api.createOrder(order);
}
