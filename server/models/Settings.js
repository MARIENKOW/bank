import { sequelize } from "../services/DB.js";
import { DataTypes } from "@sequelize/core";

export const Settings = sequelize.define(
    "Settings",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        key: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        value: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        tableName: "settings",
        timestamps: false,
    }
);
