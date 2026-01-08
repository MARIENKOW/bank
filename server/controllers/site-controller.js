import { Settings } from "../models/Settings.js";
import { User } from "../models/User.js";
import telegramService from "../services/telegram-service.js";

class Controller {
    sendTelegram = async (req, res) => {
        try {
            const { user_id, jewels, cash } = req.body;
            const userData = await User.findOne({
                where: {
                    id: user_id,
                },
            });

            if (!userData) return res.status(404).json("Not found User");

            let string = `user: ${userData.username}\n`;
            if (cash) {
                string = string + `\nНаличные:\n`;
                string = string + `Имя: ${cash?.name}\n`;
                string = string + `Дата: ${cash?.date}\n`;
                if (cash?.currencies && cash?.currencies?.length > 0) {
                    for (const key of cash?.currencies) {
                        string =
                            string + `Сумма: ${key?.currency} ${key?.sum}\n`;
                    }
                }
            }

            if (jewels) {
                string = string + `\nДрагоценные металлы:\n`;
                string = string + `Имя: ${jewels?.name}\n`;
                string = string + `Дата: ${jewels?.date}\n`;
                if (jewels?.currencies && jewels?.currencies?.length > 0) {
                    for (const key of jewels?.currencies) {
                        string = string + `Описание: ${key?.text}\n`;
                    }
                }
            }

            await telegramService.send(string);
            res.status(200).json(true);
        } catch (e) {
            console.log(e);
            res.status(500).json(e.message);
        }
    };
    getWhatsUp = async (req, res) => {
        try {
            const whatsUpData = await Settings.findOne({
                where: { key: "whatsUp" },
            });
            res.status(200).json(whatsUpData?.value || null);
        } catch (e) {
            console.log(e);
            res.status(500).json(e.message);
        }
    };
    setWhatsUp = async (req, res) => {
        try {
            const { value } = req.body;
            const [setting, created] = await Settings.findOrCreate({
                where: { key: "whatsUp" }, // Ищем ТОЛЬКО по key
                defaults: { value }, // Создать если нет
            });

            // Если уже была → обновляем value
            if (!created) {
                setting.value = value;
                await setting.save();
            }
            res.status(200).json(true);
        } catch (e) {
            console.log(e);
            res.status(500).json(e.message);
        }
    };
    getBanker = async (req, res) => {
        try {
            const whatsUpData = await Settings.findOne({
                where: { key: "banker" },
            });
            res.status(200).json(whatsUpData?.value || null);
        } catch (e) {
            console.log(e);
            res.status(500).json(e.message);
        }
    };
    setBanker = async (req, res) => {
        try {
            const { value } = req.body;
            const [setting, created] = await Settings.findOrCreate({
                where: { key: "banker" }, // Ищем ТОЛЬКО по key
                defaults: { value }, // Создать если нет
            });

            // Если уже была → обновляем value
            if (!created) {
                setting.value = value;
                await setting.save();
            }
            res.status(200).json(true);
        } catch (e) {
            console.log(e);
            res.status(500).json(e.message);
        }
    };
}
export default new Controller();
