FROM node:20 as builder
WORKDIR /app

# Copia solo package.json y package-lock.json para cachear instalación
COPY package*.json ./

# Instala dependencias (vite queda como devDependency)
RUN npm install

# Copia todo el código
COPY . .

# Ejecuta build de vite (produce /dist)
RUN npm run build

# Etapa producción nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
