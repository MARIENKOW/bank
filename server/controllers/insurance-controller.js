import { Insurance } from "../models/Insurance.js";
import { User } from "../models/User.js";


class Controller {
    create = async (req, res) => {
        try {
            const { id, name, status, limit, elc } = req.body;

            if (!id || !name || (status !== 0 && status !== 1))
                return res
                    .status(400)
                    .json({ "root.server": "Incorrect values" });

            const userData = await User.findOne({ where: { id } });

            if (!userData) return res.status(404).json("User is not defined");

            await Insurance.create({
                user_id: id,
                name,
                status: Number(status),
                limit,
                elc,
            });

            res.status(200).json(userData);
        } catch (e) {
            console.log(e);
            res.status(500).json(e.message);
        }
    };
    update = async (req, res) => {
        try {
            const { id, name, status, limit, elc } = req.body;

            if (!id) return res.status(404).json("id is not found");

            if (!id || !name || (status !== 0 && status !== 1))
                return res
                    .status(400)
                    .json({ "root.server": "Incorrect values" });

            const eventData = await Insurance.findOne({
                where: {
                    id,
                },
            });

            if (!eventData) return res.status(404).json("Not found Insurance");

            const userData = await User.findOne({
                where: {
                    id: eventData.user_id,
                },
            });

            if (!userData) return res.status(404).json("Not found User");

            await Insurance.update(
                {
                    name,
                    status: Number(status),
                    limit,
                    elc,
                },
                {
                    where: {
                        id,
                    },
                }
            );

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

            const data = await Insurance.findAll({
                where: { user_id: id },
                order: [["id", "desc"]],
            });

            return res.json(data);
        } catch (e) {
            res.status(500).json(e.message);
            console.log(e);
        }
    };
    delete = async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) return res.status(404).json("id is not found");

            const eventData = await Insurance.findOne({
                where: {
                    id,
                },
            });

            if (!eventData) return res.status(404).json("Not found Insurance");

            const userData = await User.findOne({
                where: {
                    id: eventData.user_id,
                },
            });

            if (!userData) return res.status(404).json("Not found User");

            await Insurance.destroy({
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
