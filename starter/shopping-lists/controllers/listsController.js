import { renderFile } from "../deps.js";
import * as listService from "../services/listsService.js";
import * as itemService from "../services/itemsService.js";
import { redirectTo } from "../utils/utils.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const createList = async (request) => {
    const formData = await request.formData();
    const name = formData.get("name");
    await listService.createList(name);
    return redirectTo("/lists");
};

const viewLists = async (request) => {
    const data = { lists: await listService.getAllLists() };
    return new Response(await renderFile("lists.eta", data), responseDetails);
};


const updateLists = async (request, id) => {
    await listService.updateList(id);
    return redirectTo("/lists");
};

const viewList = async (request, id) => {
    const data = {
        list: await listService.getList(id),
        items: await itemService.getAllItems(id),
        list_id: `/lists/${id}/items`
    };
    return new Response(await renderFile("list.eta", data), responseDetails);
};

const getStatistics = async (request) => {
    const data = {
        stats: await listService.getStatistics(),
    };
    return new Response(await renderFile("index.eta", data), responseDetails);
}

export { createList, viewLists, updateLists, viewList, getStatistics };