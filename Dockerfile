# Nginx static site for Cologic
FROM nginx:alpine

# Remove the default site
RUN rm -rf /usr/share/nginx/html/*

# Custom nginx config (clean URLs + caching + 404)
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy the static website (Dockerfile/.github/etc excluded via .dockerignore)
COPY . /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
