# Deploy on the Hostinger VPS

`ruirufactorymabati.com` is served by this project from `/srv/mabati/Mabati` on
the VPS (`2.24.114.80`).

## Architecture — read this first

This site does **not** own ports 80/443. The VPS is shared, and a single edge
proxy container (`fibi-proxy-1`, from the FIBI stack in `/opt/fibi/FIBI`) binds
them and fronts every site on the host:

| Site | Tenant directory | Vhosts loaded from |
| --- | --- | --- |
| fibicommunity.org | `/opt/fibi/FIBI` | its own `deploy/nginx.conf` |
| draftbitlabs.tech | `/srv/draftbit` | `/srv/draftbit/deploy/vhosts` |
| visionmentors.org | `/srv/dan` | `/srv/dan/deploy/vhosts` |
| **ruirufactorymabati.com** | **`/srv/mabati/Mabati`** | **`deploy/vhosts` (this repo)** |

So:

- **TLS terminates at the edge proxy**, not in this project's container.
  `nginx/default.conf` here is a plain HTTP origin on port 80 with no
  certificate paths — see the comment at the top of that file.
- **`docker-compose.prod.yml` publishes no ports.** The container joins the
  proxy's `fibi_internal` network and is reached at the alias `mabati-web`.
  Publishing 80/443 here would simply fail to bind.
- **Routing for this domain lives in `deploy/vhosts/`** in this repo, bind
  mounted read-only into the proxy as `/etc/nginx/conf.d/vhosts-mabati`.

Traffic path:

```
browser -> Cloudflare (proxied, orange cloud)
        -> VPS :443  fibi-proxy-1   (TLS, /etc/letsencrypt/live/mabati)
        -> mabati-web:80            (this container, static SPA)
```

## Routine redeploy after a code change

This is the whole job for a normal deploy — nothing proxy-side changes:

```bash
ssh fibidev@2.24.114.80
cd /srv/mabati/Mabati
git pull
docker compose -f docker-compose.prod.yml up -d --build
```

Check it came up healthy, then verify from outside:

```bash
docker compose -f docker-compose.prod.yml ps
curl -sI https://ruirufactorymabati.com | head -3
```

`docker image prune -f` cleans up superseded build layers.

## Certificates

Issued and renewed by the FIBI stack's certbot container — **nothing is pasted
by hand.** The lineage is `mabati`, not the domain name:

```
/etc/letsencrypt/live/mabati/   (on the fibi_letsencrypt_certs volume)
```

`/etc/letsencrypt/live/ruirufactorymabati.com/` is a *different*, older thing:
the hand-published Cloudflare Origin pair from the previous tenant on this
domain (infora billing). It is deliberately left in place and unused.

Renewal is automatic: `fibi-certbot-1` wakes every 12h, renews inside the 30-day
window over the ACME webroot, and the proxy reloads on its own 6h timer. The
port-80 block in `deploy/vhosts/10-mabati-http.conf` is what answers the ACME
challenge, which is why it must never redirect `/.well-known/acme-challenge/`.

Verify renewal still works without touching anything live:

```bash
docker run --rm \
  -v fibi_letsencrypt_certs:/etc/letsencrypt \
  -v fibi_certbot_webroot:/var/www/certbot \
  certbot/certbot renew --webroot -w /var/www/certbot --dry-run
```

Re-issuing from scratch, if it ever comes to that:

```bash
docker run --rm \
  -v fibi_letsencrypt_certs:/etc/letsencrypt \
  -v fibi_certbot_webroot:/var/www/certbot \
  certbot/certbot certonly --webroot -w /var/www/certbot \
  --cert-name mabati \
  -d ruirufactorymabati.com -d www.ruirufactorymabati.com \
  --key-type ecdsa --non-interactive --agree-tos
```

## Changing proxy routing

Edit `deploy/vhosts/*.conf`, then **validate before reloading** — this proxy
fronts three other live sites and nginx refuses to start on a bad config:

```bash
docker exec fibi-proxy-1 nginx -t && docker exec fibi-proxy-1 nginx -s reload
```

A reload is enough for vhost edits. The mount itself is declared in
`/opt/fibi/FIBI/docker-compose.yml` and the `include` line in
`/opt/fibi/FIBI/deploy/nginx.conf`; changing *those* needs
`cd /opt/fibi/FIBI && docker compose up -d --no-deps proxy`, which briefly drops
every site on the host.

## Cloudflare

Both records are proxied (orange cloud) and point at `2.24.114.80`:

- `A` `@` -> 2.24.114.80
- `A` `www` -> 2.24.114.80

SSL/TLS mode is `Full (strict)`, which the Let's Encrypt origin certificate
satisfies. `www` is 301'd to the apex by the proxy, so the site has one origin.

Because Cloudflare proxies the domain, the origin sees Cloudflare's IPs; the
FIBI proxy runs with `CLOUDFLARE=true` so `CF-Connecting-IP` is trusted and logs
and rate limits see real client addresses.

## Previous tenant on this domain

`ruirufactorymabati.com` used to serve the infora / Lumen billing stack. It was
unhooked from the edge proxy on 2026-09-10 by moving its vhosts to
`/srv/dan/deploy/vhosts-disabled/` (outside the proxy's include glob). Nothing
in `/srv/infora-billing` was modified and its containers still run — only the
edge routing was removed. See the README in that directory to restore it on a
subdomain.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| 502 from the edge | `docker ps --filter name=mabati_web` — is it healthy? |
| 404 on a deep link | SPA fallback in `nginx/default.conf` (`try_files ... /index.html`) |
| Stale assets after deploy | `index.html` is `no-cache`; purge the Cloudflare cache |
| Cert warnings | `docker run --rm -v fibi_letsencrypt_certs:/le:ro alpine ls -la /le/live/mabati/` |

Useful:

```bash
docker compose -f docker-compose.prod.yml logs -f web   # this site
docker logs --tail 50 fibi-proxy-1                      # the edge proxy
docker exec fibi-proxy-1 wget -qO- http://mabati-web/healthz
```
