# 👓 TechStore - Aplicación de Óptica

TechStore es una plataforma de e-commerce especializada en óptica que cuenta con:
- **Backend API** en Node.js + Express + TypeScript con persistencia en SQLite
- **App móvil** en React Native + Expo con estado persistente en AsyncStorage

---

## 🚀 Inicio rápido

### Requisitos previos
- Node.js v16+ instalado
- npm o yarn
- Expo Go instalado en tu dispositivo móvil (opcional, para probar la app)

### 1. Ejecutar el Backend (API)

```bash
cd TechStore
npm install
npm start
```

La API estará disponible en `http://localhost:3000`
- 📚 Documentación interactiva: `http://localhost:3000/api/docs`
- Base de datos SQLite: `data/techstore.db`

### 2. Ejecutar la App Móvil

```bash
cd TechStore/mobile
npm install
npm start
```

Escanea el código QR con tu dispositivo usando **Expo Go** para cargar la aplicación.

---

## 📁 Estructura del Proyecto

```
TechStore/
├── src/                       # Backend (API)
│   ├── server.ts             # Configuración principal del servidor
│   ├── database/             # SQLite y seeding de datos
│   ├── routes/               # Definición de rutas
│   ├── controller/           # Controladores (lógica de solicitudes)
│   ├── services/             # Servicios (lógica de negocio)
│   ├── middlewares/          # Middlewares (autenticación, errores, logs)
│   ├── interfaces/           # Tipos TypeScript
│   ├── dtos/                 # Objetos de transferencia de datos
│   └── config/               # Configuración (Swagger, env)
├── mobile/                    # App móvil (React Native + Expo)
│   ├── App.tsx               # Componente raíz
│   ├── src/
│   │   ├── screens/          # Pantallas principales
│   │   ├── components/       # Componentes reutilizables
│   │   ├── context/          # React Context (estado global)
│   │   ├── services/         # Servicios (llamadas API)
│   │   ├── navigation/       # Configuración de navegación
│   │   └── types/            # Tipos TypeScript
│   └── package.json
├── data/                      # Archivos JSON de ejemplo
├── assets/                    # Imágenes y recursos
└── package.json
```

---

## 🔌 API Backend

### Endpoints principales

#### 👤 Usuarios
- `POST /api/users/login` - Iniciar sesión
- `POST /api/users/register` - Crear nueva cuenta
- `GET /api/users/:id` - Obtener perfil
- `PUT /api/users/:id` - Actualizar perfil

#### 📦 Productos
- `GET /api/products` - Listar productos (con filtros: búsqueda, categoría)
- `GET /api/products/:id` - Detalle de producto
- `POST /api/products` - Crear producto (admin)
- `PUT /api/products/:id` - Actualizar producto (admin)
- `DELETE /api/products/:id` - Eliminar producto (admin)

#### 🏷️ Categorías
- `GET /api/categories` - Listar categorías
- `GET /api/categories/:id` - Detalle de categoría
- `POST /api/categories` - Crear categoría (admin)

#### 🛒 Órdenes
- `GET /api/orders` - Listar mis órdenes
- `POST /api/orders` - Crear nueva orden
- `GET /api/orders/:id` - Detalle de orden
- `PUT /api/orders/:id` - Actualizar estado de orden (admin)

#### 📋 Items de Orden
- `GET /api/order-items` - Listar items
- `POST /api/order-items` - Agregar item a orden

---

## 📱 App Móvil

### Pantallas principales

1. **LoginScreen** - Iniciar sesión con email y contraseña
2. **RegisterScreen** - Crear nueva cuenta
3. **ProductListScreen** - Catálogo de productos
   - Búsqueda por nombre
   - Filtro por categoría
   - Listado de productos
   - Botones de Carrito, Perfil, Salir

4. **ProductDetailScreen** - Detalle de producto
   - Imagen, nombre, precio
   - Descripción y stock disponible
   - Selector de cantidad
   - Botón agregar al carrito

5. **CartScreen** - Carrito de compras
   - Listado de items
   - Total del carrito
   - Botón para confirmar pedido

6. **ProfileScreen** - Mi perfil
   - Nombre, email, rol del usuario

7. **AdminPanelScreen** - Panel de administración
   - Vista previa de funciones admin
   - Gestión de productos y catálogo

### Características técnicas

#### Estado Global (Context + AsyncStorage)
```javascript
useAppContext() // Hook para acceder al estado global
// Retorna:
{
  user,              // Usuario autenticado (null si no está logueado)
  products,          // Listado de productos
  categories,        // Listado de categorías
  cartItems,         // Items en el carrito
  search,            // Término de búsqueda
  categoryId,        // Categoría seleccionada
  loading,           // Estado de carga
  
  // Funciones
  login,             // Iniciar sesión
  logout,            // Cerrar sesión
  register,          // Registrarse
  addToCart,         // Agregar al carrito
  removeFromCart,    // Quitar del carrito
  placeOrder,        // Confirmar pedido
  setSearch,         // Cambiar búsqueda
  setCategoryId,     // Cambiar categoría
  refreshProducts,   // Refrescar listado
  refreshCategories, // Refrescar categorías
}
```

#### Persistencia
- **Usuario**: Se guarda en AsyncStorage cuando inicia sesión
- **Carrito**: Se sincroniza automáticamente con AsyncStorage
- **Búsqueda**: Se mantiene entre sesiones
- **Categoría**: Se recuerda la última seleccionada

---

## 🗄️ Base de Datos (SQLite)

### Tablas principales

| Tabla | Descripción |
|-------|-------------|
| `users` | Usuarios registrados |
| `categories` | Categorías de productos (monturas, lentes, etc.) |
| `products` | Catálogo de productos |
| `orders` | Pedidos de compra |
| `order_items` | Items dentro de cada pedido |
| `payments` | Pagos de órdenes (tabla reservada) |
| `carts` | Carrito de compras por usuario (tabla reservada) |
| `cart_items` | Items en el carrito (tabla reservada) |

### Seeding de datos
La base de datos se inicializa automáticamente con datos de ejemplo de los archivos JSON en la carpeta `data/`.

---

## 🔐 Autenticación

### Flujo de Login
1. Usuario ingresa email y contraseña
2. Backend valida credenciales
3. Si es válido, retorna datos del usuario
4. App guarda usuario en Context + AsyncStorage
5. Se redirige a pantalla de productos

### Flujo de Logout
1. Usuario toca botón "Salir"
2. Se limpia usuario y carrito de Context
3. Se borra de AsyncStorage
4. Se redirige a login

---

## 🛠️ Tecnologías utilizadas

### Backend
- **Node.js** v18+
- **Express** 5.x - Framework web
- **TypeScript** - Tipado estático
- **SQLite** (better-sqlite3) - Base de datos
- **Swagger** - Documentación API
- **CORS** - Compartir recursos entre orígenes

### Frontend Móvil
- **React** 19.x
- **React Native** 0.83
- **Expo** 55.x - Plataforma para React Native
- **React Navigation** 6.x - Navegación entre pantallas
- **AsyncStorage** - Almacenamiento local persistente
- **TypeScript** - Tipado estático

---

## 📝 Uso de la API

### Ejemplo: Listar productos
```bash
curl http://localhost:3000/api/products?search=gafas&categoryId=1
```

### Ejemplo: Iniciar sesión
```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@example.com",
    "password": "password123"
  }'
```

---

## 🚧 Lo que falta por implementar

Ver el archivo [FALTA_IMPLEMENTAR.md](./FALTA_IMPLEMENTAR.md) para detalles completos.

**Resumen rápido:**
- ✅ CRUD de usuarios (login, registro, perfil)
- ✅ CRUD de productos
- ✅ CRUD de categorías
- ✅ CRUD de órdenes básico
- ❌ Sistema de pagos (Stripe, PayPal)
- ❌ Autenticación con JWT/tokens
- ❌ Panel admin completo
- ❌ Historial de órdenes (backend)
- ❌ Calificaciones y comentarios
- ❌ Wishlist
- ❌ Notificaciones push
- ❌ Rastreo de envíos

---

## 🐛 Troubleshooting

### "Unable to resolve module" en Expo
**Problema**: Imports con `../src/` en lugar de `../`
**Solución**: Actualizar imports a rutas relativas correctas

### Puerto 3000/8081 en uso
**Problema**: La API o Expo intenta usar un puerto ocupado
**Solución**: 
- Para Expo: Selecciona usar otro puerto cuando pregunte
- Para API: Cambia el puerto en `src/server.ts` o en variable `PORT`

### La app no conecta con la API
**Problema**: IP local diferente o firewall
**Solución**: Verifica que la IP en `mobile/src/services/api.ts` sea correcta (192.168.80.56 puede variar)

---

## 📧 Contacto

Para preguntas o reportar bugs, contacta al equipo de desarrollo.

**Última actualización:** Mayo 2026
