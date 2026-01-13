import { EventInsurance } from "../models/EventInsurance.js";
import { InsuranceBody } from "../models/InsuranceBody.js";


class Controller {
    create = async (req, res) => {
        try {
            const { comment, increment, id, sum, date } = req.body;

            if (increment === "" || !id || !sum || !date)
                return res
                    .status(400)
                    .json({ "root.server": "Incorrect values" });

            const insuranceBodyData = await InsuranceBody.findOne({
                where: { id },
            });
            if (!insuranceBodyData)
                return res.status(404).json("InsuranceBody is not defined");

            await EventInsurance.create({
                comment,
                increment,
                body_id: id,
                sum,
                date,
            });

            res.status(200).json(insuranceBodyData);
        } catch (e) {
            console.log(e);
            res.status(500).json(e.message);
        }
    };
    find = async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) return res.status(404).json("id is not found");

            const insuranceBodyData = await InsuranceBody.findOne({
                where: {
                    id,
                },
            });

            if (!insuranceBodyData)
                return res.status(404).json("Not found insuranceBodyData");

            const data = await EventInsurance.findAll({
                where: { body_id: id },
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

            const insuranceBodyData = await InsuranceBody.findOne({
                where: {
                    id,
                },
            });

            if (!insuranceBodyData)
                return res.status(404).json("Not found insuranceBodyData");

            await EventInsurance.destroy({
                where: { body_id: id },
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

            const insuranceBodyData = await InsuranceBody.findOne({
                where: {
                    id: eventData.body_id,
                },
            });

            if (!insuranceBodyData)
                return res.status(404).json("Not found insuranceBodyData");

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
