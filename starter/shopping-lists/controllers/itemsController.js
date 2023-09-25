import * as itemService from "../services/itemsService.js";
import { getIdFromUrl, redirectTo } from "../utils/utils.js";

const createItem = async (request) => {
    const url = new URL(request.url)
    const id = getIdFromUrl(url);
    const formData = await request.formData();
    const name = formData.get("name");
    await itemService.createItem(id, name);
    return redirectTo(`/lists/${id}`);
};

const updateItem = async (request) => {
    const url = new URL(request.url)
    const parts = url.pathname.split("/");
    let listId = parts[2];
    let itemId = parts[4];
    await itemService.updateItemById(itemId);
    return redirectTo(`/lists/${listId}`);
};


export { createItem, updateItem };