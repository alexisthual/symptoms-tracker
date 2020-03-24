// Taken from:
// https://github.com/glennreyes/now-typeorm-typegraphql-starter/blob/master/db/index.ts

import "reflect-metadata";
import { ConnectionOptions, getConnectionManager } from "typeorm";

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

const connectionOptions: ConnectionOptions = {
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
  entities: ["./lib/db/entities/**/*.js"],
  migrations: ["./lib/db/migrations/**/*.js"],
  subscribers: ["./lib/db/subscribers/**/*.js"],
  cli: {
    migrationsDir: "./lib/db/migrations"
  }
};

// Create a connection manager instance
const connectionManager = getConnectionManager();

export const connect = async () => {
  const connection = connectionManager.has(connectionOptions.name!)
    ? await connectionManager.get(connectionOptions.name)
    : await connectionManager.create(connectionOptions);

  if (!connection.isConnected) {
    await connection.connect();
  }

  return connection;
};
