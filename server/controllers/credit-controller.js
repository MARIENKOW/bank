import { User } from "../models/User.js";
import { Credit } from "../models/Credit.js";
import { Event } from "../models/Event.js";
import documentService from "../services/document-service.js";
import { Document } from "../models/Document.js";

class Controller {
    create = async (req, res) => {
        try {
            const { id, sum, comment, bank, time, elc, date } = req.body;

            if (!id || !sum || !date)
                return res
                    .status(400)
                    .json({ "root.server": "Incorrect values" });

            const userData = await User.findOne({ where: { id } });
            if (!userData) return res.status(404).json("User is not defined");

            await Credit.create({
                user_id: id,
                comment,
                bank,
                elc,
                time,
                sum,
                date,
                status: 1,
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

            const statementData = await Credit.findAll({
                where: { user_id: id, status: 1 },
                order: [
                    ["date", "desc"],
                    ["id", "desc"],
                ],
            });
            const activeData = await Credit.findAll({
                where: { user_id: id, status: 2 },
                order: [
                    ["date", "desc"],
                    ["id", "desc"],
                ],
            });
            const cancelData = await Credit.findAll({
                where: { user_id: id, status: 3 },
                include: [{ model: Document, as: "document", required: false }],
                order: [
                    ["date", "desc"],
                    ["id", "desc"],
                ],
            });

            return res.json({ statementData, activeData, cancelData });
        } catch (e) {
            res.status(500).json(e.message);
            console.log(e);
        }
    };
    setActive = async (req, res) => {
        try {
            const { id, sum, date, comment, bank, time, elc, user_id } =
                req.body;

            if (!id || !sum || !date)
                return res
                    .status(400)
                    .json({ "root.server": "Incorrect values" });

            const userData = await User.findOne({
                where: {
                    id: user_id,
                },
            });

            if (!userData) return res.status(404).json("Not found User");

            await Credit.update(
                { date, comment, bank, time, elc, sum, status: 2 },
                { where: { id } }
            );
            // const newBalance = Number(userData.balance) + Number(sum);

            // let elcString = elc || "";
            // let bankString = bank || "";
            // let commentString = comment || "";

            // const eventComment =
            //     commentString + " " + bankString + " " + elcString;

            // await Event.create({
            //     comment: eventComment,
            //     increment: 1,
            //     user_id,
            //     sum,
            //     date,
            // });

            // await User.update(
            //     { balance: newBalance },
            //     { where: { id: user_id } }
            // );
            return res.json(true);
        } catch (e) {
            res.status(500).json(e.message);
            console.log(e);
        }
    };
    setCancel = async (req, res) => {
        try {
            const { id, sum, date, comment, elc, time, bank, user_id } =
                req.body;
            const document = req?.files?.document;
            console.log(document);

            if (!id || !sum || !date)
                return res
                    .status(400)
                    .json({ "root.server": "Incorrect values" });

            const userData = await User.findOne({
                where: {
                    id: user_id,
                },
            });

            if (!userData) return res.status(404).json("Not found User");

            const { document_id } = await documentService.save(document);

            await Credit.update(
                { date, document_id, comment, time, elc, bank, sum, status: 3 },
                { where: { id } }
            );

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

            const eventData = await Credit.findOne({
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

            await Credit.destroy({
                where: { id: id },
            });
            if (eventData?.document_id) {
                await documentService.delete(eventData?.document_id);
            }

            return res.json(true);
        } catch (e) {
            res.status(500).json(e.message);
            console.log(e);
        }
    };
}
export default new Controller();
