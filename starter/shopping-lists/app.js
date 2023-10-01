import { serve, configure } from "./deps.js";
import * as ListController from "./controllers/listsController.js";
import * as ItemController from "./controllers/itemsController.js";

configure({
    views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
    const url = new URL(request.url)

    if (url.pathname.startsWith("/lists/") && request.method === "GET") {
        const id = url.pathname.split("/")[2];
        return await ListController.viewList(request, id)

    } else if (url.pathname.startsWith("/lists") && request.method === "GET") {
        return await ListController.viewLists(request)

    } else if (url.pathname.includes("collect") && request.method === "POST") {
        const shopping_list_id = url.pathname.split("/")[2];
        const item_id = url.pathname.split("/")[4];
        return await ItemController.updateItem(request, shopping_list_id, item_id);
    
    } else if (url.pathname.includes("items") && request.method === "POST") {
        const id = url.pathname.split("/")[2];
        return await ItemController.createItem(request, id);

    } else if (url.pathname.includes("deactivate") && request.method === "POST") {
        const id = url.pathname.split("/")[2];
        return await ListController.updateLists(request, id);

    } else if (url.pathname.startsWith("/lists") && request.method === "POST") {
        return await ListController.createList(request);

    } else {
        return await ListController.getStatistics(request)
    }
};

serve(handleRequest, { port: 7777 });