import { sequelize } from "../services/DB.js";
import { DataTypes } from "@sequelize/core";
import documentService from "../services/document-service.js";

export const UserDocument = sequelize.define(
    "UserDocument",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        document_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        img_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        tableName: "userDocument",
        timestamps: false,
    }
);

UserDocument.associate = (models) => {
    UserDocument.belongsTo(models.User, {
        foreignKey: {
            name: "user_id",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
    });
    UserDocument.belongsTo(models.Document, {
        foreignKey: {
            name: "document_id",
            allowNull: true,
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
        },
    });
    UserDocument.belongsTo(models.Img, {
        foreignKey: {
            name: "img_id",
            allowNull: true,
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
        },
    });
};
