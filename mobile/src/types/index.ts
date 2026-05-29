export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  categoryId: number;
  description: string;
  image: string;
  brand?: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'customer' | 'admin';
}

export interface OrderItem {
  productId: number;
  quantity: number;
  price: number;
}

export interface Order {
  userId: number;
  type: 'online' | 'instore';
  items: OrderItem[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled' | 'shipped' | 'delivered';
}
