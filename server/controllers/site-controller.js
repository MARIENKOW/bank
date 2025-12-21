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
}
export default new Controller();
