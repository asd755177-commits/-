# Production deployment runbook

## Architecture
Internet -> static public IP + DNS -> Nginx/HTTPS -> 127.0.0.1:3000 -> Next.js/Vinext app.

A fixed IP alone is not a suitable HTTPS identity: TLS certificates are normally issued to a DNS name. Use a domain (or subdomain) whose A record points to the server's static public IPv4 address. HTTP can be redirected to HTTPS. Do not expose port 3000 publicly.

## Server prerequisites
- Ubuntu 24.04 LTS (recommended)
- Static public IPv4
- DNS A record for the production hostname
- Node.js 22 / Docker / Docker Compose
- Nginx
- UFW: allow 22, 80, 443 only

## First deployment
1. Create a dedicated non-root deploy user.
2. Clone this repository to `/opt/topup-site`.
3. Create `/opt/topup-site/.env` from `.env.example`; put real payment secrets there. Never commit them.
4. `docker compose up -d --build`
5. Configure Nginx with `deploy/nginx.conf`, replacing `YOUR_DOMAIN.example`.
6. Point DNS A record to the server static IPv4.
7. Issue TLS with Let's Encrypt/Certbot and redirect HTTP to HTTPS.
8. Test homepage, both payment tabs, all 20 package buttons, and payment-provider pages.

## Update
`git pull --ff-only && docker compose up -d --build`

## Rollback
1. `git log --oneline -10`
2. `git checkout <known-good-commit>` (or deploy the tagged release)
3. `docker compose up -d --build`

Keep `.env` outside Git and back up it separately through the secret manager/password manager.

## Payment behavior
The current UI contains 11 credit-card and 9 convenience-store package links (20 total). The links are external payment-page redirects. The current frontend does NOT implement verified payment callbacks/webhooks, order persistence, idempotency, or automatic point crediting. Do not represent a payment as successful based only on a browser redirect.

To enable automatic point crediting, implement the payment provider server-to-server callback, signature verification, order table, idempotency/duplicate protection, and point-credit transaction. Store merchant credentials only as server environment variables/secrets.

## Access control
- GitHub: invite each engineer by their own GitHub account with the minimum repository permission needed (Write/Maintain as appropriate).
- Server: create an individual Linux account and SSH key per engineer; grant `sudo` only when required. Never share root passwords or SSH keys.
- Payment provider: create individual operator accounts if supported; never share merchant/API credentials.
