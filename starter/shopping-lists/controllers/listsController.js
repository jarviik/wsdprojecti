import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import { getById, createList, getAllLists, updateById } from "../services/listService.js";
import { getIdFromUrl, redirectTo } from "../utils.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const addList = async (request) => {
    const formData = await request.formData();
    const name = formData.get("name");
    await createList(name);
    return redirectTo("/lists");
};

const viewLists = async () => {
    const data = { lists: await getAllLists() };
    return new Response(await renderFile("lists.eta", data), responseDetails);
};

const updateLists = async (request, url) => {
    const id = getIdFromUrl(url);
    await updateById(id);
    return redirectTo("/lists");
};

const viewList = async (request, url) => {
    const id = getIdFromUrl(url);
    const data = {
        list: await getById(id),
    };
    return new Response(await renderFile("list.eta", data), responseDetails);
};

export { addList, viewLists, updateLists, viewList };