FROM node:18 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
RUN npm run build
CMD ["npm", "run", "dev"] 

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ssl/cert.pem /etc/ssl/certs/
COPY ssl/key.pem /etc/ssl/private/
EXPOSE 443
