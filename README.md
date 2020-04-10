# Symptom Tracker

This a mono repo implementing a web application made for collecting symptoms related to COVID-19.
This would help:

- tracking evolution of symptoms amongst confined populations
- anticipate trafic in healthcare facilities

Collected data is meant to be open and **non-identifying**.

This application consists of:

- a lightweight (~80KB) react, next.js server-side-rendered frontend (see `./pages`)
- a single lambda endpoint to store submissions sent by users (see `./api` and `./lib/db`)
- a Postgres instance where data will be stored (see config in `./.env` and `./docker-compose.yml`)

## Local deployment

### Install dependencies

```
yarn install
```

### Run client and lambda

```
now dev
```

In case you only want to run the client:

```
next dev
```

### Start local postgres instance

```
docker-compose up
```

When instanciating this db for the first time, you should create all tables etc using

```
yarn run typeorm schema:sync
```

### Create or generate migrations

Requirements:

- You should have `ts-node` installed globally (`yarn global add ts-node`).

Commands:

```
typeorm migration:create -n migrationName
typeorm migration:generate -n migrationName
```

### Run migrations

Requirements:

- Typeorm only handles `.js` migrations, so one needs to transpile them first:

```
tsc lib/db/**/*.ts --outDir build
```

Commands:

```
yarn run typeorm migration:run
```

## Deploy to prod

### Deploy client and lambda

```
now --prod
```

### Run migrations to prod database

Requirements:

- you should have `dotenv-cli` installed globally (`yarn global add dotenv-cli`)
- you should have a `./.env.prod` file with necessary variables setup (all necessary variables are listed in `./.env`)

Commands:

```
dotenv -e .env.prod yarn run typeorm migration:run
```
