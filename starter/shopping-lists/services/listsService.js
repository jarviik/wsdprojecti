import { executeQuery } from "../database/database.js";

const createList = async (name) => {
    await executeQuery("INSERT INTO shopping_lists (name) VALUES ($name);", { name: name });
}


const getAllLists = async () => {
    const res = await executeQuery("SELECT id, name, active FROM shopping_lists WHERE active = TRUE ORDER BY id;");
    return res.rows;
}


const getList = async (id) => {
    const res = await executeQuery("SELECT id, name, active FROM shopping_lists WHERE id = $id;", { id: id });
    return res.rows[0];
}

const updateList = async (id) => {
    await executeQuery("UPDATE shopping_lists SET active = FALSE WHERE id = $id;", { id: id });
}


const getStatistics = async () => {
    const lists = await executeQuery("SELECT * FROM shopping_lists;");
    const items = await executeQuery("SELECT * FROM shopping_list_items;")
    const stats = {
        lists: lists.rows.length,
        items: items.rows.length,
    };
    return stats;
}

export { createList, getAllLists, updateList, getList, getStatistics };