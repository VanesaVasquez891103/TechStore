# 🚀 Guía Rápida de Desarrollo - TechStore

Referencia rápida para desarrolladores que trabajan en TechStore.

---

## 📋 Antes de comenzar

### Setup inicial

```bash
# Clonar el proyecto
cd TechStore

# Backend
npm install
npm build
npm start

# En otra terminal - Frontend
cd mobile
npm install
npm start
```

### Puertos
- **Backend API**: `http://localhost:3000`
- **Swagger Docs**: `http://localhost:3000/api/docs`
- **Expo**: `exp://192.168.80.56:8081` (varía según tu IP)

---

## 🔧 Desarrollo Backend

### Agregar un nuevo endpoint

**Ejemplo: Crear `GET /api/products/search`**

#### 1. Definir DTO y Interface

**`src/dtos/product.dto.ts`**:
```typescript
export interface ProductSearchDTO {
  query: string;
  minPrice?: number;
  maxPrice?: number;
  categoryId?: number;
}
```

**`src/interfaces/product.interfaces.ts`**:
```typescript
export interface IProductSearchResult {
  id: number;
  name: string;
  price: number;
  // ... más campos
}
```

#### 2. Agregar método en Service

**`src/services/product.service.ts`**:
```typescript
export const productService = {
  // ... métodos existentes

  searchProducts(query: string, minPrice?: number, maxPrice?: number, categoryId?: number) {
    let sql = 'SELECT * FROM products WHERE name LIKE ?';
    const params = [`%${query}%`];

    if (minPrice) {
      sql += ' AND price >= ?';
      params.push(minPrice);
    }
    if (maxPrice) {
      sql += ' AND price <= ?';
      params.push(maxPrice);
    }
    if (categoryId) {
      sql += ' AND categoryId = ?';
      params.push(categoryId);
    }

    const stmt = db.prepare(sql);
    return stmt.all(...params) as IProductSearchResult[];
  }
};
```

#### 3. Agregar método en Controller

**`src/controller/product.controller.ts`**:
```typescript
export const productController = {
  // ... controladores existentes

  searchProducts(req: Request, res: Response) {
    try {
      const { query, minPrice, maxPrice, categoryId } = req.query;
      
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ error: 'Query is required' });
      }

      const results = productService.searchProducts(
        query,
        minPrice ? Number(minPrice) : undefined,
        maxPrice ? Number(maxPrice) : undefined,
        categoryId ? Number(categoryId) : undefined
      );

      res.json(results);
    } catch (error) {
      res.status(500).json({ error: 'Search failed' });
    }
  }
};
```

#### 4. Agregar ruta

**`src/routes/product.routes.ts`**:
```typescript
import express from 'express';
import { productController } from '../controller/product.controller';

const router = express.Router();

// Rutas existentes...
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);

// Nueva ruta
router.get('/search/advanced', productController.searchProducts);

export default router;
```

#### 5. Probar en Swagger

```bash
# El endpoint estará disponible en http://localhost:3000/api/docs
GET /api/products/search/advanced?query=gafas&minPrice=100&maxPrice=500
```

---

## 📱 Desarrollo Frontend

### Agregar una nueva pantalla

**Ejemplo: Crear `WishlistScreen`**

#### 1. Crear archivo de pantalla

**`mobile/src/screens/WishlistScreen.tsx`**:
```typescript
import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppContext } from '../context/AppContext';
import { RootStackParamList } from '../navigation/types';
import { ProductCard } from '../components/ProductCard';

export function WishlistScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Wishlist'>>();
  // const { wishlist } = useAppContext(); // Cuando se implemente

  return (
    <View style={styles.container}>
      <Button title="Volver" onPress={() => navigation.goBack()} />
      <Text style={styles.title}>Mis Favoritos</Text>
      {/* <FlatList data={wishlist} ... /> */}
      <Text>Funcionalidad próximamente</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#eff3f7',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginVertical: 16,
    color: '#1f6f8b',
  },
});
```

#### 2. Agregar tipo a navegación

**`mobile/src/navigation/types.ts`**:
```typescript
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Detail: { product: Product };
  Cart: undefined;
  Profile: undefined;
  Admin: undefined;
  Wishlist: undefined;  // ← Agregar
};
```

#### 3. Importar en App.tsx

**`mobile/App.tsx`**:
```typescript
import { WishlistScreen } from './src/screens/WishlistScreen';  // ← Agregar import

// En el Navigator:
<Stack.Screen name="Wishlist" component={WishlistScreen} />
```

---

## 🔄 Flujo de cambios en Context

Cuando necesites agregar nueva funcionalidad al estado global:

#### Ejemplo: Agregar wishlist

**1. Agregar tipos**:
```typescript
// src/context/AppContext.tsx
interface AppContextValue {
  // ... existente
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  // ...
}
```

**2. Agregar estado**:
```typescript
const [wishlist, setWishlist] = useState<Product[]>([]);
```

**3. Agregar persistencia**:
```typescript
useEffect(() => {
  const saveWishlist = async () => {
    await AsyncStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  };
  saveWishlist();
}, [wishlist]);
```

**4. Agregar funciones**:
```typescript
const addToWishlist = useCallback((product: Product) => {
  setWishlist(prev => 
    prev.some(p => p.id === product.id) ? prev : [...prev, product]
  );
}, []);

const removeFromWishlist = useCallback((productId: number) => {
  setWishlist(prev => prev.filter(p => p.id !== productId));
}, []);
```

**5. Agregar al valor del Context**:
```typescript
const value = useMemo(
  () => ({
    // ... existente
    wishlist,
    addToWishlist,
    removeFromWishlist,
    // ...
  }),
  [wishlist, addToWishlist, removeFromWishlist, /* ... */]
);
```

---

## 🐛 Debugging

### Backend
```bash
# Logs en tiempo real
npm run dev

# Ver SQL queries
# Activar SQL logging en src/database/database.ts
db.on('trace', (sql) => console.log('SQL:', sql));
```

### Frontend
```bash
# Console logs en Expo
npm start
# Presiona 'i' para iOS o 'a' para Android en consola

# React DevTools
npm install -D @react-native-community/cli
```

---

## 📦 Instalar dependencias nuevas

### Backend
```bash
npm install nombre-paquete
npm install --save-dev @types/nombre-paquete
```

### Frontend
```bash
cd mobile
npm install nombre-paquete
# O con Expo
expo install nombre-paquete
```

---

## ✅ Checklist antes de commit

### Backend
- [ ] `npm build` compila sin errores
- [ ] Código TypeScript válido
- [ ] DTO y interfaces actualizados
- [ ] Service, controller y ruta creados
- [ ] Swagger docs actualizados
- [ ] Probado en http://localhost:3000/api/docs

### Frontend
- [ ] Sin errores de TypeScript
- [ ] Imports correctos (rutas relativas)
- [ ] AsyncStorage si es persistencia
- [ ] useAppContext() si necesita estado global
- [ ] Probado en Expo

---

## 🔍 Comandos útiles

```bash
# Backend
npm build           # Compilar TypeScript
npm start           # Ejecutar producción
npm run dev         # Ejecutar con nodemon

# Frontend
npm start           # Expo
npm run build       # Build de producción
```

---

## 📚 Recursos

- [Express Docs](https://expressjs.com)
- [React Native Docs](https://reactnative.dev)
- [React Navigation Docs](https://reactnavigation.org)
- [AsyncStorage Docs](https://react-native-async-storage.github.io)
- [SQLite Docs](https://www.sqlite.org)
- [TypeScript Docs](https://www.typescriptlang.org)

---

## 🆘 Problemas comunes

### "Cannot find module '../src/...'"
**Solución**: Cambiar imports a `../` en lugar de `../src/`

### "Port 3000 is already in use"
**Solución**: `lsof -i :3000` y matar el proceso, o cambiar puerto en `src/server.ts`

### "Metro bundler stuck"
**Solución**: `npm start -- --reset-cache` en mobile/

### Cambios de código no se reflejan
**Backend**: Ejecutar `npm build` primero
**Frontend**: Recargar en Expo (r en terminal) o recrear la app

---

**Última actualización:** Mayo 2026
