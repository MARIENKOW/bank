export const MAIN_ROUTE = (token) => "/" + token;
export const SIGNIN_ROUTE = (token) => MAIN_ROUTE(token) + "/signin";
export const ACCOUNT_ROUTE = (token) => MAIN_ROUTE(token) + "/account";
export const BLOG_ROUTE = (token) => MAIN_ROUTE(token) + "/blog";
export const ACCOUNT_INSURANCE_ROUTE = (token) =>
    ACCOUNT_ROUTE(token) + "/insuranceEvent";
export const ACCOUNT_CREDIT_STATEMENT_ROUTE = (token) =>
    ACCOUNT_ROUTE(token) + "/creditStatement";
export const ACCOUNT_CREDIT_ACTIVE_ROUTE = (token) =>
    ACCOUNT_ROUTE(token) + "/creditActive";
export const ACCOUNT_CREDIT_CANCEL_ROUTE = (token) =>
    ACCOUNT_ROUTE(token) + "/creditCancel";
export const ACCOUNT_DOCUMENT_ROUTE = (token) =>
    ACCOUNT_ROUTE(token) + "/document";
export const ACCOUNT_DECLARATION_ROUTE = (token) =>
    ACCOUNT_ROUTE(token) + "/declaration";
export const ACCOUNT_DECLARATION2_ROUTE = (token) =>
    ACCOUNT_ROUTE(token) + "/declaration2";
export const ACCOUNT_BANK_ROUTE = (token) => ACCOUNT_ROUTE(token) + "/bank";
export const ACCOUNT_INSURANCE_1_ROUTE = (token) =>
    ACCOUNT_ROUTE(token) + "/insurance";

export const ADMIN_ROUTE = "/admin";
export const ADMIN_ACCESS_ROUTE = ADMIN_ROUTE + "/access";
export const ADMIN_USERS_ROUTE = ADMIN_ROUTE + "/users";
export const ADMIN_USER_ROUTE = (id) => ADMIN_ROUTE + "/users" + "/" + id;
export const ADMIN_USER_EVENT_INSURANCE_ROUTE = (id) =>
    ADMIN_USER_ROUTE(id) + "/eventInsurance";
export const ADMIN_USER_CREDIT_ROUTE = (id) => ADMIN_USER_ROUTE(id) + "/credit";
export const ADMIN_USER_DOCUMENT_ROUTE = (id) =>
    ADMIN_USER_ROUTE(id) + "/document";
export const ADMIN_USER_BANK_ROUTE = (id) => ADMIN_USER_ROUTE(id) + "/bank";
export const ADMIN_USER_INSURANCE_ROUTE = (id) =>
    ADMIN_USER_ROUTE(id) + "/insurance";
export const ADMIN_PHONE_ROUTE = ADMIN_ROUTE + "/phone";
export const ADMIN_PHONE_WHATSUP_ROUTE = ADMIN_PHONE_ROUTE + "/whatsup";
export const ADMIN_PHONE_BANKER_ROUTE = ADMIN_PHONE_ROUTE + "/banker";
export const ADMIN_BLOG_ROUTE = ADMIN_ROUTE + "/blog";
export const ADMIN_BLOG_CREATE_ROUTE = ADMIN_BLOG_ROUTE + "/create";
export const ADMIN_BLOG_UPDATE_ROUTE = ADMIN_BLOG_ROUTE + "/update";
