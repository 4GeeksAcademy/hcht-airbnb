Estructura recomendada
1. Descripción del proyecto
Estoy construyendo un clon del frontend de Airbnb con Next.js + React.
2. El usuario y su objetivo
Un viajero que busca alojamiento vacacional, filtra resultados y consulta el detalle de una propiedad antes de reservar.
3. Las tres páginas y qué contiene cada una
Home — buscador principal, categorías destacadas, listado de propiedades populares.
Catálogo / Search Results — grid de tarjetas de propiedades, filtros, mapa opcional.
Detalle de habitación — galería de fotos, descripción, precio, reseñas, botón de reserva.

4. Componentes principales
<Navbar>, <SearchBar>, <PropertyCard>, <FilterBar>, <Gallery>, <ReviewList>, etc.
5. Decisiones técnicas
Framework: Next.js con React
Mobile-first (375px → 768px+)
Navegación sin recarga (Next.js <Link>)
Una responsabilidad por componente