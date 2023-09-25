import { sql } from "../database/database.js";

const createItem = async (shoppinglistid, name) => {
    await sql`INSERT INTO items (shoppinglistid, name) VALUES (${shoppinglistid}, ${name})`;
};

const getItemByListId = async (shoppinglistid) => {
    const res = await sql`SELECT * FROM items WHERE shoppinglistid = ${shoppinglistid} AND NOT collected ORDER BY name`;
    return res.rows || [];
}

const getCollectedItemByListId = async (listId) => {
    const res = await sql`SELECT * FROM items WHERE shoppinglistid = ${listId} AND collected ORDER BY name`;
    return res.rows || [];

}

const updateItemById = async (itemId) => {
    await sql`UPDATE items SET collected = true WHERE id = ${itemId}`;
}

const updateItemByListId = async (shoppinglistid) => {
    await sql`UPDATE items SET collected = TRUE WHERE shoppinglistid = ${shoppinglistid}`;
}

const getNum = async () => {
    const res = await sql`SELECT COUNT(*) FROM items`;
    return res.rows?.[0]?.count ?? 0;
}

export { getNum, createItem, getItemByListId, getCollectedItemByListId, updateItemById, updateItemByListId };