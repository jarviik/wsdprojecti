import * as itemService from "../services/itemsService.js";
import { redirectTo } from "../utils/utils.js";

const createItem = async (request, id) => {
    const formData = await request.formData();
    const name = formData.get("name");
    await itemService.createItem(name, id);
    return redirectTo(`/lists/${id}`);
};

const updateItem = async (request, shopping_list_id, item_id) => {
    await itemService.updateItem(item_id);
    return redirectTo(`/lists/${shopping_list_id}`);
};


export { createItem, updateItem };