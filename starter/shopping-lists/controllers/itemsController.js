import { createItem, updateItemById } from "../services/itemsService.js";
import { getIdFromUrl, redirectTo } from "../utils/utils.js";

const createItemController = async (request, url) => {
    const id = getIdFromUrl(url);
    const formData = await request.formData();
    const name = formData.get("name");
    await createItem(id, name);
    return redirectTo(`/lists/${id}`);
};

const updateItem = async (request, url) => {
    const listId = getIdFromUrl(url);
    const itemId = getIdFromUrl(url, 4);
    await updateItemById(itemId);
    return redirectTo(`/lists/${listId}`);
};

export { createItemController as createItem, updateItem };