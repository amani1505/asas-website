# syntax=docker/dockerfile:1

# ASAS Group website: production image for the Next.js site.

FROM node:22-alpine AS base
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

# 1) Install dependencies (cached until package files change).
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# 2) Build the standalone server. Pages are prerendered here, so the public
#    site URL (canonical links, sitemap, share images) is fixed at build time.
FROM base AS builder
ARG NEXT_PUBLIC_SITE_URL=https://asas.co.tz
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 3) Run it as a non-root user.
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3011 HOSTNAME=0.0.0.0

COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node
EXPOSE 3011
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3011/en > /dev/null || exit 1
CMD ["node", "server.js"]
