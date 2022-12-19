FROM nginx:mainline-alpine

COPY ./config/infra/client/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist/apps/client /usr/share/nginx/html

EXPOSE 80
