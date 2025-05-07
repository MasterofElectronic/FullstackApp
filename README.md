# Event Finder

**Descripción**  
Aplicación full-stack para buscar y registrar eventos cercanos, con geolocalización y ficha de evento rica.

## Tecnologías
- **Frontend**: Next.js + React + TailwindCSS  
- **Backend**: Nest.js + TypeORM + Mongoose  
- **Bases de datos**: PostgreSQL + PostGIS, MongoDB  

## Cómo arrancar
1. Copia `.env.postgres` y `.env.mongo` a la raíz.  
2. Copia `/backend/.env` y `/frontend/.env.local`.  
3. `docker-compose up -d --build`  
4. Visitar `http://localhost:3000` y `http://localhost:4000`.

## Branches
- `main`: versión estable, lista para release  
- `develop`: integración diaria