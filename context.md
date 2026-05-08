# context.md — Airbnb Clone

## Descripción de las páginas

### 1. Página de inicio (`/`)
Muestra una cuadrícula de tarjetas de alojamiento disponibles. El usuario puede buscar por texto (título o ubicación) en tiempo real usando la barra de búsqueda de la Navbar, y filtrar por categoría (Todos, Playa, Mansiones, Tendencias, Montaña, Ciudad, Rural) a través de una fila de filtros horizontal debajo de la navbar. Los datos se simulan cargando con un `useEffect` + `setTimeout` de 1 segundo, mostrando un spinner mientras tanto.

### 2. Página de catálogo (`/catalog`)
Muestra todos los alojamientos disponibles con un encabezado que indica el número de resultados y un control de ordenación (Ascendente/Descendente por precio). A la derecha en escritorio (o debajo en móvil) aparece un placeholder de mapa. Los datos también se cargan con `useEffect` + `setTimeout`.

### 3. Página de detalle de habitación (`/rooms/[id]`)
Muestra la información completa de un alojamiento: galería de fotos con navegación Anterior/Siguiente, cabecera con título, valoración, ubicación y número de reseñas, información del anfitrión (avatar con inicial, nombre, años como anfitrión), sección de amenities en cuadrícula de pares icono + etiqueta, tarjeta de reserva con contador de huéspedes (min 1, max configurable por alojamiento) y precio. Breadcrumb de navegación y botón de volver al catálogo.

---

## Componentes principales

### Navbar (`/components/Navbar.tsx`)
- **Props**: `searchValue`, `onSearchChange`, `showSearch`
- **Función**: Barra de navegación superior con logo de Airbnb, campo de búsqueda (cuando `showSearch=true`) y menú de usuario (botón con icono hamburguesa + avatar). Sticky en la parte superior.

### CategoryFilter (`/components/CategoryFilter.tsx`)
- **Props**: `activeCategory`, `onCategoryChange`
- **Función**: Fila horizontal scrollable de categorías (icono + etiqueta). Resalta visualmente la categoría activa con un borde inferior. Sticky bajo la Navbar.

### ListingCard (`/components/ListingCard.tsx`)
- **Props**: `listing: Listing`
- **Función**: Tarjeta de alojamiento con placeholder de foto (gradiente de color), botón de favorito, badge de categoría, título, valoración con estrellas, ubicación, número de reseñas y precio por noche. Envuelve en `<Link>` hacia `/rooms/[id]`.

### PhotoGallery (`/components/PhotoGallery.tsx`)
- **Props**: `listingId`, `title`
- **Función**: Galería de 3 fotos placeholder con gradientes de color. Botones Anterior/Siguiente, puntos de navegación y contador de fotos. Usa `useState` para el índice actual.

### BookingCard (`/components/BookingCard.tsx`)
- **Props**: `price`, `rating`, `reviewCount`, `maxGuests`
- **Función**: Tarjeta de reserva con precio por noche, valoración, contador de huéspedes (± con límites mín/máx), desglose de precio, tarifa de servicio (14%), total y botón CTA. Usa `useState` para el número de huéspedes. Sticky en desktop.

### MapPlaceholder (`/components/MapPlaceholder.tsx`)
- **Props**: ninguno
- **Función**: Placeholder estilizado con borde discontinuo, icono de mapa y texto "Mapa".

### LoadingSpinner (`/components/LoadingSpinner.tsx`)
- **Props**: ninguno
- **Función**: Indicador de carga centrado con spinner animado y texto.

---

## Usuario objetivo

Usuario viajero de entre 25 y 45 años que quiere buscar y comparar alojamientos vacacionales de forma rápida e intuitiva desde el móvil o el escritorio. Valora ver opciones de alojamiento con claridad (precio, valoración, fotos), poder filtrar por tipo de destino y acceder rápidamente al detalle para reservar.

---

## Flujo de visión a especificación

Las capturas de pantalla de referencia utilizadas (viewport móvil 375px de Airbnb.com) mostraron:
- **Home**: Navbar con logo + búsqueda + menú de usuario, fila de categorías con iconos, cuadrícula de 1 columna en móvil de tarjetas con foto, título, precio y rating.
- **Catalog**: Cabecera con conteo + ordenación, grid de tarjetas + mapa a la derecha en desktop.
- **Room detail**: Galería de fotos con controles, título + rating + ubicación, info del anfitrión, amenities en grid, tarjeta de reserva flotante.

---

## Estructura de carpetas

```
/app
  page.tsx           → Home (/)
  layout.tsx         → Layout global
  globals.css        → Estilos globales
  /catalog
    page.tsx         → Catálogo (/catalog)
  /rooms/[id]
    page.tsx         → Detalle (/rooms/[id])

/components
  Navbar.tsx
  CategoryFilter.tsx
  ListingCard.tsx
  PhotoGallery.tsx
  BookingCard.tsx
  MapPlaceholder.tsx
  LoadingSpinner.tsx
  HeroTitle.tsx      → (original, no usado en la app final)

/types
  index.ts           → Interfaces TypeScript (Listing, Amenity, Host, Category, SortOrder)
  data.ts            → Datos mock de 8 alojamientos
```
