FROM node:current-alpine3.12
WORKDIR /app
COPY . .
RUN yarn
CMD ["yarn", "start"]
