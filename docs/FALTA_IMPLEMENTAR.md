# 🚧 Lo que falta implementar - TechStore

Este documento detalla todas las características y funcionalidades que aún están pendientes de implementar en la aplicación TechStore.

---

## 📱 APP MÓVIL

### Características Pendientes

#### 1. **Búsqueda avanzada y filtros**
- [ ] Filtro por rango de precio
- [ ] Filtro por marca
- [ ] Filtro por valoración
- [ ] Ordenamiento (precio ascendente/descendente, popularidad)
- [ ] Guardado de búsquedas frecuentes

**Ubicación estimada**: `mobile/src/screens/ProductListScreen.tsx`

---

#### 2. **Carrito mejorado**
- [ ] Editar cantidad directamente desde el carrito
- [ ] Aplicar códigos de descuento
- [ ] Estimar envío
- [ ] Guardar para después
- [ ] Ícono con cantidad de items en botón del carrito

**Ubicación estimada**: `mobile/src/screens/CartScreen.tsx`

---

#### 3. **Checkout y pagos**
- [ ] Pantalla de dirección de envío
- [ ] Pantalla de método de pago
- [ ] Integración con Stripe o PayPal
- [ ] Confirmación de pedido
- [ ] Recibo/PDF del pedido

**Archivos a crear**: 
- `mobile/src/screens/ShippingScreen.tsx`
- `mobile/src/screens/PaymentScreen.tsx`
- `mobile/src/screens/OrderConfirmationScreen.tsx`

---

#### 4. **Historial de órdenes**
- [ ] Listado de mis pedidos
- [ ] Estado de cada pedido
- [ ] Rastreo de envío
- [ ] Detalles del pedido
- [ ] Opción para reordenar

**Archivos a crear**:
- `mobile/src/screens/OrderHistoryScreen.tsx`
- `mobile/src/screens/OrderDetailScreen.tsx`

---

#### 5. **Calificaciones y reseñas**
- [ ] Pantalla para calificar producto
- [ ] Mostrar calificación de producto
- [ ] Listado de reseñas del producto
- [ ] Fotos en reseñas

**Archivos a crear**:
- `mobile/src/screens/ReviewScreen.tsx`
- `mobile/src/components/ReviewCard.tsx`

---

#### 6. **Wishlist / Favoritos**
- [ ] Agregar a favoritos desde producto
- [ ] Pantalla de favoritos
- [ ] Ícono de corazón en productos
- [ ] Sincronizar favoritos con backend

**Archivos a crear**:
- `mobile/src/screens/WishlistScreen.tsx`
- Actualizar `mobile/src/context/AppContext.tsx`

---

#### 7. **Notificaciones**
- [ ] Notificaciones push
- [ ] Notificaciones de estado de pedido
- [ ] Notificaciones de ofertas
- [ ] Centro de notificaciones en app

**Dependencias a instalar**:
```bash
npm install expo-notifications
npm install expo-permissions
```

---

#### 8. **Panel de Administración**
- [ ] Agregar nuevo producto
- [ ] Editar producto
- [ ] Eliminar producto
- [ ] Gestionar inventario
- [ ] Ver órdenes de todos los clientes
- [ ] Cambiar estado de órdenes
- [ ] Ver reportes de ventas

**Archivos a crear**:
- `mobile/src/screens/AdminProductsScreen.tsx`
- `mobile/src/screens/AdminOrdersScreen.tsx`
- `mobile/src/screens/AdminReportsScreen.tsx`
- `mobile/src/screens/AdminSettingsScreen.tsx`

---

#### 9. **Perfil de usuario mejorado**
- [ ] Editar datos personales
- [ ] Cambiar contraseña
- [ ] Múltiples direcciones de envío
- [ ] Métodos de pago guardados
- [ ] Preferencias (idioma, moneda)
- [ ] Foto de perfil

**Ubicación estimada**: `mobile/src/screens/ProfileScreen.tsx`

---

#### 10. **Búsqueda por foto/código QR** ⭐
- [ ] Tomar foto de monturas/lentes
- [ ] Escanear código QR de producto
- [ ] Búsqueda por similitud

**Dependencias a instalar**:
```bash
npm install expo-camera
npm install expo-barcode-scanner
npm install react-native-vision-camera
```

---

## 🔌 API BACKEND

### Endpoints Pendientes

#### 1. **Autenticación y Tokens**
- [ ] Generar JWT token en login
- [ ] Middleware de verificación de token
- [ ] Refresh token
- [ ] Logout/Invalidar token
- [ ] Recuperación de contraseña
- [ ] Cambio de contraseña

**Archivos a crear**:
```
src/middlewares/auth.middleware.ts
src/utils/jwt.utils.ts
```

**Dependencias a instalar**:
```bash
npm install jsonwebtoken bcryptjs
npm install --save-dev @types/jsonwebtoken
```

---

#### 2. **Pagos**
- [ ] Endpoint para procesar pagos
- [ ] Integración con Stripe
- [ ] Integración con PayPal
- [ ] Webhook para confirmación de pago
- [ ] Historial de transacciones

**Archivos a crear**:
```
src/controller/payment.controller.ts
src/services/payment.service.ts
src/routes/payment.routes.ts
```

---

#### 3. **Calificaciones y Reseñas**
- [ ] GET /api/reviews - Listar reseñas
- [ ] POST /api/reviews - Crear reseña
- [ ] PUT /api/reviews/:id - Editar reseña
- [ ] DELETE /api/reviews/:id - Eliminar reseña
- [ ] GET /api/products/:id/reviews - Reseñas de producto

**Archivos a crear**:
```
src/controller/review.controller.ts
src/services/review.service.ts
src/routes/review.routes.ts
src/dtos/review.dto.ts
src/interfaces/review.interfaces.ts
```

**Tabla a crear**:
```sql
CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    productId INTEGER NOT NULL,
    userId INTEGER NOT NULL,
    rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
    comment TEXT,
    createdAt TEXT NOT NULL,
    FOREIGN KEY(productId) REFERENCES products(id),
    FOREIGN KEY(userId) REFERENCES users(id)
);
```

---

#### 4. **Wishlist**
- [ ] GET /api/wishlists - Mi wishlist
- [ ] POST /api/wishlists - Agregar a wishlist
- [ ] DELETE /api/wishlists/:productId - Quitar de wishlist

**Archivos a crear**:
```
src/controller/wishlist.controller.ts
src/services/wishlist.service.ts
src/routes/wishlist.routes.ts
```

**Tabla a crear**:
```sql
CREATE TABLE IF NOT EXISTS wishlists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL UNIQUE,
    createdAt TEXT NOT NULL,
    FOREIGN KEY(userId) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS wishlist_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    wishlistId INTEGER NOT NULL,
    productId INTEGER NOT NULL,
    addedAt TEXT NOT NULL,
    FOREIGN KEY(wishlistId) REFERENCES wishlists(id),
    FOREIGN KEY(productId) REFERENCES products(id)
);
```

---

#### 5. **Carrito del servidor**
- [ ] GET /api/cart - Mi carrito
- [ ] POST /api/cart/items - Agregar item
- [ ] PUT /api/cart/items/:id - Actualizar cantidad
- [ ] DELETE /api/cart/items/:id - Quitar item
- [ ] DELETE /api/cart - Vaciar carrito

**Archivos a crear**:
```
src/controller/cart.controller.ts
src/services/cart.service.ts
src/routes/cart.routes.ts
```

---

#### 6. **Direcciones de envío**
- [ ] GET /api/addresses - Mis direcciones
- [ ] POST /api/addresses - Crear dirección
- [ ] PUT /api/addresses/:id - Editar dirección
- [ ] DELETE /api/addresses/:id - Eliminar dirección
- [ ] PUT /api/addresses/:id/default - Marcar como default

**Archivos a crear**:
```
src/controller/address.controller.ts
src/services/address.service.ts
src/routes/address.routes.ts
```

**Tabla a crear**:
```sql
CREATE TABLE IF NOT EXISTS addresses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    label TEXT,
    street TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT,
    zipCode TEXT,
    country TEXT NOT NULL,
    phone TEXT,
    isDefault INTEGER DEFAULT 0,
    FOREIGN KEY(userId) REFERENCES users(id)
);
```

---

#### 7. **Notificaciones**
- [ ] Crear tabla de notificaciones
- [ ] GET /api/notifications - Mis notificaciones
- [ ] POST /api/notifications/send-push - Enviar push
- [ ] PUT /api/notifications/:id/read - Marcar como leída

**Archivos a crear**:
```
src/controller/notification.controller.ts
src/services/notification.service.ts
src/routes/notification.routes.ts
```

---

#### 8. **Reportes y Analytics**
- [ ] GET /api/reports/sales - Reportes de venta
- [ ] GET /api/reports/inventory - Reportes de inventario
- [ ] GET /api/reports/customers - Reportes de clientes
- [ ] GET /api/reports/top-products - Productos más vendidos

**Archivos a crear**:
```
src/controller/report.controller.ts
src/services/report.service.ts
src/routes/report.routes.ts
```

---

#### 9. **Búsqueda mejorada**
- [ ] Full-text search en productos
- [ ] Búsqueda por atributos (marca, color, tamaño)
- [ ] Sugerencias de búsqueda

---

#### 10. **Envíos y Rastreo**
- [ ] Integración con proveedores de envío
- [ ] GET /api/shipments/:orderId - Rastrear envío
- [ ] Estimación de entrega
- [ ] Webhook de actualización de envío

---

## 🔒 Seguridad

- [ ] Validación de entrada en todos los endpoints
- [ ] Rate limiting para evitar ataques
- [ ] HTTPS en producción
- [ ] Sanitización de datos
- [ ] Protección contra SQL injection
- [ ] CORS configurado correctamente
- [ ] Variables de entorno sensibles (.env)

---

## 🧪 Testing

- [ ] Tests unitarios del backend
- [ ] Tests de integración de API
- [ ] Tests de componentes React Native
- [ ] Tests E2E de la app completa

---

## 📊 Mejoras en Infraestructura

- [ ] Docker para backend
- [ ] CI/CD pipeline
- [ ] Monitoreo y logs centralizados
- [ ] Caché (Redis)
- [ ] CDN para imágenes
- [ ] Backup automático de BD

---

## 🎨 UI/UX Improvements

- [ ] Tema oscuro
- [ ] Internacionalización (i18n)
- [ ] Accesibilidad (WCAG)
- [ ] Animaciones y transiciones
- [ ] Loading states mejorados
- [ ] Error handling más amigable

---

## 📋 Resumen Prioritizado

### Fase 1 (MVP completar)
1. Autenticación con JWT ⭐
2. Carrito del servidor
3. Checkout básico
4. Historial de órdenes

### Fase 2 (Monetización)
1. Sistema de pagos (Stripe)
2. Wishlist
3. Reseñas y calificaciones

### Fase 3 (Engagement)
1. Notificaciones push
2. Panel admin completo
3. Búsqueda avanzada

### Fase 4 (Escala)
1. Analytics y reportes
2. Optimización de performance
3. Rastreo de envíos

---

**Última actualización:** Mayo 2026

Para agregar cualquiera de estas características, consulta con el equipo de desarrollo.
