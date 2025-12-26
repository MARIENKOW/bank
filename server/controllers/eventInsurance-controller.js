import { EventInsurance } from "../models/EventInsurance.js";
import { User } from "../models/User.js";

class Controller {
    create = async (req, res) => {
        try {
            const { comment, increment, id, sum, date } = req.body;

            if (increment === "" || !id || !sum || !date)
                return res
                    .status(400)
                    .json({ "root.server": "Incorrect values" });

            const userData = await User.findOne({ where: { id } });
            if (!userData) return res.status(404).json("User is not defined");

            await EventInsurance.create({
                comment,
                increment,
                user_id: id,
                sum,
                date,
            });

            res.status(200).json(userData);
        } catch (e) {
            console.log(e);
            res.status(500).json(e.message);
        }
    };
    find = async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) return res.status(404).json("id is not found");

            const userData = await User.findOne({
                where: {
                    id,
                },
            });

            if (!userData) return res.status(404).json("Not found User");

            const data = await EventInsurance.findAll({
                where: { user_id: id },
                order: [
                    ["date", "desc"],
                    ["id", "desc"],
                ],
            });

            return res.json(data);
        } catch (e) {
            res.status(500).json(e.message);
            console.log(e);
        }
    };
    deleteAll = async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) return res.status(404).json("id is not found");

            const userData = await User.findOne({
                where: {
                    id,
                },
            });

            if (!userData) return res.status(404).json("Not found User");

            await EventInsurance.destroy({
                where: { user_id: id },
            });

            return res.json(true);
        } catch (e) {
            res.status(500).json(e.message);
            console.log(e);
        }
    };
    delete = async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) return res.status(404).json("id is not found");

            const eventData = await EventInsurance.findOne({
                where: {
                    id,
                },
            });

            if (!eventData) return res.status(404).json("Not found Event");

            const userData = await User.findOne({
                where: {
                    id: eventData.user_id,
                },
            });

            if (!userData) return res.status(404).json("Not found User");

            await EventInsurance.destroy({
                where: { id: id },
            });

            return res.json(true);
        } catch (e) {
            res.status(500).json(e.message);
            console.log(e);
        }
    };
}
export default new Controller();
