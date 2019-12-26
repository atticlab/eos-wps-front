FROM node:dubnium as build

ENV HOME "/app"
ENV NODE_ENV "production"

WORKDIR ${HOME}
COPY . /${HOME}
RUN npm i
RUN npm run build


FROM nginx:alpine
RUN ls -lah /
COPY --from=build /app/dist/ /usr/share/nginx/html
COPY --from=build /app/docker/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
