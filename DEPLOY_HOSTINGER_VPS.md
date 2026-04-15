# Deploy on Hostinger VPS (Docker + Nginx + Cloudflare Full strict)

## 1) Copy project to your VPS

Use `git clone` on the server, or upload the project files with `scp`/SFTP.

## 2) Open required firewall ports

On the VPS:

```bash
ufw allow 80/tcp
ufw allow 443/tcp
ufw reload
ufw status
```

You should see both `80/tcp` and `443/tcp` allowed.

## 3) Issue TLS certificate (Let's Encrypt)

Install certbot:

```bash
apt update
apt install -y certbot
```

Stop your Docker web container before certificate issuance (standalone mode needs port 80):

```bash
docker compose -f docker-compose.prod.yml down
```

Issue certificate for both root and `www`:

```bash
certbot certonly --standalone -d ruirufactorymabati.com -d www.ruirufactorymabati.com
```

Certificates are created under:

`/etc/letsencrypt/live/ruirufactorymabati.com/`

## 4) Run production stack on the VPS (HTTPS enabled)

From your project directory on the VPS:

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

Your app will be available on both HTTP and HTTPS, with HTTP redirected to HTTPS.

## 5) Attach your domain in Hostinger DNS

Point both records to your VPS public IP:

- `A` record for `@`
- `A` record for `www`

## 6) Configure Cloudflare to handle HTTPS

In Cloudflare DNS:

1. Add `A` record for `@` pointing to your VPS IP
2. Add `A` record for `www` pointing to your VPS IP
3. Enable proxy status (orange cloud) for both records

In Cloudflare SSL/TLS settings:

1. Set encryption mode to `Full (strict)`
2. Enable `Always Use HTTPS`
3. Enable `Automatic HTTPS Rewrites`

## 7) Update deployment after code changes

```bash
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml up -d --build
```

## 8) Useful commands

```bash
docker compose -f docker-compose.prod.yml ps
docker compose -f docker-compose.prod.yml logs -f web
docker image prune -f
```

## 9) Verify end-to-end

From any machine:

```bash
curl -I https://ruirufactorymabati.com
```

Expected response includes successful HTTP status (200/301/304) and `server: cloudflare`.

## 10) Auto-renew certificates

Add a cron job:

```bash
crontab -e
```

Then add:

```bash
0 0 * * * certbot renew --quiet && docker compose -f /opt/Mabati/docker-compose.prod.yml restart
```
