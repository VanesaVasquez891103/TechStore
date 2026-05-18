import { api } from './api';

export async function getProducts(
  search?: string,
  categoryId?: number
) {

  return await api.getProducts(
    search,
    categoryId
  );
}

export async function getProduct(
  id: number
) {

  return await api.getProduct(id);
}

export async function getCategories() {

  return await api.getCategories();
}

