FROM node:20-alpine AS base
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY src ./src
COPY scripts ./scripts
COPY .env.example ./

ENV NODE_ENV=production
EXPOSE 4000
CMD ["npm", "run", "start"]
