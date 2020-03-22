# Symptom Tracker

This a mono repo implementing a web application made for collecting symptoms related to COVID-19.
This would help:

- tracking evolution of symptoms amongst confined populations
- anticipate trafic in healthcare facilities

Collected data is meant to be open and **non-identifying**.

This application consists of:

- a lightweight (~60KB) react, next.js server-side-rendered frontend (see `./pages`)
- a single lambda endpoint to store submissions sent by users (see `./api` and `./lib/db`)
- a Postgres instance where data will be stored (see config in `./.env` and `./docker-compose.yml`)

## Local deployment

### Install dependencies

```
yarn install
```

### Run front and lambda

```
now dev
```

In case you only want to run the frontend:

```
next dev
```

### Start local postgres instance

```
docker-compose up
```

## Deploy to prod

```
now --prod
```
