import { serve, renderFile, configure } from "./deps.js";
import * as Controller from "./controllers/controller.js";
import * as ListController from "./controllers/listsController.js";
import * as ItemController from "./controllers/itemsController.js";

configure({
    views: `${Deno.cwd()}/views/`,
});

const routes = {
    GET: {
        "/": Controller.getStatistics,
        "/lists": ListController.viewLists,
        "/lists/:id": ListController.viewList,
    },
    POST: {
        "/lists": ListController.addList,
        "/lists/:id/deactivate": ListController.updateLists,
        "/lists/:id/items": ItemController.createItem,
        "/lists/:id/items/:itemId/collect": ItemController.updateItem,
    }
};

const handleRequest = async (request) => {
    const url = new URL(request.url);
    const handler = routes[request.method] && routes[request.method][url.pathname];

    if (handler) {
        return await handler(request, url);
    } else {
        return new Response("Does not exist", { status: 404 });
    }
};

const port = Deno.args.length > 0 ? Number(Deno.args[Deno.args.length - 1]) : 7777;

serve(handleRequest, { port });