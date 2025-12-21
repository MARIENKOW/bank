import { makeAutoObservable } from "mobx";
import adminService from "../services/AdminService";

class Admin {
    isAuth = null;
    admin = {};
    isLoading = true;
    constructor() {
        makeAutoObservable(this);
    }
    setAuth(value) {
        this.isAuth = value;
    }
    setAdmin(value) {
        this.admin = value;
    }
    setUnauthorized = () => {
        this.setAdmin({});
        this.setAuth(false);
    };
    setIsLoading = (value) => {
        this.isLoading = value;
    };
    setToken = (value) => {
        this.token = value;
    };

    signInAdmin = async (value) => {
        const { data } = await adminService.signIn(value);
        this.setAuth(true);
        this.setAdmin(data.admin);
    };
    logOut = async () => {
        try {
            await adminService.logOut();
        } finally {
            this.setUnauthorized();
        }
    };
    aboutAdmin = async () => {
        try {
            this.setIsLoading(true);
            const { data } = await adminService.aboutAdmin();
            this.setAdmin(data);
            this.setAuth(true);
            this.setIsLoading(false);
        } catch (e) {
            console.log(e);
            if (e?.response?.status === 401) {
                this.setUnauthorized();
                return this.setIsLoading(false);
            }
            setTimeout(this.aboutAdmin, 5000);
        }
    };
}

export default Admin;
