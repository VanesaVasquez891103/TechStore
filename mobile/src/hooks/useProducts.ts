import { useCallback, useEffect, useState } from 'react';

import { Category, Product } from '../types';

import {
  getCategories,
  getProducts
} from '../services/productService';

export function useProducts() {

  const [products, setProducts] =
    useState<Product[]>([]);

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [search, setSearch] =
    useState('');

  const [categoryId, setCategoryId] =
    useState<number | undefined>();

  const [loading, setLoading] =
    useState(false);

  const refreshProducts =
    useCallback(async () => {

      try {

        setLoading(true);

        const response =
          await getProducts(
            search,
            categoryId
          );

        setProducts(response);

      } catch (error) {

        console.log(
          'Error loading products',
          error
        );

        setProducts([]);

      } finally {

        setLoading(false);
      }

    }, [search, categoryId]);

  const refreshCategories =
    useCallback(async () => {

      try {

        const response =
          await getCategories();

        setCategories(response);

      } catch (error) {

        console.log(
          'Error loading categories',
          error
        );

        setCategories([]);
      }

    }, []);

  useEffect(() => {

    refreshProducts();

  }, [
    refreshProducts
  ]);

  useEffect(() => {

    refreshCategories();

  }, [
    refreshCategories
  ]);

  return {

    products,
    categories,

    search,
    setSearch,

    categoryId,
    setCategoryId,

    loading,

    refreshProducts
  };
}
