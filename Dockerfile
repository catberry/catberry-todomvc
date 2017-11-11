FROM node:alpine
MAINTAINER Denis Rechkunov <denis.rechkunov@gmail.com>

ENV APP_NAME catberry-todomvc
ENV APP_DEST ~/apps/${APP_NAME}
ENV NODE_ENV production

RUN mkdir -p ${APP_DEST}
COPY . ${APP_DEST}/
WORKDIR ${APP_DEST}
CMD npm run start
