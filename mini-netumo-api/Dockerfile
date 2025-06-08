# Development stage
FROM node:20-alpine AS development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
USER node

# Build stage
FROM node:20-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
COPY --from=development /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm run build

# --- ADD THESE DEBUGGING LINES HERE ---
RUN ls -la /usr/src/app/dist/ # List contents of the 'dist' directory after build
RUN test -f /usr/src/app/dist/main.js && echo "main.js found in build stage" || echo "main.js NOT found in build stage"
# --- END DEBUGGING LINES ---

ENV NODE_ENV production
RUN npm ci --only=production && npm cache clean --force
USER node

# Production stage
FROM node:20-alpine AS production
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
CMD ["node", "dist/main.js"]