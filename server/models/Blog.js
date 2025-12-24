import { sequelize } from "../services/DB.js";
import { DataTypes } from "@sequelize/core";
import imgService from "../services/img-service.js";
import videoService from "../services/video-service.js";
import { Video } from "./Video.js";

export const Blog = sequelize.define(
    "Blog",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        is_main: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        is_important: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        is_short: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        tableName: "blog",
        timestamps: true,
    }
);

Blog.associate = (models) => {
    Blog.hasMany(models.BlogVersionLanguage, {
        foreignKey: {
            name: "blog_id",
            // allowNull: true,
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
    });
};

// Blog.hasOne(Img, { foreignKey: "blog_id", as: "img" });
