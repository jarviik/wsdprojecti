import { serve, configure } from "./deps.js";
import * as Controller from "./controllers/controller.js";
import * as ListController from "./controllers/listsController.js";
import * as ItemController from "./controllers/itemsController.js";
import * as utils from "./utils/utils.js";

configure({
    views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
    const url = new URL(request.url)

    if (url.pathname === "/" && request.method === "GET") {
        return await Controller.getStatistics(request)
    }else if (url.pathname === "/lists" && request.method === "GET") {
        return await ListController.viewLists(request)
    } else if (url.pathname === "/lists" && request.method === "POST") {
        return await ListController.addList(request)
    } else if (url.pathname.match("/lists/[0-9]+") && request.method === "GET") { 
        return await ListController.viewList(request)
    } else if (url.pathname.match("/lists/[0-9]+/items/[0-9]+/collect") && request.method === "POST") {
        return await ItemController.updateItem(request)
    } else if (url.pathname.match("/lists/[0-9]+/items") && request.method === "POST") {
        return await ItemController.createItem(request)
    } else if (url.pathname.match("/lists/[0-9]+/deactivate") && request.method === "POST") {
        return await ListController.updateLists(request)
    } else {
        return new Response("Not found", { status: 404 });
    }
}

serve(handleRequest, { port: 7777 });