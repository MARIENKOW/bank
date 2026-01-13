import { $AdminApi } from "../http/index.js";
import config from "../configs/config.js";
import axios from "axios";

const INSURANCE_BODY_API_URL = config.SERVER_API + "/InsuranceBody";

export default class InsuranceBodyService {
    constructor($api = axios) {
        this.find = async (value) => {
            const res = await $api.get(INSURANCE_BODY_API_URL + "/" + value);
            return res;
        };
        this.create = async (value) => {
            const res = await $AdminApi.post(
                INSURANCE_BODY_API_URL + "/",
                value
            );
            return res;
        };
        this.update = async (value) => {
            const res = await $AdminApi.put(INSURANCE_BODY_API_URL, value);
            return res;
        };
        this.delete = async (id) => {
            const res = await $AdminApi.delete(
                INSURANCE_BODY_API_URL + "/" + id
            );
            return res;
        };
    }
}
