import { User } from "../models/User.js";
import { Credit } from "../models/Credit.js";
import { Event } from "../models/Event.js";
import documentService from "../services/document-service.js";
import { Document } from "../models/Document.js";
import { UserDocument } from "../models/UserDocument.js";
import imgService from "../services/img-service.js";
import { Img } from "../models/Img.js";

class Controller {
    create = async (req, res) => {
        try {
            const { id, name } = req.body;
            const document = req?.files?.document;
            const img = req?.files?.img;

            if (!id)
                return res
                    .status(400)
                    .json({ "root.server": "Incorrect values" });

            const userData = await User.findOne({ where: { id } });
            if (!userData) return res.status(404).json("User is not defined");

            let img_id = null;
            let document_id = null;

            if (document) {
                const data = await documentService.save(document);
                document_id = data?.document_id;
            }
            if (img) {
                const data = await imgService.save(img);
                img_id = data?.img_id;
            }

            await UserDocument.create({
                user_id: id,
                name,
                img_id,
                document_id,
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

            const data = await UserDocument.findAll({
                where: { user_id: id },
                include: [
                    {
                        model: Document,
                        as: "document",
                        required: false,
                    },
                    {
                        model: Img,
                        as: "img",
                        required: false,
                    },
                    {
                        model: Img,
                        as: "sign",
                        required: false,
                    },
                ],
                order: [["id", "desc"]],
            });

            return res.json(data);
        } catch (e) {
            res.status(500).json(e.message);
            console.log(e);
        }
    };
    setSign = async (req, res) => {
        try {
            const { id, user_id, img } = req.body;
            const base64Data = img.replace(/^data:image\/png;base64,/, "");
            const imgBuffer = Buffer.from(base64Data, "base64");

            if (!id || !img)
                return res
                    .status(400)
                    .json({ "root.server": "Incorrect values" });

            const userData = await User.findOne({
                where: {
                    id: user_id,
                },
            });

            if (!userData) return res.status(404).json("Not found User");

            const userDocument = await UserDocument.findOne({ where: { id } });

            if (userDocument?.sign_id)
                return res
                    .status(403)
                    .json("Document is already have signature");

            const { img_id } = await imgService.save(imgBuffer);

            await UserDocument.update({ sign_id: img_id }, { where: { id } });

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

            const eventData = await UserDocument.findOne({
                where: {
                    id,
                },
            });

            if (!eventData) return res.status(404).json("Not found Document");

            const userData = await User.findOne({
                where: {
                    id: eventData.user_id,
                },
            });

            if (!userData) return res.status(404).json("Not found User");

            await UserDocument.destroy({
                where: { id: id },
            });
            if (eventData?.document_id) {
                await documentService.delete(eventData?.document_id);
            }
            if (eventData?.img_id) {
                await imgService.delete(eventData?.img_id);
            }
            if (eventData?.sign_id) {
                await imgService.delete(eventData?.sign_id);
            }

            return res.json(true);
        } catch (e) {
            res.status(500).json(e.message);
            console.log(e);
        }
    };
}
export default new Controller();
