export const MAIN_ROUTE = (token) => "/" + token;
export const SIGNIN_ROUTE = (token) => MAIN_ROUTE(token) + "/signin";
export const ACCOUNT_ROUTE = (token) => MAIN_ROUTE(token) + "/account";
export const ADMIN_ROUTE = "/admin";

export const ADMIN_ACCESS_ROUTE = ADMIN_ROUTE + "/access";
export const ADMIN_USERS_ROUTE = ADMIN_ROUTE + "/users";
export const ADMIN_PHONE_ROUTE = ADMIN_ROUTE + "/phone";

