FROM node:lts-alpine as base

RUN mkdir -p /home/app

#--------------------------------------
FROM base AS deps

WORKDIR /home/app

COPY package.json .
COPY ./.yarn/sdks ./.yarn/sdks
COPY ./.yarn/releases ./.yarn/releases/
COPY ./.yarn/unplugged ./.yarn/unplugged/
COPY ./.yarnrc.yml .

#--------------------------------------
FROM base AS builder

WORKDIR /home/app

COPY . .
COPY --from=deps /home/app/.yarn ./.yarn/

#--------------------------------------
FROM base AS runner

WORKDIR /home/app

COPY --from=builder /home/app/public ./public/

#--------------------------------------
FROM runner AS app

WORKDIR /home/app

COPY --from=builder /home/app/.yarn/unplugged .yarn/unplugged/
COPY --from=builder /home/app/.yarn/sdks .yarn/sdks/
COPY --from=builder /home/app/.yarnrc.yml .
COPY --from=builder /home/app/.yarn/releases .yarn/releases/

RUN rm -rf ./.yarn/cache
RUN rm -Rf .git
RUN rm -Rf ./docs/*

RUN chown node:node /home/app
RUN chown -Rf node:node /home/app/docs || echo skipped

WORKDIR /home/app

USER node

EXPOSE 3000

CMD ["/bin/sh"]
