ARG IMAGE=node:20-alpine
FROM ${IMAGE} AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --timeout=600000

COPY . .

# DEVELOPMENT image (for local dev, runs source)
FROM builder AS dev
CMD ["npm", "run", "start:dev"]

# PRODUCTION BUILD stage (builds production files)
FROM builder AS prod-build
RUN npm run build
RUN npm prune --production

# FINAL PROD IMAGE
FROM ${IMAGE} AS prod

WORKDIR /app

COPY --chown=node:node --from=prod-build /app/dist /app/dist
COPY --chown=node:node --from=prod-build /app/node_modules /app/node_modules

ENV NODE_ENV=production

EXPOSE 3000

ENTRYPOINT ["node", "dist/src/main.js"]

USER node



# COPY --chown=node:node --from=prod-build /app/.env /app/.env
