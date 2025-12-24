import videoService from "../services/video-service.js";
import { Video } from "../models/Video.js";
import { Img } from "../models/Img.js";
import { Blog } from "../models/Blog.js";
import { sequelize } from "../services/DB.js";
import { Op } from "sequelize";
import { BlogVersionLanguage } from "../models/BlogVersionLanguage.js";
class Controller {
    create = async (req, res) => {
        try {
            const video = req?.files?.video;

            if (!video)
                return res
                    .status(400)
                    .json({ "root.server": "Incorrect values" });

            const { video_id, path, poster } = await videoService.save(video);
            const info = {
                path: process.env.API_URL + path,
                id: video_id,
                poster: process.env.API_URL + poster,
            };
            return res.status(200).json(info);
        } catch (e) {
            console.log(e);
            res.status(500).json(e?.message);
        }
    };
    delete = async (req, res) => {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).json("id is not found");
            const blogData = await Video.findOne({
                include: [{ model: BlogVersionLanguage, as: "blogs" }],
                where: {
                    id,
                },
            });

            if (!blogData) return res.status(404).json("video is not found");

            const { id: video_id } = blogData;

            if (blogData?.blogs?.length > 0)
                return res.status(403).json("video is used");

            await videoService.delete(video_id);

            return res.status(200).json(video_id);
        } catch (e) {
            console.log(e);
            res.status(500).json(e?.message);
        }
    };
    getAll = async (req, res) => {
        try {
            const VIDEOS_COUNT = 6;
            let { page } = req?.query;
            const offsetCount = (page) => ((page || 1) - 1) * VIDEOS_COUNT;
            const offset = offsetCount(page);
            let usedData = await Video.findAll({
                include: [
                    {
                        model: BlogVersionLanguage,
                        as: "blogs",
                        required: true,
                    },
                ],
                attributes: ["id"], // выбираем только id
                raw: true,
            });
            usedData = usedData.map((e) => e.id);
            let blogData = await Video.findAll({
                include: [
                    {
                        model: Img,
                        as: "img",
                        required: true,
                    },
                ],
                where: {
                    id: {
                        [Op.notIn]: usedData,
                    },
                },
                order: [["id", "DESC"]],
                offset,
                limit: VIDEOS_COUNT,
            });
            if (blogData.length === 0 && page > 1) {
                page = page - 1;
                blogData = await Video.findAll({
                    include: [
                        {
                            model: Img,
                            as: "img",
                            required: true,
                        },
                    ],
                    where: {
                        id: {
                            [Op.notIn]: usedData,
                        },
                    },
                    order: [["id", "DESC"]],
                    offset: offsetCount(page),
                    limit: VIDEOS_COUNT,
                });
            }
            const countItems = await Video.count();
            const currentPage = page || 1;
            const countPages = Math.ceil(countItems / VIDEOS_COUNT);
            const isLastPage = currentPage == countPages;
            const info = {
                currentPage,
                countPages,
                countItems,
                isLastPage,
                itemsOnCurrentPage: isLastPage
                    ? countItems - VIDEOS_COUNT * (countPages - 1)
                    : VIDEOS_COUNT,
            };
            return res.status(200).json({ data: blogData, info });
        } catch (e) {
            console.log(e);
            res.status(500).json(e?.message);
        }
    };
}
export default new Controller();
