import { executeQuery } from "../database/database.js";

const createList = async (name) => {
    await executeQuery("INSERT INTO shopping_lists (name) VALUES ($1);", [name]);
}

const getAllLists = async () => {
    const result = await executeQuery("SELECT * FROM shopping_lists where active ORDER BY name;");
    return result.rows;
}

const getById = async (id) => {
    const result = await executeQuery("SELECT * FROM shopping_lists WHERE id=$1;", [id]);
    return result.rows.length ? result.rows[0] : { id: 0, name: "List doesn't exist" };
}

const updateById = async (id) => {
    await executeQuery("UPDATE shopping_lists set active=FALSE WHERE id=$1;", [id]);
}

export { createList, getAllLists, updateById, getById };