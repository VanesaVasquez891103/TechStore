# 🏗️ Arquitectura de TechStore

Documentación de la arquitectura técnica de la aplicación TechStore.

---

## 📐 Diagrama General

```
┌─────────────────────────────────────┐
│     📱 App Móvil (React Native)     │
│    - Expo 55.x                      │
│    - React Navigation               │
│    - AsyncStorage para persistencia │
└──────────────────┬──────────────────┘
                   │
                   │ HTTP/REST
                   ▼
┌─────────────────────────────────────┐
│    🔌 API Backend (Express)         │
│    - Node.js + TypeScript           │
│    - CORS habilitado                │
│    - Swagger docs                   │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│    🗄️ Base de Datos (SQLite)        │
│    - Archivo: data/techstore.db     │
│    - 8 tablas relacionales          │
│    - Foreign keys activadas         │
└─────────────────────────────────────┘
```

---

## 🏛️ Backend Architecture

### 1. Capas del Backend

```
Request
   ▼
┌─ Router (routes/*.ts) ─────────────────────┐
│ Define endpoints y rutas                    │
└─────────┬──────────────────────────────────┘
          ▼
┌─ Controller (controller/*.ts) ─────────────┐
│ Maneja solicitudes HTTP                     │
│ Valida entrada (middleware)                 │
│ Llama servicios                             │
│ Retorna respuestas                          │
└─────────┬──────────────────────────────────┘
          ▼
┌─ Service (services/*.ts) ──────────────────┐
│ Lógica de negocio                           │
│ Transformación de datos                     │
│ Reglas de negocio                           │
└─────────┬──────────────────────────────────┘
          ▼
┌─ Database (database/database.ts) ─────────┐
│ Queries SQL                                 │
│ Conexión SQLite                             │
│ Transacciones                               │
└─────────┬──────────────────────────────────┘
          ▼
    SQLite Database
```

### 2. Flujo de una solicitud

**Ejemplo: GET /api/products**

```
1. Router matchea /api/products
   → product.routes.ts

2. Controller valida y procesaFetch
   → product.controller.ts (getProducts)

3. Service obtiene datos del BD
   → product.service.ts (getProducts)

4. Database ejecuta SQL query
   → database.database.ts

5. Retorna Array<Product>
   → Service transforma
   → Controller retorna JSON
   → Cliente recibe Array<Product>
```

### 3. Estructura de archivos Backend

```
src/
├── server.ts                    # ✅ Punto de entrada
│   - Crea app Express
│   - Configura middlewares globales
│   - Monta rutas
│   - Inicia servidor en puerto 3000
│
├── database/
│   └── database.ts             # ✅ SQLite setup
│       - Crea/inicializa BD
│       - Crea tablas
│       - Seedea datos JSON
│       - Exporta instancia db
│
├── config/
│   └── swagger.config.ts       # ✅ Documentación
│       - Configuración Swagger
│       - Metadata de API
│       - Especificación OpenAPI
│
├── middlewares/
│   ├── logger.middleware.ts    # ✅ Logs
│   ├── error.middleware.ts     # ✅ Manejo de errores
│   ├── validation.middleware.ts # ✅ Validación de datos
│   └── not-found.middleware.ts # ✅ 404 handler
│
├── routes/
│   ├── index.ts                # ✅ Agregador de rutas
│   ├── user.routes.ts          # ✅ /api/users
│   ├── product.routes.ts       # ✅ /api/products
│   ├── category.routes.ts      # ✅ /api/categories
│   ├── order.routes.ts         # ✅ /api/orders
│   └── orderitem.routes.ts     # ✅ /api/order-items
│
├── controller/
│   ├── user.controller.ts      # ✅ Lógica de usuarios
│   ├── product.controller.ts   # ✅ Lógica de productos
│   ├── category.controller.ts  # ✅ Lógica de categorías
│   ├── order.controller.ts     # ✅ Lógica de órdenes
│   └── orderitem.controller.ts # ✅ Lógica de items
│
├── services/
│   ├── user.service.ts         # ✅ Negocio de usuarios
│   ├── product.service.ts      # ✅ Negocio de productos
│   ├── category.service.ts     # ✅ Negocio de categorías
│   ├── order.service.ts        # ✅ Negocio de órdenes
│   └── orderitem.service.ts    # ✅ Negocio de items
│
├── dtos/
│   ├── user.dto.ts             # ✅ Validación/transformación usuarios
│   ├── product.dto.ts          # ✅ Validación/transformación productos
│   ├── category.dto.ts         # ✅ Validación/transformación categorías
│   ├── order.dto.ts            # ✅ Validación/transformación órdenes
│   └── orderitem.dto.ts        # ✅ Validación/transformación items
│
└── interfaces/
    ├── user.interfaces.ts      # ✅ Tipos de usuario
    ├── product.interfaces.ts   # ✅ Tipos de producto
    ├── category.interfaces.ts  # ✅ Tipos de categoría
    ├── order.interfaces.ts     # ✅ Tipos de orden
    └── [otros].interfaces.ts
```

---

## 📱 Frontend Mobile Architecture

### 1. Capas de la App Móvil

```
UI (Screens + Components)
   ▼
React Context (Global State)
   ▼
API Service (HTTP calls)
   ▼
AsyncStorage (Persistencia)
   ▼
Device Storage (Datos locales)
```

### 2. Flujo de un acción de usuario

**Ejemplo: Usuario busca productos**

```
1. Usuario escribe en searchbox
   → TextInput onChange dispara setSearch()
   → Context actualiza estado 'search'

2. Context detecta cambio
   → Ejecuta refreshProducts()
   → Llama a api.getProducts(search, categoryId)

3. API Service hace HTTP GET
   → /api/products?search=gafas&categoryId=1
   → Backend retorna Array<Product>

4. Context actualiza 'products'
   → setProducts(response)

5. ProductListScreen re-renderiza
   → FlatList muestra nuevos productos

6. AsyncStorage guarda 'search'
   → Persistencia para la próxima sesión
```

### 3. Estructura de archivos Móvil

```
mobile/
├── App.tsx                      # ✅ Componente raíz
│   - AppContextProvider envuelve todo
│   - NavigationContainer setup
│   - Lógica de rutas (login/home)
│   - Carga de AsyncStorage
│
├── src/
│   ├── screens/
│   │   ├── LoginScreen.tsx      # ✅ Login
│   │   │   - useNavigation() para navegar
│   │   │   - useAppContext() para login()
│   │   │   - Estados locales: email, password
│   │   │
│   │   ├── RegisterScreen.tsx   # ✅ Registro
│   │   │   - Igual a LoginScreen
│   │   │   - Llama context.register()
│   │   │
│   │   ├── ProductListScreen.tsx # ✅ Catálogo
│   │   │   - FlatList de productos
│   │   │   - CategoryFilter
│   │   │   - TextInput de búsqueda
│   │   │   - NavigationButtons
│   │   │
│   │   ├── ProductDetailScreen.tsx # ✅ Detalle
│   │   │   - Image del producto
│   │   │   - Detalles (precio, stock)
│   │   │   - TextInput cantidad
│   │   │   - Botón "Agregar al carrito"
│   │   │
│   │   ├── CartScreen.tsx       # ✅ Carrito
│   │   │   - FlatList de CartItems
│   │   │   - Total calculado
│   │   │   - Botón "Confirmar pedido"
│   │   │
│   │   ├── ProfileScreen.tsx    # ✅ Perfil
│   │   │   - Datos de usuario
│   │   │   - Rol, email, nombre
│   │   │
│   │   └── AdminPanelScreen.tsx # ✅ Admin
│   │       - Pantalla placeholder
│   │       - Describe funciones admin
│   │
│   ├── components/
│   │   ├── ProductCard.tsx      # ✅ Card de producto
│   │   │   - Imagen, nombre, precio
│   │   │   - onPress navega a Detail
│   │   │
│   │   ├── CartItem.tsx         # ✅ Item del carrito
│   │   │   - ProductInfo
│   │   │   - Cantidad y precio
│   │   │   - Botón eliminar
│   │   │
│   │   └── CategoryFilter.tsx   # ✅ Filtro categorías
│   │       - ScrollView horizontal
│   │       - Botones de categorías
│   │       - onSelect callback
│   │
│   ├── context/
│   │   └── AppContext.tsx       # ✅ Estado Global
│   │       - createContext(AppContextValue)
│   │       - useState hooks
│   │       - useEffect para AsyncStorage
│   │       - Funciones: login, logout, addToCart, etc.
│   │       - useMemo para optimización
│   │       - useAppContext() hook custom
│   │
│   ├── services/
│   │   └── api.ts               # ✅ HTTP Service
│   │       - API_ORIGIN setup
│   │       - resolveImageUrl()
│   │       - login(email, password)
│   │       - register(name, email, password)
│   │       - getProducts(search, categoryId)
│   │       - getCategories()
│   │       - createOrder(order)
│   │       - [más funciones API]
│   │
│   ├── navigation/
│   │   └── types.ts             # ✅ Tipos navegación
│   │       - RootStackParamList
│   │       - Define todas las pantallas
│   │       - Parámetros de cada pantalla
│   │
│   └── types/
│       └── index.ts             # ✅ Tipos comunes
│           - Product, Category, User
│           - Order, OrderItem
│           - Interfaces TypeScript
│
└── package.json                 # Dependencias
```

### 4. Context API Deep Dive

```typescript
// Estado
user: User | null                    // Usuario actual o null
products: Product[]                  // Lista de productos
categories: Category[]               // Lista de categorías
cartItems: OrderItem[]               // Items en carrito
search: string                       // Término de búsqueda
categoryId?: number                  // Categoría seleccionada
loading: boolean                     // Está cargando

// Acciones
login(user): void                    // Guardar usuario
logout(): void                       // Limpiar usuario
register(): void                     // Registrar nuevo
addToCart(product, qty): void        // Agregar al carrito
removeFromCart(productId): void      // Quitar del carrito
placeOrder(): void                   // Confirmar pedido
setSearch(value): void               // Cambiar búsqueda
setCategoryId(id): void              // Cambiar categoría
refreshProducts(): void              // Refrescar lista
refreshCategories(): void            // Refrescar categorías

// Persistencia con AsyncStorage
USER_STORAGE_KEY = '@TechStore:user'
CART_STORAGE_KEY = '@TechStore:cartItems'
SEARCH_STORAGE_KEY = '@TechStore:search'
CATEGORY_ID_STORAGE_KEY = '@TechStore:categoryId'
```

---

## 🗄️ Base de Datos

### Modelo Relacional

```
┌────────────┐
│   users    │
├────────────┤
│ id (PK)    │──┐
│ email      │  │
│ password   │  │
│ name       │  │
│ role       │  │
│ ...        │  │
└────────────┘  │
                │
        ┌───────┴────────────────────────┐
        │                                 │
        ▼                                 ▼
    ┌────────────┐              ┌──────────────┐
    │  orders    │              │  wishlists   │
    ├────────────┤              ├──────────────┤
    │ id (PK)    │              │ id (PK)      │
    │ userId(FK) │──────┐       │ userId (FK)  │
    │ total      │      │       │ ...          │
    │ status     │      │       └──────────────┘
    │ ...        │      │
    └────┬───────┘      │
         │              │
         ▼              │      ┌─────────────┐
    ┌──────────────┐    │      │ categories  │
    │ order_items  │    │      ├─────────────┤
    ├──────────────┤    │      │ id (PK)     │
    │ id (PK)      │    │      │ name        │
    │ orderId (FK) │────┤      │ ...         │
    │ productId(FK)│──┐ │      └─────┬───────┘
    │ quantity     │  │ │            │
    │ price        │  │ │            ▼
    └──────────────┘  │ │      ┌──────────────┐
                      │ │      │  products    │
                      │ │      ├──────────────┤
                      │ │      │ id (PK)      │
                      │ └──────│ categoryId(FK)
                      │        │ name         │
                      │        │ price        │
                      └────────│ stock        │
                               │ image        │
                               │ ...          │
                               └──────────────┘
```

### Tablas (8 total)

| # | Tabla | Propósito | Estado |
|----|-------|----------|--------|
| 1 | `users` | Autenticación y perfil | ✅ Implementada |
| 2 | `categories` | Tipos de productos | ✅ Implementada |
| 3 | `products` | Catálogo | ✅ Implementada |
| 4 | `orders` | Pedidos de compra | ✅ Implementada |
| 5 | `order_items` | Detalles de cada pedido | ✅ Implementada |
| 6 | `payments` | Pagos (reservada) | ⏳ Sin usar |
| 7 | `carts` | Carrito por usuario (reservada) | ⏳ Sin usar |
| 8 | `cart_items` | Items en carrito (reservada) | ⏳ Sin usar |

---

## 🔄 Flujos principales

### 1. Flujo de Autenticación (Login)

```
Usuario escribe email y password
            │
            ▼
      ┌─────────────────────────────┐
      │ LoginScreen.handleSubmit()  │
      │ api.login(email, password)  │
      └──────────┬──────────────────┘
                 │
                 ▼
      ┌─────────────────────────────┐
      │ Backend POST /api/users/... │
      │ user.controller.ts:login()  │
      │ user.service.ts:findByEmail()
      │ Valida password             │
      │ Retorna User                │
      └──────────┬──────────────────┘
                 │
                 ▼
      ┌─────────────────────────────┐
      │ AppContext.login(user)      │
      │ - setUser(user)             │
      │ - Guarda en AsyncStorage    │
      └──────────┬──────────────────┘
                 │
                 ▼
      ┌─────────────────────────────┐
      │ Navigation.replace('Home')  │
      │ ProductListScreen se carga  │
      └─────────────────────────────┘
```

### 2. Flujo de Compra (Carrito → Orden)

```
Usuario agrega producto al carrito
            │
            ▼
    ┌────────────────────────────┐
    │ ProductCard onPress        │
    │ context.addToCart()        │
    │ - Agrega a cartItems       │
    │ - Guarda en AsyncStorage   │
    └────────┬───────────────────┘
             │
             ▼
    ┌────────────────────────────┐
    │ Usuario navega a CartScreen│
    │ Revisa items               │
    └────────┬───────────────────┘
             │
             ▼
    ┌────────────────────────────┐
    │ Toca "Confirmar pedido"    │
    │ context.placeOrder()       │
    └────────┬───────────────────┘
             │
             ▼
    ┌────────────────────────────┐
    │ POST /api/orders           │
    │ Backend crea Order         │
    │ Crea OrderItems            │
    │ Retorna confirma           │
    └────────┬───────────────────┘
             │
             ▼
    ┌────────────────────────────┐
    │ Context limpia cartItems   │
    │ Navega a Home              │
    │ ¡Compra completada!        │
    └────────────────────────────┘
```

---

## 🔐 Seguridad Actual

✅ **Implementado:**
- CORS habilitado
- JSON parsing seguro
- Conexión SQLite con foreign keys

❌ **No implementado (TODO):**
- JWT para autenticación sin estado
- Hash de passwords con bcrypt
- Rate limiting
- Validación estricta de entrada
- HTTPS
- .env variables

---

## ⚡ Performance

### Optimizaciones Actuales
- ✅ SQLite índices implícitos en PKs
- ✅ React.useMemo en Context
- ✅ Lazy loading de pantallas
- ✅ FlatList en lugar de ScrollView

### Posibles mejoras
- [ ] Pagination en listados
- [ ] Caché en el client
- [ ] Compresión de imágenes
- [ ] WebP en lugar de PNG/JPG
- [ ] Lazy loading de imágenes
- [ ] Service Worker (web)

---

## 📊 Estadísticas del Código

```
Backend:
├── TypeScript: 500+ líneas
├── Rutas: 5 recursos
├── Controllers: 5 métodos por recurso
└── Services: Lógica de negocio

Frontend Móvil:
├── React Native: 1000+ líneas
├── Screens: 7 pantallas
├── Components: 3 componentes
└── Context: Estado global
```

---

**Última actualización:** Mayo 2026
