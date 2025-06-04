
import { Config } from "$src/config";
import { DmartClient } from "@edraj/tsdmart/client";
import { HttpInterctor } from "./http.interceptors";

const httpClient = new DmartClient({
    baseURL: Config.API.apiRoot
});

HttpInterctor(httpClient.client);

export default httpClient;
