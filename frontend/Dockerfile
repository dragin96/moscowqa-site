# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Копируем файлы для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm i --force

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app

# Устанавливаем только production зависимости
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production

# Копируем собранное приложение
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Копируем скрипт для запуска
COPY docker-entrypoint.sh ./
RUN chmod +x ./docker-entrypoint.sh

# Запускаем приложение через entrypoint
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["npm", "start"] 