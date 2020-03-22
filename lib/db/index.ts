// Taken from:
// https://github.com/glennreyes/now-typeorm-typegraphql-starter/blob/master/db/index.ts

// import 'reflect-metadata';
import { ConnectionOptions, getConnectionManager } from "typeorm";

const connectionOptions: ConnectionOptions = {
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  name: "covid",
  synchronize: true,
  // Needs to be .js, not sure why
  entities: ["./lib/db/entities/**/*.js"],
  migrations: ["./lib/db/migration/**/*.js"],
  subscribers: ["./lib/db/subscriber/**/*.js"]
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
