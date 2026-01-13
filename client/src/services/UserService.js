import config from "../configs/config.js";
import { $AdminApi, $UserApi, USER_API_URL } from "../http/index.js";

export default class UserService {
    constructor() {
        this.signIn = async (value) => {
            const res = await $UserApi.post(USER_API_URL + "/signIn", value);
            return res;
        };
        this.signUp = async (value) => {
            const ans = await $AdminApi.post(USER_API_URL + "/signUp", value);
            return ans;
        };
        this.logOut = async () => {
            const rez = await $UserApi.post(USER_API_URL + "/logOut");
            return rez;
        };
        this.refresh = async () => {
            return await $UserApi.post(USER_API_URL + "/refresh");
        };
        this.checkAuthUser = async () => {
            const response = await $UserApi.get(
                USER_API_URL + "/checkAuthUser"
            );
            return response;
        };
        this.aboutUser = async () => {
            const ans = await $UserApi.get(USER_API_URL + "/aboutUser");
            return ans;
        };
        this.getAll = async () => {
            const ans = await $AdminApi.get(USER_API_URL + "/getAll");
            return ans;
        };
        this.getById = async (id) => {
            const ans = await $AdminApi.get(USER_API_URL + "/" + id);
            return ans;
        };
        this.cashOut = async (value) => {
            const res = await $AdminApi.post(USER_API_URL + "/cash-out", value);
            return res;
        };

        this.updateName = async (value) => {
            const res = await $AdminApi.post(
                USER_API_URL + "/updateName",
                value
            );
            return res;
        };
        this.updateReservedBalance = async (value) => {
            const res = await $AdminApi.post(
                USER_API_URL + "/updateReservedBalance",
                value
            );
            return res;
        };
        this.updateElc = async (value) => {
            const res = await $AdminApi.post(
                USER_API_URL + "/updateElc",
                value
            );
            return res;
        };
        this.updateInsuranceElc = async (value) => {
            const res = await $AdminApi.post(
                USER_API_URL + "/updateInsuranceElc",
                value
            );
            return res;
        };
        this.updateBankNumber = async (value) => {
            const res = await $AdminApi.post(
                USER_API_URL + "/updateBankNumber",
                value
            );
            return res;
        };
        this.updateUsername = async (value) => {
            const res = await $AdminApi.post(
                USER_API_URL + "/updateUsername",
                value
            );
            return res;
        };
        this.updatePassword = async (value) => {
            const res = await $AdminApi.post(
                USER_API_URL + "/updatePassword",
                value
            );
            return res;
        };
        this.bankerUpdate = async (value) => {
            const res = await $AdminApi.post(
                USER_API_URL + "/bankerUpdate",
                value,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            return res;
        };
    }
}
