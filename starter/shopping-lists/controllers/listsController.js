import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as listService from "../services/listsService.js";
import * as itemService from "../services/itemsService.js";
import { getIdFromUrl, redirectTo } from "../utils/utils.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const addList = async (request) => {
    const formData = await request.formData();
    const name = formData.get("name");
    await listService.createList(name);
    return redirectTo("/lists");
};

const viewLists = async () => {
    const data = { lists: await listService.getAllLists() };
    return new Response(await renderFile("lists.eta", data), responseDetails);
};


const updateLists = async (request) => {
    const url = new URL(request.url);
    const id = getIdFromUrl(url);
    await listService.updateList(id);
    return redirectTo("/lists");
};

const viewList = async (request) => {
    const url = new URL(request.url);
    const id = getIdFromUrl(url);
    const data = {
        list: await listService.getList(id),
        items: await itemService.getItemByListId(id),
        items_collected: await itemService.getCollectedItemByListId(id)
    };
    return new Response(await renderFile("list.eta", data), responseDetails);
};

export { addList, viewLists, updateLists, viewList };