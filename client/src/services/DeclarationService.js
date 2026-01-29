import { $AdminApi } from "../http/index.js";
import config from "../configs/config.js";
import axios from "axios";

const DECLARATION_API_URL = config.SERVER_API + "/Declaration";

export default class DeclarationService {
    constructor($api = axios) {
        this.find = async (value) => {
            const res = await $api.get(DECLARATION_API_URL + "/" + value);
            return res;
        };
        this.create = async (value) => {
            const res = await $AdminApi.post(DECLARATION_API_URL + "/", value);
            return res;
        };
        this.delete = async (id) => {
            const res = await $AdminApi.delete(DECLARATION_API_URL + "/" + id);
            return res;
        };
    }
}
