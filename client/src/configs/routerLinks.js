export const MAIN_ROUTE = (token) => "/" + token;
export const SIGNIN_ROUTE = (token) => MAIN_ROUTE(token) + "/signin";
export const ACCOUNT_ROUTE = (token) => MAIN_ROUTE(token) + "/account";
export const BLOG_ROUTE = (token) => MAIN_ROUTE(token) + "/blog";

export const ADMIN_ROUTE = "/admin";
export const ADMIN_ACCESS_ROUTE = ADMIN_ROUTE + "/access";
export const ADMIN_USERS_ROUTE = ADMIN_ROUTE + "/users";
export const ADMIN_PHONE_ROUTE = ADMIN_ROUTE + "/phone";
export const ADMIN_PHONE_WHATSUP_ROUTE = ADMIN_PHONE_ROUTE + "/whatsup";
export const ADMIN_PHONE_BANKER_ROUTE = ADMIN_PHONE_ROUTE + "/banker";
export const ADMIN_BLOG_ROUTE = ADMIN_ROUTE + "/blog";
export const ADMIN_BLOG_CREATE_ROUTE = ADMIN_BLOG_ROUTE + "/create";
export const ADMIN_BLOG_UPDATE_ROUTE = ADMIN_BLOG_ROUTE + "/update";
