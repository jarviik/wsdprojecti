import { executeQuery } from "../database/database.js";

const createItem = async (name, id) => {
    await executeQuery("INSERT INTO shopping_list_items (name, shopping_list_id) VALUES ($name, $shopping_list_id);", { name: name, shopping_list_id : id });
}

const getAllItems = async (id) => {
    const res = await executeQuery("SELECT * FROM shopping_list_items WHERE shopping_list_id = $shopping_list_id ORDER BY collected ASC, name ASC;", {shopping_list_id: id});
    return res.rows;
}

const updateItem = async (id) => {
    await executeQuery("UPDATE shopping_list_items SET collected = TRUE WHERE id = $id;", { id: id });
}


export { createItem, getAllItems, updateItem };