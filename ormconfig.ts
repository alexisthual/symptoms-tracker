// Should stay in sync with lib/db/index.ts

const sslOptions =
  process.env.NODE_ENV === "production" ||
  (process.env.NODE_ENV as string) === "stage"
    ? {
        ssl: {
          rejectUnauthorized: false,
          ca: process.env.POSTGRES_SSL_CERT
        }
      }
    : {};

module.exports = {
  name: "default",
  ...sslOptions,
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  // Needs to be .js
  entities: ["build/db/entities/**/*.js"],
  migrations: ["build/db/migrations/**/*.js"],
  subscribers: ["build/db/subscribers/**/*.js"],
  cli: {
    entitiesDir: "lib/db/entities",
    migrationsDir: "lib/db/migrations",
    subscribersDir: "lib/db/subscribers"
  }
};
