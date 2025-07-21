# Estágio de build
FROM node:20-alpine AS build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Estágio de produção
FROM nginx:stable-alpine AS production-stage

# Copia os arquivos de build do estágio anterior para o diretório de serviço do NGINX
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copia a configuração personalizada do NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
