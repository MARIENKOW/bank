import { $AdminApi } from "../http/index.js";
import config from "../configs/config.js";
import axios from "axios";

const BLOG_API_URL = config.SERVER_API + "/Blog";

export default class BlogService {
    constructor($api = $AdminApi) {
        this.create = async (value) => {
            console.log(value);
            const res = await $api.post(BLOG_API_URL + "/", value, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return res;
        };
        this.getAll = async (page = null) => {
            if (this.CancelToken) this.CancelToken.abort();
            const controller = new AbortController();
            this.CancelToken = controller;
            const res = await axios.get(BLOG_API_URL + "/", {
                params: { page },
                signal: controller.signal,
            });
            return res;
        };
        this.getShort = async () => {
            if (this.CancelToken) this.CancelToken.abort();
            const controller = new AbortController();
            this.CancelToken = controller;
            const res = await axios.get(BLOG_API_URL + "/short", {
                signal: controller.signal,
            });
            return res;
        };
        this.getImportant = async () => {
            if (this.CancelToken) this.CancelToken.abort();
            const controller = new AbortController();
            this.CancelToken = controller;
            const res = await axios.get(BLOG_API_URL + "/important", {
                signal: controller.signal,
            });
            return res;
        };
        this.getMain = async () => {
            if (this.CancelToken) this.CancelToken.abort();
            const controller = new AbortController();
            this.CancelToken = controller;
            const res = await axios.get(BLOG_API_URL + "/main", {
                signal: controller.signal,
            });
            return res;
        };
        this.setMain = async (id) => {
            if (this.CancelToken) this.CancelToken.abort();
            const controller = new AbortController();
            this.CancelToken = controller;
            const res = await $api.put(BLOG_API_URL + "/main/" + id, {
                signal: controller.signal,
                headers: { "Content-Type": "multipart/form-data" },
            });
            return res;
        };
        this.deleteMain = async (id) => {
            if (this.CancelToken) this.CancelToken.abort();
            const controller = new AbortController();
            this.CancelToken = controller;
            const res = await $api.delete(BLOG_API_URL + "/main/" + id, {
                signal: controller.signal,
                headers: { "Content-Type": "multipart/form-data" },
            });
            return res;
        };

        this.setImportant = async (id, value) => {
            const res = await $api.put(
                BLOG_API_URL + "/important/" + id,
                value,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            return res;
        };
        this.setShort = async (id, value) => {
            const res = await $api.put(
                BLOG_API_URL + "/short/" + id,
                value,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            return res;
        };
        this.update = async (id, value) => {
            const res = await $api.put(BLOG_API_URL + "/" + id, value, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return res;
        };
        this.delete = async (id) => {
            const res = await $api.delete(BLOG_API_URL + "/" + id);
            return res;
        };
        this.getById = async (id) => {
            const res = await axios.get(BLOG_API_URL + "/" + id);
            return res;
        };
    }
}
