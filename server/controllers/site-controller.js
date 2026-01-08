import { Settings } from "../models/Settings.js";
import { User } from "../models/User.js";
import imgService from "../services/img-service.js";
import telegramService from "../services/telegram-service.js";
function parseNestedFormData(body) {
    // ✅ Защита от null/undefined
    if (!body || typeof body !== "object") {
        console.warn("req.body is empty:", body);
        return {};
    }

    const result = {};
    for (let [key, value] of Object.entries(body)) {
        if (key.includes("[")) {
            const parts = key.replace(/\[([^\]]+)\]/g, ".$1").split(".");
            let current = result;

            for (let i = 0; i < parts.length - 1; i++) {
                const part = parts[i];
                if (!current[part]) {
                    const numMatch = part.match(/^(\d+)$/);
                    current[part] = numMatch ? [] : {};
                }
                current = current[part];
            }
            current[parts[parts.length - 1]] = value;
        } else {
            result[key] = value;
        }
    }
    return result;
}

class Controller {
    sendTelegram = async (req, res) => {
        try {
            const { user_id, jewels, cash } = parseNestedFormData(req.body);

            const data = parseNestedFormData(req?.files);
            const img = data?.jewels?.img;
            console.log(img);

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
                if (cash?.currencies) {
                    for (const key in cash?.currencies) {
                        console.log(key);
                        string =
                            string +
                            `Сумма: ${cash?.currencies?.[key]?.currency} ${cash?.currencies?.[key]?.sum}\n`;
                    }
                }
            }

            if (jewels) {
                string = string + `\nДрагоценные металлы:\n`;
                string = string + `Имя: ${jewels?.name}\n`;
                string = string + `Дата: ${jewels?.date}\n`;
                if (jewels?.currencies) {
                    for (const key in jewels?.currencies) {
                        console.log(key);
                        string =
                            string +
                            `Описание: ${jewels?.currencies?.[key]?.text}\n`;
                    }
                }
                if (img) {
                    const { path } = await imgService.save(img);
                    string = string + `фото: ${process.env.API_URL + path}\n`;
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
