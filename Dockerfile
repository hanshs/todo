FROM node:14-alpine AS builder
WORKDIR /build
COPY . .
RUN npm install
RUN npm run build
FROM nginx:1.18.0-alpine
COPY --from=builder /build/public /usr/share/nginx/html
EXPOSE 5000
CMD ["/bin/sh", "-c", "sed -i 's/listen  .*/listen 5000;/g' /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
