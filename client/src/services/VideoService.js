import { $AdminApi } from "../http/index.js";
import config from "../configs/config.js";

const VIDEO_API_URL = config.SERVER_API + "/Video";

export default class VideoService {
    constructor($api = $AdminApi) {
        this.getAll = async (page) => {
            const res = await $api.get(VIDEO_API_URL + "/", {
                params: { page },
            });
            return res;
        };
        this.create = async (value) => {
            const res = await $api.post(VIDEO_API_URL + "/", value, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return res;
        };
        this.delete = async (id) => {
            const res = await $api.delete(VIDEO_API_URL + "/" + id);
            return res;
        };
    }
}
