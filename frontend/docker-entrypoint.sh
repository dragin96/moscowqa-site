#!/bin/sh

# Создаем файл с переменными окружения во время запуска
echo "NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL" > .env.production
echo "NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL" >> .env.production

# Запускаем команду
exec "$@" 