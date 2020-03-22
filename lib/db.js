const Database = require("sqlite-async");
const pg = require("serverless-pg");

exports.query = async query => {
  if (process.env.NODE_ENV !== "production") {
    try {
      const db = await Database.open(process.env.SQLITE_DB_PATH);

      const results = await db.all(query);

      await db.close();
      return results;
    } catch (error) {
      console.log(error);
      return { error };
    }
  } else {
    const db = pg({
      config: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PWD
      }
    });

    try {
      const results = await db.query(query);
      await db.end();
      return results.rows;
    } catch (error) {
      console.log(error);
      return { error };
    }
  }
};
