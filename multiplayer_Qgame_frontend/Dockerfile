# Stage 1: Build Angular app
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ARG configuration=production
RUN npm run build -- --configuration=$configuration

# Stage 2: Serve Angular app with NGINX
FROM nginx:alpine

# Copy compiled Angular files to nginx web root
COPY --from=build /app/dist/multiplayer-qgame-frontend/browser /usr/share/nginx/html

# Optional: Copy your own nginx config
COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
