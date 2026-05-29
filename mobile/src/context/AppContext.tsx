import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api, CreateProductInput } from '../services/api';
import { Category, OrderItem, Product, User } from '../types';

interface AppContextValue {
  user: User | null;
  products: Product[];
  categories: Category[];
  cartItems: OrderItem[];
  search: string;
  categoryId?: number;
  loading: boolean;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  createProduct: (product: CreateProductInput) => Promise<Product>;
  updateProductStock: (productId: number, stock: number) => Promise<Product>;
  addToCart: (product: Product, quantity: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  placeOrder: () => Promise<void>;
  setSearch: (value: string) => void;
  setCategoryId: (value?: number) => void;
  refreshProducts: () => Promise<void>;
  refreshCategories: () => Promise<void>;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

const USER_STORAGE_KEY = '@TechStore:user';
const CART_STORAGE_KEY = '@TechStore:cartItems';
const SEARCH_STORAGE_KEY = '@TechStore:search';
const CATEGORY_ID_STORAGE_KEY = '@TechStore:categoryId';

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [cartItems, setCartItems] = useState<OrderItem[]>([]);
  const [search, setSearchState] = useState('');
  const [categoryId, setCategoryIdState] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStorage = async () => {
      try {
        const [storedUser, storedCart, storedSearch, storedCategoryId] = await Promise.all([
          AsyncStorage.getItem(USER_STORAGE_KEY),
          AsyncStorage.getItem(CART_STORAGE_KEY),
          AsyncStorage.getItem(SEARCH_STORAGE_KEY),
          AsyncStorage.getItem(CATEGORY_ID_STORAGE_KEY),
        ]);

        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser?.data ?? parsedUser);
        }
        if (storedCart) {
          setCartItems(JSON.parse(storedCart));
        }
        if (storedSearch) {
          setSearchState(storedSearch);
        }
        if (storedCategoryId) {
          const value = Number(storedCategoryId);
          if (!Number.isNaN(value)) {
            setCategoryIdState(value);
          }
        }
      } catch (error) {
        console.warn('Error loading app storage', error);
      } finally {
        setLoading(false);
      }
    };

    loadStorage();
  }, []);

  useEffect(() => {
    const saveUser = async () => {
      if (user) {
        await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      } else {
        await AsyncStorage.removeItem(USER_STORAGE_KEY);
      }
    };
    saveUser();
  }, [user]);

  useEffect(() => {
    const saveCart = async () => {
      await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    };
    saveCart();
  }, [cartItems]);

  useEffect(() => {
    const saveSearch = async () => {
      await AsyncStorage.setItem(SEARCH_STORAGE_KEY, search);
    };
    saveSearch();
  }, [search]);

  useEffect(() => {
    const saveCategory = async () => {
      if (categoryId === undefined) {
        await AsyncStorage.removeItem(CATEGORY_ID_STORAGE_KEY);
      } else {
        await AsyncStorage.setItem(CATEGORY_ID_STORAGE_KEY, String(categoryId));
      }
    };
    saveCategory();
  }, [categoryId]);

  const refreshProducts = useCallback(async () => {
    try {
      const response = await api.getProducts(search, categoryId);
      setProducts(response);
    } catch {
      setProducts([]);
    }
  }, [search, categoryId]);

  const refreshCategories = useCallback(async () => {
    try {
      const response = await api.getCategories();
      setCategories(response);
    } catch {
      setCategories([]);
    }
  }, []);

  useEffect(() => {
    refreshCategories();
    refreshProducts();
  }, [refreshCategories, refreshProducts]);

  const login = useCallback(async (loggedUser: User) => {
    setUser(loggedUser);
  }, []);

  const logout = useCallback(async () => {
    setUser(null);
    setCartItems([]);
    await AsyncStorage.multiRemove([USER_STORAGE_KEY, CART_STORAGE_KEY]);
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const registeredUser = await api.register(name, email, password);
    setUser(registeredUser);
  }, []);

  const createProduct = useCallback(async (product: CreateProductInput) => {
    if (user?.role !== 'admin') {
      throw new Error('Esta cuenta no tiene permisos para crear productos');
    }

    const createdProduct = await api.createProduct(product, user.id);
    await refreshProducts();
    return createdProduct;
  }, [refreshProducts, user]);

  const updateProductStock = useCallback(async (productId: number, stock: number) => {
    if (user?.role !== 'admin') {
      throw new Error('Esta cuenta no tiene permisos para actualizar inventario');
    }

    const updatedProduct = await api.updateProduct(productId, { stock }, user.id);
    await refreshProducts();
    return updatedProduct;
  }, [refreshProducts, user]);

  const addToCart = useCallback((product: Product, quantity: number) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.productId === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { productId: product.id, quantity, price: product.price }];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
  }, []);

  const updateCartQuantity = useCallback((productId: number, quantity: number) => {
    setCartItems(prev => {
      if (quantity <= 0) {
        return prev.filter(item => item.productId !== productId);
      }

      return prev.map(item =>
        item.productId === productId
          ? { ...item, quantity }
          : item
      );
    });
  }, []);

  const placeOrder = useCallback(async () => {
    if (!user || cartItems.length === 0) {
      return;
    }
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    await api.createOrder({
      userId: user.id,
      type: 'online',
      items: cartItems,
      total,
      status: 'pending',
    });
    setCartItems([]);
  }, [cartItems, user]);

  const value = useMemo(
    () => ({
      user,
      products,
      categories,
      cartItems,
      search,
      categoryId,
      loading,
      login,
      logout,
      register,
      createProduct,
      updateProductStock,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      placeOrder,
      setSearch: setSearchState,
      setCategoryId: setCategoryIdState,
      refreshProducts,
      refreshCategories,
    }),
    [user, products, categories, cartItems, search, categoryId, loading, login, logout, register, createProduct, updateProductStock, addToCart, updateCartQuantity, removeFromCart, placeOrder, refreshProducts, refreshCategories]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppContextProvider');
  }
  return context;
}
