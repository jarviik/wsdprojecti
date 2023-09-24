import { Pool } from "https://deno.land/x/postgres@v0.16.1/mod.ts";

const CONCURRENT_CONNECTIONS = 2;

const DSN = Deno.env.get("DATABASE_URL");

if (!DSN) {
    throw new Error("DATABASE_URL must be set in the environment.");
}

const connectionPool = new Pool(DSN, CONCURRENT_CONNECTIONS);

const executeQuery = async (query, params = []) => {
    let client;

    try {
        client = await connectionPool.connect();
        const result = await client.queryObject(query, ...params);
        return result.rows;
    } catch (e) {
        console.error("Failed to execute query:", e);
        throw e;
    } finally {
        if (client) {
            try {
                await client.release();
            } catch (e) {
                console.error("Failed to release the database connection:", e);
            }
        }
    }
};

export { executeQuery };