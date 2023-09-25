import { renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";
import * as listService from "../services/listsService.js";
import * as itemService from "../services/itemsService.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const getStatistics = async (request) => {
    const data = {
        lists_num: await listService.getLNum(),
        items_num: await itemService.getNum(),
    }
    return new Response(await renderFile("index.eta", data), responseDetails);
}

export { getStatistics }