import { executeQuery } from "../database/database.js";

const createItem = async (shopping_list_id, name) => {
    await executeQuery("INSERT INTO shopping_list_items (shopping_list_id, name) VALUES ($1, $2);", [shopping_list_id, name]);
}

const getItemByListId = async (shopping_list_id) => {
    const result = await executeQuery("SELECT * FROM shopping_list_items WHERE shopping_list_id=$1 AND NOT collected ORDER BY name;", [shopping_list_id]);
    return result.rows;
}

const getCollectedItemByListId = async (shopping_list_id) => {
    const result = await executeQuery("SELECT * FROM shopping_list_items WHERE shopping_list_id=$1 AND collected ORDER BY name;", [shopping_list_id]);
    return result.rows;
}

const updateItemById = async (item_id) => {
    await executeQuery("UPDATE shopping_list_items set collected=TRUE WHERE id=$1;", [item_id]);
}

export { createItem, getItemByListId, getCollectedItemByListId, updateItemById };