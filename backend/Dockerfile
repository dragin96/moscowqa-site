# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Копируем файлы для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

# Создаем непривилегированного пользователя
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Устанавливаем только production зависимости
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production

# Копируем собранное приложение
COPY --from=builder /app/dist ./dist

# Создаем файл для хранения секретов
RUN mkdir -p /run/secrets

# Определяем точку монтирования для секретов
VOLUME /run/secrets

# Копируем скрипт для инициализации переменных окружения
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

# Меняем владельца файлов
RUN chown -R appuser:appgroup /app

# Переключаемся на непривилегированного пользователя
USER appuser

# Запускаем приложение через entrypoint скрипт
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["npm", "run", "start:prod"] 