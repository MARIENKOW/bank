import { $AdminApi } from "../http/index.js";
import config from "../configs/config.js";
import axios from "axios";

const PHONE_API_URL = config.SERVER_API + "/Phone";

export default class PhoneService {
    constructor($api = $AdminApi) {
        this.create = async (value) => {
            if (this.CancelToken) this.CancelToken.abort();
            const controller = new AbortController();
            this.CancelToken = controller;
            const res = await $api.post(PHONE_API_URL + "/", value, {
                headers: { "Content-Type": "multipart/form-data" },
                signal: controller.signal,
            });
            return res;
        };
        this.update = async (id, value) => {
            if (this.CancelToken) this.CancelToken.abort();
            const controller = new AbortController();
            this.CancelToken = controller;
            const res = await $api.put(PHONE_API_URL + "/" + id, value, {
                headers: { "Content-Type": "multipart/form-data" },
                signal: controller.signal,
            });
            return res;
        };
        this.delete = async (id) => {
            if (this.CancelToken) this.CancelToken.abort();
            const controller = new AbortController();
            this.CancelToken = controller;
            const res = await $api.delete(PHONE_API_URL + "/" + id, {
                signal: controller.signal,
            });
            return res;
        };
        this.getPhones = async () => {
            const res = await axios.get(PHONE_API_URL + "/");
            return res;
        };
    }
}
