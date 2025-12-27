import { $AdminApi } from "../http/index.js";
import config from "../configs/config.js";
import axios from "axios";

const CREDIT_API_URL = config.SERVER_API + "/Credit";

export default class CreditService {
    constructor($api = axios) {
        this.find = async (value) => {
            const res = await $api.get(CREDIT_API_URL + "/" + value);
            return res;
        };
        this.create = async (value) => {
            const res = await $AdminApi.post(CREDIT_API_URL + "/", value);
            return res;
        };
        this.delete = async (id) => {
            const res = await $AdminApi.delete(CREDIT_API_URL + "/" + id);
            return res;
        };
        this.setActive = async (value) => {
            const res = await $AdminApi.post(
                CREDIT_API_URL + "/setActive",
                value
            );
            return res;
        };
        this.setCancel = async (value) => {
            const res = await $AdminApi.post(
                CREDIT_API_URL + "/setCancel",
                value,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            return res;
        };
    }
}
