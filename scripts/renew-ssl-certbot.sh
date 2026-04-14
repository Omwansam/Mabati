#!/usr/bin/env bash
set -euo pipefail

COMPOSE_FILE="docker-compose.prod.yml"

echo "Renewing certificates (if due)..."
docker compose -f "${COMPOSE_FILE}" run --rm certbot renew --webroot --webroot-path /var/www/certbot

echo "Reloading proxy..."
docker compose -f "${COMPOSE_FILE}" restart reverse-proxy

echo "Renew complete."
