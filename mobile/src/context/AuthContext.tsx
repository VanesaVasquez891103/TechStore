import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { User } from '../types';
import { api } from '../services/api';

interface AuthContextData {
  user: User | null;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

const STORAGE_KEY = '@TechStore:user';

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {

    async function loadUser() {

      const storedUser =
        await AsyncStorage.getItem(STORAGE_KEY);

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }

    loadUser();

  }, []);

  async function login(loggedUser: User) {

    setUser(loggedUser);

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(loggedUser)
    );
  }

  async function logout() {

    setUser(null);

    await AsyncStorage.removeItem(STORAGE_KEY);
  }

  async function register(
    name: string,
    email: string,
    password: string
  ) {

    const user = await api.register(
      name,
      email,
      password
    );

    setUser(user);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {

  return useContext(AuthContext);
}

