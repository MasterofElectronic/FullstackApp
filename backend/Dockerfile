# backend/Dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

# Copia package.json e instala deps
COPY package*.json ./
RUN npm install --production

# Copia el resto del código y compila
COPY . .
RUN npm run build

# Expone puerto y arranca en modo producción
EXPOSE 4000
CMD ["node", "dist/main.js"]