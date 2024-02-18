# ビルドステージ
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

ENV NODE_ENV=production
ENV SUPABASE_URL=
ENV SUPABASE_ANON_KEY=

EXPOSE 3000

CMD [ "npm", "start" ]