import { ru } from "./languages/ru";
import { il } from "./languages/il";

export const messagesModules = {
    //первый - defaultLanguage
    ru,
    il
};

export const languages = Object.keys(messagesModules);

export const defaultLanguage = "ru";
