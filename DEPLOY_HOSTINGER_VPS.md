# Deploy on Hostinger VPS (Docker + Nginx + Cloudflare)

## 1) Copy project to your VPS

Use `git clone` on the server, or upload the project files with `scp`/SFTP.

## 2) Run production stack on the VPS

From your project directory on the VPS:

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

Your app will be available on `http://YOUR_SERVER_IP`.

## 3) Attach your domain in Hostinger DNS

Point both records to your VPS public IP:

- `A` record for `@`
- `A` record for `www`

## 4) Configure Cloudflare to handle HTTPS

In Cloudflare DNS:

1. Add `A` record for `@` pointing to your VPS IP
2. Add `A` record for `www` pointing to your VPS IP
3. Enable proxy status (orange cloud) for both records

In Cloudflare SSL/TLS settings:

1. Set encryption mode to `Flexible` (if VPS serves only HTTP on port 80)
2. Enable `Always Use HTTPS`
3. Enable `Automatic HTTPS Rewrites`

## 5) Update deployment after code changes

```bash
docker compose -f docker-compose.prod.yml down
docker compose -f docker-compose.prod.yml up -d --build
```

## 6) Useful commands

```bash
docker compose -f docker-compose.prod.yml ps
docker compose -f docker-compose.prod.yml logs -f web
docker image prune -f
```
