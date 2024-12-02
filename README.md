# Power 4

## Description

Il s'agit d'un puissance 4 dévelopé en Next.js avec une IA basique ainsi qu'un mode multijoueur en ligne fonctionnant avec socket.io.

## Installation

```bash
yarn install
```

## Lancer le projet

Pour lancer le projet, il faut :

- Une base de données MariaDB (Docker windows non supporté)
- .env.local :

```env
AUTH_SECRET="bTcDFwbw75DHPNSInfxFPyn3PwkN+uqRhrh4ZYxDrPY=" # Added by `npx auth`. Read more: https://cli.authjs.dev

AUTH_DISCORD_ID=
AUTH_DISCORD_SECRET=
```

- .env :

```env
DATABASE_URL=mysql://wiibleyde:root@localhost:3306/puissance4
```

En mode production :

```bash
yarn build
yarn start
```

En mode développement :

```bash
yarn dev
```
