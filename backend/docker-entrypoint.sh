#!/bin/sh

# Загружаем секреты в переменные окружения
if [ -d "/run/secrets" ]; then
    for secret in /run/secrets/*; do
        if [ -f "$secret" ]; then
            # Получаем имя секрета из имени файла
            secret_name=$(basename "$secret")
            # Загружаем значение секрета в переменную окружения
            export "$secret_name"="$(cat "$secret")"
        fi
    done
fi

# Запускаем команду, переданную в CMD
exec "$@" 