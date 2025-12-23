import { Settings } from "../models/Settings.js";
import telegramService from "../services/telegram-service.js";

class Controller {
    sendTelegram = async (req, res) => {
        try {
            const {
                name,
                email,
                phone,
                description,
                address,
                birthday,
                appeal,
                price,
            } = req.body;
            // await telegramService.send(`
            // Имя: ${name}\nEmail: ${email}\nНомер телефона: ${phone}\nАдрес: ${address}\nДата рождения: ${birthday}\nБаланс: ${price}\n${
            //     description ? "Описание: " + description : ""
            // }`);
            await telegramService.send(`
            Имя: ${name}\nНомер телефона: ${phone}\nАдрес: ${address}\nДата рождения: ${birthday}\nВид обращения: ${appeal}\n${
                description ? "Описание: " + description : ""
            }`);
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
