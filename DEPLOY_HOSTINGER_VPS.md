# Deploy on Hostinger VPS (Docker + Nginx + Certbot)

## 1) Copy project to your VPS

Use `git clone` on the server, or upload the project files with `scp`/SFTP.

## 2) Run production stack (HTTP first)

From your project directory on the VPS:

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

Your app will be available on `http://YOUR_SERVER_IP`.

## 3) Attach your domain in Hostinger DNS

Point both records to your VPS public IP:

- `A` record for `@`
- `A` record for `www`

## 4) Generate HTTPS certificates with Certbot

On the VPS, run:

```bash
./scripts/setup-ssl-certbot.sh yourdomain.com your-email@example.com
```

This script:

1. Configures `nginx/proxy/http.conf` and `nginx/proxy/https.conf` with your domain
2. Starts app + HTTP reverse proxy
3. Requests Let's Encrypt certificates
4. Restarts proxy in HTTPS mode

After it completes, your site is served on `https://yourdomain.com`.

## 5) Update deployment after code changes

```bash
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml up -d --build
```

## 6) Renew certificates

Run manual renewal:

```bash
./scripts/renew-ssl-certbot.sh
```

For automation, add a cron job on the VPS:

```bash
0 3 * * * cd /path/to/mabati-yetu && ./scripts/renew-ssl-certbot.sh >> /var/log/mabati-certbot-renew.log 2>&1
```

## 7) Useful commands

```bash
docker compose -f docker-compose.prod.yml ps
docker compose -f docker-compose.prod.yml logs -f reverse-proxy
docker compose -f docker-compose.prod.yml logs -f web
docker image prune -f
```
