import bcrypt from "bcrypt";
import token from "../services/token-service.js";
import { User } from "../models/User.js";

import config from "../config.js";
import { Event } from "../models/Event.js";

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

            await Event.create({ comment, increment, user_id: id, sum, date });

            const newBalance =
                increment === 1
                    ? Number(userData.balance) + Number(sum)
                    : Number(userData.balance) - Number(sum);

            await User.update({ balance: newBalance }, { where: { id: id } });

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

            const data = await Event.findAll({
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

            await Event.destroy({
                where: { user_id: id },
            });

            await User.update({ balance: "0.00" }, { where: { id: id } });

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

            const eventData = await Event.findOne({
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

            await Event.destroy({
                where: { id: id },
            });

            const increment = eventData.dataValues.increment;
            const sum = eventData.sum;
            const balance = userData.balance;

            let newBalance;
            if (increment === 0) {
                newBalance = Number(balance) + Number(sum);
            } else if (increment === 1) {
                newBalance = Number(balance) - Number(sum);
            }
            console.log(newBalance);

            await User.update(
                { balance: newBalance },
                { where: { id: eventData.user_id } }
            );

            return res.json(true);
        } catch (e) {
            res.status(500).json(e.message);
            console.log(e);
        }
    };
}
export default new Controller();
