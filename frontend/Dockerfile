FROM node:20 as builder
WORKDIR /app

# Instala dependencias
COPY package*.json ./
RUN npm install
RUN npm install -g vite

# Copia el resto del código
COPY . .

# Expone y construye
EXPOSE 3000
RUN npm run build
CMD ["npm", "run", "dev"]

# Etapa de producción
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80