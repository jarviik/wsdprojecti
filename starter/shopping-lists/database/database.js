import { Pool } from "https://deno.land/x/postgres@v0.16.1/mod.ts";

const CONCURRENT_CONNECTIONS = 2;
const DATABASE_URL = Deno.env.get("DATABASE_URL");

if (!DATABASE_URL) {
    throw new Error("DATABASE_URL must be set in the environment.");
}

const connectionPool = new Pool(DATABASE_URL, CONCURRENT_CONNECTIONS);

const executeQuery = async (query, params) => {
  const response = {};
  let client;

  try {
    client = await connectionPool.connect();
    const result = await client.queryObject(query, params);
    if (result.rows) {
      response.rows = result.rows;
    }
  } catch (e) {
    console.error("Database error:", e);
    response.error = e;
  } finally {
    if (client) {
      try {
        await client.release();
      } catch (e) {
        console.error("Unable to release database connection:", e);
      }
    }
  }

  return response;
};

export { executeQuery }
