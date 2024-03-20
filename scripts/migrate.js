const postgres = require("postgres");
const { drizzle } = require("drizzle-orm/postgres-js");
const { migrate } = require("drizzle-orm/postgres-js/migrator");
require("dotenv").config();

const client = postgres(process.env.DATABASE_URL, { max: 1 });

const mg = async () => {
  await migrate(drizzle(client, { logger: true }), {
    migrationsFolder: "drizzle",
  });
  await client.end();
};

mg();
