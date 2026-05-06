# Locale Redirect Rules

This folder contains server-side redirect rules for multilingual routing:

- canonical locale routes: `/en`, `/fr`, `/ar`
- non-localized routes redirect permanently to `/en/...`
- root `/` auto-redirects by `preferred_locale` cookie first, then browser language (`ar`, `fr`, fallback `en`)

## Files

- `nginx-locale.conf`: Nginx server block snippet
- `cloudflare-worker.js`: Cloudflare Worker logic

## Vercel

Vercel config is in repo root: `vercel.json`.

## Apache

Apache rules are in project root `.htaccess`.
