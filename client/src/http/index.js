import axios from "axios";
import config from "../configs/config";
import {
    getAccessTokenAdmin,
    getAccessTokenUser,
} from "../actions/accessToken";
import { adminStore } from "../components/wrappers/AdminContextProvider";
import { userStore } from "../components/wrappers/UserContextProvider";
export const ADMIN_API_URL = config.SERVER_API + "/Admin";
export const USER_API_URL = config.SERVER_API + "/User";

export const $UserApi = axios.create({
    baseURL: config.SERVER_API,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

$UserApi.interceptors.request.use(async (config) => {
    const accessToken = await getAccessTokenUser();
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});

let userPromise = null;

$UserApi.interceptors.response.use(
    (config) => config,
    async (err) => {
        const originalRequest = err.config;
        if (
            err?.response?.status === 401 &&
            err.config &&
            !err.config._isRetry
        ) {
            originalRequest._isRetry = true;
            try {
                let promise;
                if (userPromise) {
                    promise = userPromise;
                } else {
                    promise = axios.get(`${USER_API_URL}/refresh`, {
                        withCredentials: true,
                    });
                    userPromise = promise;
                }
                const response = await promise;
                userPromise = null;
                return await $UserApi.request(originalRequest);
            } catch (e) {
                console.log(e?.message);
                if (e?.response?.status === 401) userStore.setUnauthorized();
                throw e;
            }
        }
        throw err;
    }
);

export const $AdminApi = axios.create({
    baseURL: config.SERVER_API,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

$AdminApi.interceptors.request.use(async (config) => {
    const accessToken = await getAccessTokenAdmin();
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
});

let adminPromise = null;

$AdminApi.interceptors.response.use(
    (config) => config,
    async (err) => {
        const originalRequest = err.config;
        if (
            err?.response?.status === 401 &&
            err.config &&
            !err.config._isRetry
        ) {
            originalRequest._isRetry = true;
            try {
                let promise;
                if (adminPromise) {
                    promise = adminPromise;
                } else {
                    promise = axios.get(`${ADMIN_API_URL}/refresh`, {
                        withCredentials: true,
                    });
                    adminPromise = promise;
                }
                await promise;
                adminPromise = null;
                return await $AdminApi.request(originalRequest);
            } catch (e) {
                if (e?.response?.status === 401) adminStore.setUnauthorized();
                throw e;
            }
        }
        throw err;
    }
);
