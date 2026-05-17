# Tahap 1: Build aplikasi React dengan Vite
FROM node:20-alpine as build-stage

# Atur direktori kerja
WORKDIR /app

# Salin file package.json dan package-lock.json dari dalam folder app_build
COPY app_build/package*.json ./

# Instal dependensi
RUN npm ci

# Salin seluruh isi folder app_build ke dalam direktori kerja (/app)
COPY app_build/ .

# Jalankan build process (menghasilkan folder dist/)
RUN npm run build

# Tahap 2: Sajikan aplikasi menggunakan Nginx
FROM nginx:alpine as production-stage

# Hapus konfigurasi default nginx
RUN rm /etc/nginx/conf.d/default.conf

# Salin konfigurasi nginx kustom kita dari root
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Salin hasil build dari tahap 1 ke direktori html Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 8080 (standar untuk Google Cloud Run)
EXPOSE 8080

# Jalankan Nginx
CMD ["nginx", "-g", "daemon off;"]
