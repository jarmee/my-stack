FROM node:lts-alpine

ENV PORT=3333
EXPOSE ${PORT}

# Copy _only_ the package.json to improve caching.
COPY ./dist/apps/api/package.json ./

RUN npm install --production && npm install \
    # --- additional packages
    reflect-metadata \
    tslib \
    rxjs \
    @nestjs/platform-express \
    typeorm \
    pg \
    # --- eof additional packages
    && npm cache clean --force

COPY ./dist/apps/api .

CMD node ./main.js