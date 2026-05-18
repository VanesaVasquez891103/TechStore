# 📚 Referencia de API - TechStore

Documentación rápida de todos los endpoints disponibles.

**Base URL**: `http://localhost:3000/api`

---

## 👤 Usuarios

### Login
```http
POST /users/login
Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "password123"
}

Response: 200
{
  "id": 1,
  "name": "Juan Pérez",
  "email": "usuario@example.com",
  "role": "customer"
}
```

### Registro
```http
POST /users/register
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "usuario@example.com",
  "password": "password123"
}

Response: 201
{
  "id": 1,
  "name": "Juan Pérez",
  "email": "usuario@example.com",
  "role": "customer"
}
```

### Obtener Perfil
```http
GET /users/:id

Response: 200
{
  "id": 1,
  "name": "Juan Pérez",
  "email": "usuario@example.com",
  "phone": "1234567890",
  "address": "Calle 123",
  "role": "customer"
}
```

### Actualizar Perfil
```http
PUT /users/:id
Content-Type: application/json

{
  "name": "Juan Pérez",
  "phone": "1234567890",
  "address": "Calle 456"
}

Response: 200
{ "id": 1, "name": "Juan Pérez", ... }
```

---

## 📦 Productos

### Listar Productos
```http
GET /products?search=gafas&categoryId=1

Response: 200
[
  {
    "id": 1,
    "name": "Gafas de sol",
    "description": "Protección UV",
    "price": 150.00,
    "stock": 50,
    "brand": "Ray-Ban",
    "categoryId": 1,
    "image": "/assets/optica/1.jpg"
  },
  ...
]
```

### Obtener Producto
```http
GET /products/:id

Response: 200
{
  "id": 1,
  "name": "Gafas de sol",
  "description": "Protección UV",
  "price": 150.00,
  "stock": 50,
  "brand": "Ray-Ban",
  "categoryId": 1,
  "image": "/assets/optica/1.jpg"
}
```

### Crear Producto (Admin)
```http
POST /products
Content-Type: application/json

{
  "name": "Gafas de sol",
  "description": "Protección UV",
  "price": 150.00,
  "stock": 50,
  "brand": "Ray-Ban",
  "categoryId": 1,
  "image": "/assets/optica/1.jpg"
}

Response: 201
{ "id": 2, "name": "Gafas de sol", ... }
```

### Actualizar Producto (Admin)
```http
PUT /products/:id
Content-Type: application/json

{
  "price": 120.00,
  "stock": 45
}

Response: 200
{ "id": 1, "price": 120.00, "stock": 45, ... }
```

### Eliminar Producto (Admin)
```http
DELETE /products/:id

Response: 204
(sin contenido)
```

---

## 🏷️ Categorías

### Listar Categorías
```http
GET /categories

Response: 200
[
  {
    "id": 1,
    "name": "Monturas",
    "type": "frames",
    "description": "Monturas de gafas"
  },
  {
    "id": 2,
    "name": "Lentes",
    "type": "lenses",
    "description": "Lentes oftálmicos"
  },
  ...
]
```

### Obtener Categoría
```http
GET /categories/:id

Response: 200
{
  "id": 1,
  "name": "Monturas",
  "type": "frames",
  "description": "Monturas de gafas"
}
```

### Crear Categoría (Admin)
```http
POST /categories
Content-Type: application/json

{
  "name": "Accesorios",
  "type": "accessories",
  "description": "Accesorios ópticos"
}

Response: 201
{ "id": 3, "name": "Accesorios", ... }
```

---

## 🛒 Órdenes

### Listar mis Órdenes
```http
GET /orders?userId=1

Response: 200
[
  {
    "id": 1,
    "userId": 1,
    "type": "online",
    "total": 450.00,
    "status": "pending",
    "date": "2026-05-14T10:30:00Z",
    "shippingAddress": "Calle 123"
  },
  ...
]
```

### Crear Orden
```http
POST /orders
Content-Type: application/json

{
  "userId": 1,
  "type": "online",
  "total": 450.00,
  "status": "pending",
  "shippingAddress": "Calle 123"
}

Response: 201
{
  "id": 1,
  "userId": 1,
  "type": "online",
  "total": 450.00,
  "status": "pending",
  "date": "2026-05-14T10:30:00Z",
  "shippingAddress": "Calle 123"
}
```

### Obtener Orden
```http
GET /orders/:id

Response: 200
{
  "id": 1,
  "userId": 1,
  "type": "online",
  "total": 450.00,
  "status": "pending",
  "date": "2026-05-14T10:30:00Z",
  "shippingAddress": "Calle 123",
  "items": [
    {
      "productId": 1,
      "quantity": 3,
      "price": 150.00
    }
  ]
}
```

### Actualizar Orden (Admin)
```http
PUT /orders/:id
Content-Type: application/json

{
  "status": "shipped"
}

Response: 200
{ "id": 1, "status": "shipped", ... }
```

---

## 📋 Items de Orden

### Listar Items
```http
GET /order-items?orderId=1

Response: 200
[
  {
    "id": 1,
    "orderId": 1,
    "productId": 1,
    "quantity": 3,
    "price": 150.00
  },
  ...
]
```

### Crear Item
```http
POST /order-items
Content-Type: application/json

{
  "orderId": 1,
  "productId": 1,
  "quantity": 3,
  "price": 150.00
}

Response: 201
{
  "id": 1,
  "orderId": 1,
  "productId": 1,
  "quantity": 3,
  "price": 150.00
}
```

---

## Códigos de Estado

| Código | Significado |
|--------|------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado |
| 204 | No Content - Eliminado exitosamente |
| 400 | Bad Request - Datos inválidos |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error en servidor |

---

## Errores Comunes

### 400 Bad Request
```json
{
  "error": "Missing required field: email"
}
```

### 404 Not Found
```json
{
  "error": "Product not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Database error"
}
```

---

## Ejemplos en cURL

### Login
```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "usuario@example.com",
    "password": "password123"
  }'
```

### Listar Productos
```bash
curl "http://localhost:3000/api/products?search=gafas&categoryId=1"
```

### Crear Producto (Admin)
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Gafas",
    "price": 150,
    "stock": 50,
    "categoryId": 1,
    "description": "Descripción"
  }'
```

---

## Datos de Ejemplo para Pruebas

### Usuario de Prueba
```json
{
  "email": "usuario@example.com",
  "password": "password123",
  "name": "Usuario Prueba"
}
```

### Producto de Ejemplo
```json
{
  "name": "Gafas de sol Ray-Ban",
  "description": "Gafas con protección UV 100%",
  "price": 150.00,
  "stock": 50,
  "brand": "Ray-Ban",
  "categoryId": 1,
  "image": "/assets/optica/rayban-001.jpg"
}
```

### Categoría de Ejemplo
```json
{
  "name": "Monturas",
  "type": "frames",
  "description": "Monturas de gafas para lentes"
}
```

---

## 🔐 Autenticación (Futuro)

Cuando se implemente JWT, todos los endpoints excepto login/register requerirán:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📍 Endpoints Faltantes (TODO)

- [ ] `POST /payments` - Procesar pago
- [ ] `GET /reviews` - Listar reseñas
- [ ] `POST /reviews` - Crear reseña
- [ ] `GET /wishlists` - Mi wishlist
- [ ] `POST /wishlists` - Agregar a wishlist
- [ ] `GET /addresses` - Mis direcciones
- [ ] `POST /addresses` - Crear dirección
- [ ] `GET /notifications` - Mis notificaciones
- [ ] `GET /reports/sales` - Reportes de ventas (admin)

---

## 🧪 Probar Endpoints

### Opción 1: Swagger UI (Recomendado)
```
http://localhost:3000/api/docs
```

### Opción 2: cURL
```bash
curl http://localhost:3000/api/products
```

### Opción 3: Postman
Importar colección desde Swagger en Postman

### Opción 4: VS Code REST Client
Crear archivo `.http` con requests

---

**Última actualización:** Mayo 2026
