import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { OrderItem, Product } from '../types';

interface CartContextData {

  cartItems: OrderItem[];

  addToCart: (
    product: Product,
    quantity: number
  ) => void;

  removeFromCart: (
    productId: number
  ) => void;

  clearCart: () => void;
}

const CartContext = createContext<CartContextData>(
  {} as CartContextData
);

const STORAGE_KEY = '@TechStore:cart';

export function CartProvider({
  children
}: {
  children: React.ReactNode
}) {

  const [cartItems, setCartItems] =
    useState<OrderItem[]>([]);

  useEffect(() => {

    async function loadCart() {

      const storedCart =
        await AsyncStorage.getItem(STORAGE_KEY);

      if (storedCart) {

        setCartItems(JSON.parse(storedCart));
      }
    }

    loadCart();

  }, []);

  useEffect(() => {

    AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(cartItems)
    );

  }, [cartItems]);

  function addToCart(
    product: Product,
    quantity: number
  ) {

    setCartItems(prev => {

      const existingItem =
        prev.find(
          item => item.productId === product.id
        );

      if (existingItem) {

        return prev.map(item =>
          item.productId === product.id
            ? {
                ...item,
                quantity:
                  item.quantity + quantity
              }
            : item
        );
      }

      return [
        ...prev,
        {
          productId: product.id,
          quantity,
          price: product.price
        }
      ];
    });
  }

  function removeFromCart(productId: number) {

    setCartItems(prev =>
      prev.filter(
        item => item.productId !== productId
      )
    );
  }

  function clearCart() {

    setCartItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {

  return useContext(CartContext);
}
