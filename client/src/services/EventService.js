import { $AdminApi } from "../http/index.js";
import config from "../configs/config.js";
import axios from "axios";

const EVENT_API_URL = config.SERVER_API + "/Event";

export default class EventService {
    constructor($api = axios) {
        this.find = async (value) => {
            const res = await $api.get(EVENT_API_URL + "/" + value);
            return res;
        };
        this.create = async (value) => {
            const res = await $AdminApi.post(EVENT_API_URL + "/", value);
            return res;
        };
        this.delete = async (id) => {
            const res = await $AdminApi.delete(EVENT_API_URL + "/" + id);
            return res;
        };
        this.deleteAll = async (id) => {
            const res = await $AdminApi.delete(EVENT_API_URL + "/all/" + id);
            return res;
        };
    }
}
