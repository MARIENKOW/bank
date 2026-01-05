import { $AdminApi } from "../http/index.js";
import config from "../configs/config.js";
import axios from "axios";

const BANK_API_URL = config.SERVER_API + "/Bank";

export default class BankService {
    constructor($api = axios) {
        this.find = async (value) => {
            const res = await $api.get(BANK_API_URL + "/" + value);
            return res;
        };
        this.create = async (value) => {
            const res = await $AdminApi.post(BANK_API_URL + "/", value);
            return res;
        };
        this.delete = async (id) => {
            const res = await $AdminApi.delete(BANK_API_URL + "/" + id);
            return res;
        };
    }
}
