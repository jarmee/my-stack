FROM node:lts-alpine

COPY ./dist/apps/api .

ENV PORT=3333
EXPOSE ${PORT}
RUN npm install --production

# dependencies that nestjs needs
RUN npm install \
    reflect-metadata \
    tslib \
    rxjs \
    @nestjs/platform-express \
    typeorm \
    pg

CMD node ./main.js