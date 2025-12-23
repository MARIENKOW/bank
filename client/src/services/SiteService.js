import { $AdminApi } from "../http/index.js";
import config from "../configs/config.js";
import axios from "axios";

const SITE_API_URL = config.SERVER_API + "/";

export default class SiteService {
    constructor($api = axios) {
        this.sendTelegram = async (value) => {
            const res = await $api.post(SITE_API_URL + "/sendTelegram", value);
            return res;
        };
        this.getWhatsUp = async () => {
            const res = await $api.get(SITE_API_URL + "/whatsUp");
            return res;
        };
        this.setWhatsUp = async (value) => {
            const res = await $AdminApi.post(SITE_API_URL + "/whatsUp", value);
            return res;
        };
        this.getBanker = async () => {
            const res = await $api.get(SITE_API_URL + "/banker");
            return res;
        };
        this.setBanker = async (value) => {
            const res = await $AdminApi.post(SITE_API_URL + "/banker", value);
            return res;
        };
    }
}
