import { ru } from "./languages/ru";
import { he } from "./languages/he";
import { en } from "./languages/en";

export const messagesModules = {
    //первый - defaultLanguage
    ru,
    he,
    en
};

export const languages = Object.keys(messagesModules);

export const defaultLanguage = "he";
