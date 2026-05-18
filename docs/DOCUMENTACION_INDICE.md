# 📖 Índice de Documentación - TechStore

Guía de navegación por toda la documentación del proyecto.

---

## 🎯 Comienza aquí

### Para nuevos desarrolladores
1. Leer [RESUMEN.md](./RESUMEN.md) - 5 minutos
2. Ver [README.md](./README.md) - 10 minutos
3. Revisar [ARQUITECTURA.md](./ARQUITECTURA.md) - 15 minutos
4. Ir a [GUIA_DESARROLLO.md](./GUIA_DESARROLLO.md) - según necesidad

### Para managers/product
- [RESUMEN.md](./RESUMEN.md) - Estado actual del proyecto
- [FALTA_IMPLEMENTAR.md](./FALTA_IMPLEMENTAR.md) - Roadmap y priorización

### Para QA/Testing
- [API_REFERENCIA.md](./API_REFERENCIA.md) - Endpoints a probar
- [GUIA_DESARROLLO.md](./GUIA_DESARROLLO.md) - Cómo correr localmente

---

## 📚 Documentos

### 1. **RESUMEN.md** 📝
**Objetivo**: Visión general rápida del proyecto

**Contenido**:
- ✅ Lo que está implementado
- ❌ Lo que falta
- 📊 Estadísticas
- 🔄 Flujos principales
- 🎯 Próximos pasos

**Cuándo leer**: Primera vez, reuniones, para dar contexto

---

### 2. **README.md** 🚀
**Objetivo**: Guía de inicio rápido

**Contenido**:
- Instrucciones de instalación
- Descripción de carpetas
- Endpoints principales
- Características técnicas
- Troubleshooting

**Cuándo leer**: Para setup inicial, compartir con stakeholders

---

### 3. **ARQUITECTURA.md** 🏗️
**Objetivo**: Comprensión profunda del diseño técnico

**Contenido**:
- Diagrama general
- Capas del backend (Router → Controller → Service → DB)
- Capas del frontend (UI → Context → API → Storage)
- Flujos de acciones usuario
- Estructura de archivos detallada
- Modelo relacional de BD
- Flujos principales

**Cuándo leer**: Entender cómo funciona todo, onboarding técnico

---

### 4. **FALTA_IMPLEMENTAR.md** 🚧
**Objetivo**: Roadmap y trabajo pendiente

**Contenido**:
- 🎯 Fase 1: MVP (crítico)
- 🎯 Fase 2: Monetización
- 🎯 Fase 3: Engagement
- 🎯 Fase 4: Escala
- Endpoints faltantes
- Tests pendientes
- Mejoras de infraestructura

**Cuándo leer**: Planning, priorización, para saber qué hacer next

---

### 5. **GUIA_DESARROLLO.md** 🔧
**Objetivo**: Cómo agregar nuevas features sin romper nada

**Contenido**:
- Setup inicial paso a paso
- Cómo agregar endpoint nuevo (ejemplo completo)
- Cómo agregar pantalla nueva (ejemplo completo)
- Flujo de cambios en Context
- Debugging tips
- Comandos útiles
- Checklist pre-commit

**Cuándo leer**: Antes de escribir código, cuando vas a agregar feature

---

### 6. **API_REFERENCIA.md** 📚
**Objetivo**: Documentación rápida de todos los endpoints

**Contenido**:
- Todas las rutas disponibles
- Ejemplos de request/response
- Códigos de estado
- Errores comunes
- Datos de ejemplo
- Ejemplos cURL
- Endpoints faltantes

**Cuándo leer**: Para probar API, documentación de endpoints, QA

---

### 7. **DOCUMENTACION_INDICE.md** 📖
**Objetivo**: Este archivo - navegación de documentación

**Contenido**:
- Índice de documentos
- Guía de qué leer según rol
- Flujos de documentación

**Cuándo leer**: Para saber qué documento leer

---

## 👥 Flujos por Rol

### 👨‍💻 Desarrollador Backend

```
RESUMEN (5 min)
    ↓
README (10 min)
    ↓
ARQUITECTURA - Backend section (15 min)
    ↓
GUIA_DESARROLLO - Backend section (20 min)
    ↓
API_REFERENCIA (como referencia)
    ↓
Empezar a codar
```

### 📱 Desarrollador Frontend

```
RESUMEN (5 min)
    ↓
README (10 min)
    ↓
ARQUITECTURA - Frontend section (15 min)
    ↓
GUIA_DESARROLLO - Frontend section (20 min)
    ↓
Empezar a codar
```

### 🧪 QA / Testing

```
RESUMEN (5 min)
    ↓
README - Setup (10 min)
    ↓
API_REFERENCIA (30 min)
    ↓
GUIA_DESARROLLO - Debugging (10 min)
    ↓
Empezar a testear
```

### 👔 Project Manager

```
RESUMEN - Lo implementado vs lo que falta (10 min)
    ↓
FALTA_IMPLEMENTAR - Fases y priorización (15 min)
    ↓
README - Visión general (5 min)
    ↓
Listo para planning
```

### 🏛️ Arquitecto / Lead Developer

```
ARQUITECTURA (30 min)
    ↓
FALTA_IMPLEMENTAR - Todo (20 min)
    ↓
GUIA_DESARROLLO (15 min)
    ↓
RESUMEN (5 min)
    ↓
Listo para decisiones arquitectónicas
```

---

## 🔍 Buscar por Tema

### Instalación / Setup
- [README.md - Inicio rápido](./README.md#-inicio-rápido)
- [GUIA_DESARROLLO.md - Setup inicial](./GUIA_DESARROLLO.md#-antes-de-comenzar)

### Estructura del Proyecto
- [README.md - Estructura](./README.md#-estructura-del-proyecto)
- [ARQUITECTURA.md - Estructura Backend](./ARQUITECTURA.md#3-estructura-de-archivos-backend)
- [ARQUITECTURA.md - Estructura Frontend](./ARQUITECTURA.md#3-estructura-de-archivos-móvil)

### Cómo agregar features
- [GUIA_DESARROLLO.md - Agregar endpoint](./GUIA_DESARROLLO.md#agregar-un-nuevo-endpoint)
- [GUIA_DESARROLLO.md - Agregar pantalla](./GUIA_DESARROLLO.md#agregar-una-nueva-pantalla)
- [GUIA_DESARROLLO.md - Cambios en Context](./GUIA_DESARROLLO.md#-flujo-de-cambios-en-context)

### Endpoints disponibles
- [API_REFERENCIA.md - Todos los endpoints](./API_REFERENCIA.md)
- [README.md - Endpoints principales](./README.md#-api-backend)

### Lo que falta
- [FALTA_IMPLEMENTAR.md - Completo](./FALTA_IMPLEMENTAR.md)
- [RESUMEN.md - Resumen rápido](./RESUMEN.md#❌-lo-que-falta-implementar)

### Base de Datos
- [ARQUITECTURA.md - Modelo relacional](./ARQUITECTURA.md#-base-de-datos)
- [ARQUITECTURA.md - Tablas](./ARQUITECTURA.md#tablas-8-total)

### Autenticación
- [README.md - Autenticación](./README.md#-autenticación)
- [ARQUITECTURA.md - Flujo de auth](./ARQUITECTURA.md#1-flujo-de-autenticación-login)

### Estado Global (React Context)
- [ARQUITECTURA.md - Context Deep Dive](./ARQUITECTURA.md#4-context-api-deep-dive)
- [README.md - Estado Global](./README.md#estado-global-context--asyncstorage)

### Debugging / Troubleshooting
- [GUIA_DESARROLLO.md - Debugging](./GUIA_DESARROLLO.md#-debugging)
- [README.md - Troubleshooting](./README.md#-troubleshooting)
- [GUIA_DESARROLLO.md - Problemas comunes](./GUIA_DESARROLLO.md#-problemas-comunes)

### Seguridad
- [ARQUITECTURA.md - Seguridad actual](./ARQUITECTURA.md#-seguridad-actual)
- [FALTA_IMPLEMENTAR.md - Seguridad](./FALTA_IMPLEMENTAR.md#-seguridad)

### Performance
- [ARQUITECTURA.md - Performance](./ARQUITECTURA.md#-performance)

### Testing
- [FALTA_IMPLEMENTAR.md - Testing](./FALTA_IMPLEMENTAR.md#-testing)

---

## 🎬 Escenarios Comunes

### Escenario 1: "Soy nuevo en el proyecto"
```
1. Leer RESUMEN.md
2. Leer README.md
3. Clonar y ejecutar (README.md - Inicio rápido)
4. Explorar en localhost:3000/api/docs
5. Leer ARQUITECTURA.md
6. Leer GUIA_DESARROLLO.md
→ Listo para primera tarea
```

### Escenario 2: "Quiero agregar un nuevo endpoint"
```
1. Leer GUIA_DESARROLLO.md - "Agregar nuevo endpoint"
2. Seguir el ejemplo paso a paso
3. Consultar API_REFERENCIA.md para ver patrón
4. Probar en Swagger
5. Seguir checklist pre-commit
→ Endpoint listo
```

### Escenario 3: "Quiero agregar una pantalla móvil"
```
1. Leer GUIA_DESARROLLO.md - "Agregar nueva pantalla"
2. Crear archivo .tsx
3. Importar en App.tsx
4. Actualizar tipos de navegación
5. Probar en Expo
→ Pantalla lista
```

### Escenario 4: "Tengo un error"
```
1. Leer GUIA_DESARROLLO.md - "Problemas comunes"
2. Si no está, leer GUIA_DESARROLLO.md - "Debugging"
3. Si sigue sin resolver, revisar RESUMEN.md - "Estado"
→ Problema resuelto
```

### Escenario 5: "Necesito documentar feature nueva"
```
1. Actualizar FALTA_IMPLEMENTAR.md si es pending
2. Actualizar RESUMEN.md - ✅ Lo implementado
3. Si es endpoint, agregar a API_REFERENCIA.md
4. Si es pantalla, detallar en RESUMEN.md
5. Crear/actualizar GUIA_DESARROLLO.md si es necesario
→ Documentación completa
```

---

## 📊 Relaciones entre Documentos

```
RESUMEN.md (Centro)
    ├─ README.md (Inicio)
    ├─ ARQUITECTURA.md (Profundo)
    ├─ FALTA_IMPLEMENTAR.md (Roadmap)
    ├─ GUIA_DESARROLLO.md (How-to)
    └─ API_REFERENCIA.md (Referencia)
```

---

## ✅ Checklist de Documentación Completa

- ✅ README.md - Guía general
- ✅ ARQUITECTURA.md - Diseño técnico
- ✅ FALTA_IMPLEMENTAR.md - Roadmap
- ✅ GUIA_DESARROLLO.md - How-to
- ✅ API_REFERENCIA.md - API docs
- ✅ RESUMEN.md - Estado actual
- ✅ DOCUMENTACION_INDICE.md - Este archivo

---

## 🔄 Actualización de Documentación

### Cuándo actualizar

- Cuando se agrega un endpoint → API_REFERENCIA.md
- Cuando se implementa feature → RESUMEN.md ✅
- Cuando se completa feature → FALTA_IMPLEMENTAR.md ❌
- Cuando se cambia arquitectura → ARQUITECTURA.md
- Cuando se descubre nuevo patrón → GUIA_DESARROLLO.md

### Cómo actualizar

1. Editar archivo .md correspondiente
2. Mantener formato consistente
3. Actualizar tabla de contenidos si es necesario
4. Incluir ejemplos si es feature nueva
5. Conservar histórico (no borrar, marcar como deprecated)

---

## 💾 Versión de Documentación

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 1.0.0 | 2026-05-14 | Documentación inicial completa |

---

## 🤝 Contribuir a la Documentación

- Mantener tono **humanizado** y **amigable**
- Usar **ejemplos reales**
- Incluir **diagramas** cuando sea complejo
- Actualizar **índices** cuando se agrega contenido
- Revisar **ortografía** y **gramática**
- Mantener **consistencia** de formato

---

## 📞 Preguntas Frecuentes

**P: ¿Por dónde empiezo?**
R: Lee RESUMEN.md (5 min) luego README.md (10 min)

**P: ¿Cómo agrego un endpoint?**
R: Ve a GUIA_DESARROLLO.md - "Agregar nuevo endpoint"

**P: ¿Cómo agrego una pantalla?**
R: Ve a GUIA_DESARROLLO.md - "Agregar nueva pantalla"

**P: ¿Dónde veo todos los endpoints?**
R: API_REFERENCIA.md o http://localhost:3000/api/docs

**P: ¿Qué debo hacer next?**
R: Ve a FALTA_IMPLEMENTAR.md - "Resumen Prioritizado"

**P: ¿Cómo funciona todo?**
R: Lee ARQUITECTURA.md completo

---

## 🎓 Glosario Rápido

| Término | Definición |
|---------|-----------|
| **Context** | Estado global de React (AppContext.tsx) |
| **AsyncStorage** | Persistencia local en dispositivo |
| **DTO** | Data Transfer Object - validación de datos |
| **Service** | Capa de lógica de negocio |
| **Controller** | Manejador de requests HTTP |
| **Router** | Definición de rutas API |
| **Middleware** | Función que procesa requests antes/después |
| **SQLite** | Base de datos local del servidor |
| **Swagger** | Documentación interactiva de API |
| **Expo** | Plataforma para desarrollar React Native |

---

**Última actualización:** Mayo 14, 2026

**Mantenedor**: Equipo de Desarrollo

**Estado**: ✅ Completo y actualizado
