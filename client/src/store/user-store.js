import { makeAutoObservable } from "mobx";
import UserService from "../services/UserService";

const userService = new UserService();

class User {
    isAuth = null;
    user = {};
    isLoading = true;
    constructor() {
        makeAutoObservable(this);
    }
    setAuth = (value) => {
        this.isAuth = value;
    };
    setUser = (value) => {
        this.user = value;
    };
    setUnauthorized = () => {
        this.setUser({});
        this.setAuth(false);
    };
    setIsLoading = (value) => {
        this.isLoading = value;
    };

    signInUser = async (value) => {
        const { data } = await userService.signIn(value);
        this.setAuth(true);
        this.setUser(data);
    };
    updateName = async (value) => {
        const { data } = await userService.updateName(value);
        this.setUser(data);
    };
    updateUsername = async (value) => {
        const { data } = await userService.updateUsername(value);
        this.setUser(data);
    };
    logOut = async () => {
        await userService.logOut();
        this.setUnauthorized();
    };

    aboutUser = async () => {
        try {
            this.setIsLoading(true);
            const { data } = await userService.aboutUser();
            this.setUser(data);
            this.setAuth(true);
            this.setIsLoading(false);
        } catch (e) {
            console.log(e);
            if (e?.response?.status === 401) {
                this.setUnauthorized();
                return this.setIsLoading(false);
            }
            setTimeout(this.aboutUser, 5000);
        }
    };
}

export default User;
