import { $AdminApi } from "../http/index.js";
import config from "../configs/config.js";
import axios from "axios";

const USER_DOCUMENT_API_URL = config.SERVER_API + "/UserDocument";

export default class UserDocumentService {
    constructor($api = axios) {
        this.find = async (value) => {
            const res = await $api.get(USER_DOCUMENT_API_URL + "/" + value);
            return res;
        };
        this.create = async (value) => {
            const res = await $AdminApi.post(
                USER_DOCUMENT_API_URL + "/",
                value,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            return res;
        };
        this.delete = async (id) => {
            const res = await $AdminApi.delete(
                USER_DOCUMENT_API_URL + "/" + id
            );
            return res;
        };
    }
}
