import { ru } from "./languages/ru";
import { he } from "./languages/he";

export const messagesModules = {
    //первый - defaultLanguage
    ru,
    he
};

export const languages = Object.keys(messagesModules);

export const defaultLanguage = "he";
