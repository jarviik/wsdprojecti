import { sql } from "../database/database.js";

const createList = async (name) => {
    await sql`INSERT INTO shopping_lists (name) VALUES (${name})`;
}


const getAllLists = async () => {
    const res = await sql`SELECT * FROM shopping_lists where active ORDER by name`;
    return res.rows || [];
}


const getList = async (id) => {
    const res = await sql`SELECT * FROM shopping_lists WHERE id = ${id}`;
    return res.rows[0] || null;
}

const updateList = async (id) => {
    await sql`UPDATE shopping_lists SET active=FALSE WHERE id=${id};`;
}

const getLNum = async () => {
    const res = await sql`SELECT COUNT(id) FROM shopping_lists`;
    return (res.rows && res.rows[0]) ? res.rows[0].count : 0;
}

export { createList, getAllLists, updateList, getList, getLNum };