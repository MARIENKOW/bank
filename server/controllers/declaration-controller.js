import { User } from "../models/User.js";
import { DeclarationValute } from "../models/DeclarationValute.js";

class Controller {
    create = async (req, res) => {
        try {
            const { id, name } = req.body;

            if (!name)
                return res
                    .status(400)
                    .json({ "root.server": "Incorrect values" });

            const userData = await User.findOne({ where: { id } });
            if (!userData) return res.status(404).json("User is not defined");

            await DeclarationValute.create({
                user_id: id,
                name,
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

            const data = await DeclarationValute.findAll({
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

            const eventData = await DeclarationValute.findOne({
                where: {
                    id,
                },
            });

            if (!eventData) return res.status(404).json("Not found Valut");

            const userData = await User.findOne({
                where: {
                    id: eventData.user_id,
                },
            });

            if (!userData) return res.status(404).json("Not found User");

            await DeclarationValute.destroy({
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
