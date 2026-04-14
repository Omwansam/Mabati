#!/usr/bin/env bash
set -euo pipefail

if [ "$#" -lt 2 ]; then
  echo "Usage: $0 <domain> <email>"
  echo "Example: $0 mabatiyetu.com admin@mabatiyetu.com"
  exit 1
fi

DOMAIN="$1"
EMAIL="$2"
COMPOSE_FILE="docker-compose.prod.yml"

echo "Configuring Nginx domain: ${DOMAIN}"
sed -i -E "s/server_name [^;]+;/server_name ${DOMAIN} www.${DOMAIN};/" nginx/proxy/http.conf nginx/proxy/https.conf
sed -i -E "s#/live/[^/]+/#/live/${DOMAIN}/#g" nginx/proxy/https.conf

echo "Starting app and HTTP proxy..."
docker compose -f "${COMPOSE_FILE}" up -d web reverse-proxy

echo "Requesting Let's Encrypt certificate..."
docker compose -f "${COMPOSE_FILE}" run --rm certbot certonly \
  --webroot \
  --webroot-path /var/www/certbot \
  --email "${EMAIL}" \
  --agree-tos \
  --no-eff-email \
  -d "${DOMAIN}" \
  -d "www.${DOMAIN}"

echo "Restarting proxy with HTTPS config..."
docker compose -f "${COMPOSE_FILE}" restart reverse-proxy

echo "SSL certificate is installed for ${DOMAIN}."
