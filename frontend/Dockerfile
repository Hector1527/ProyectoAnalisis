# Usa la imagen oficial de Nginx
FROM nginx:alpine
# Copia los archivos compilados (dist) al servidor Nginx
COPY dist /usr/share/nginx/html
# Opcional: Personaliza la configuración de Nginx si es necesario
# COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80