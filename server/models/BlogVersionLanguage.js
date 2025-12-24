import { sequelize } from "../services/DB.js";
import { DataTypes } from "@sequelize/core";
import imgService from "../services/img-service.js";
import videoService from "../services/video-service.js";
import { Video } from "./Video.js";

export const BlogVersionLanguage = sequelize.define(
    "BlogVersionLanguage",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        img_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            columnName: "img_id",
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        blog_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            columnName: "blog_id",
        },
        locale: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "blogVersionLanguage",
        timestamps: true,
        hooks: {
            async beforeDestroy(blog, options) {
                const videos = await blog.getVideos({
                    attributes: ["id"],
                    joinTableAttributes: [],
                });

                console.log(videos);

                options.videos_id = videos.map((v) => v.id);
            },
            async afterDestroy(post, options) {
                try {
                    if (post?.img?.id) {
                        await imgService.delete(post.img.id);
                    }
                    console.log(options.videos_id);
                    for (const video_id of options.videos_id) {
                        const usedData = await Video.findOne({
                            include: [
                                {
                                    model: BlogVersionLanguage,
                                    as: "blogs",
                                    required: true,
                                },
                            ],
                            attributes: ["id"],
                            where: { id: video_id },
                            raw: true,
                        });
                        console.log(usedData);
                        if (!usedData) await videoService.delete(video_id);
                    }
                } catch (error) {
                    console.log(error);
                }
            },
        },
    }
);

BlogVersionLanguage.associate = (models) => {
    BlogVersionLanguage.belongsTo(models.Img, {
        foreignKey: {
            name: "img_id",
            allowNull: true,
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
        },
    });
    BlogVersionLanguage.belongsTo(models.Blog, {
        foreignKey: {
            name: "blog_id",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
    });
    BlogVersionLanguage.belongsToMany(models.Video, {
        through: { model: "BlogVideos", timestamps: false },
        foreignKey: "blogVersionLanguage_id",
        otherKey: "video_id",
        as: "videos",
    });
};

// Blog.hasOne(Img, { foreignKey: "blog_id", as: "img" });
