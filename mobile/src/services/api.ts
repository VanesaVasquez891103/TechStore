import { Category, Order, Product, User } from '../types';
import { Platform } from 'react-native';

export interface CreateProductInput {
  name: string;
  price: number;
  stock: number;
  categoryId: number;
  description: string;
  image: string;
  brand?: string;
}

export type UpdateProductInput = Partial<CreateProductInput>;

const LOCAL_API_HOST = Platform.OS === 'web'
  ? 'localhost'
  : '192.168.80.56';
export const API_ORIGIN = `http://${LOCAL_API_HOST}:3000`;
const API_BASE_URL = `${API_ORIGIN}/api`;

export function resolveImageUrl(image?: string | null): string {
  if (!image || typeof image !== 'string') {
    return '';
  }

  return image.startsWith('http') || image.startsWith('data:') ? image : `${API_ORIGIN}${image}`;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers ?? {}),
  };

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let body: any = {};
    try {
      body = await response.json();
    } catch {
      body = { message: response.statusText || 'Error en la API' };
    }
    throw new Error(body?.message || 'Error en la API');
  }

  const body = await response.json();
  return body && typeof body === 'object' && 'data' in body ? body.data : body;
}

export const api = {
  getProducts: (search?: string, categoryId?: number) => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (categoryId !== undefined) params.append('categoryId', String(categoryId));
    return request<Product[]>(`/products?${params.toString()}`);
  },
  getProduct: (id: number) => request<Product>(`/products/${id}`),
  createProduct: (product: CreateProductInput, userId: number) =>
    request<Product>('/products', {
      method: 'POST',
      headers: { 'x-user-id': String(userId) },
      body: JSON.stringify(product),
    }),
  updateProduct: (id: number, product: UpdateProductInput, userId: number) =>
    request<Product>(`/products/${id}`, {
      method: 'PUT',
      headers: { 'x-user-id': String(userId) },
      body: JSON.stringify(product),
    }),
  getCategories: () => request<Category[]>('/categories'),
  register: (name: string, email: string, password: string) =>
    request<User>('/users/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),
  login: (email: string, password: string) =>
    request<User>('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  getUser: (id: number) => request<User>(`/users/${id}`),
  createOrder: (order: Order) =>
    request<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    }),
};
