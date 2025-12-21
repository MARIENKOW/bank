import { sequelize } from "../services/DB.js";
import  { DataTypes } from "@sequelize/core";

export const Access = sequelize.define(
    "Access",
    {
        // Model attributes are defined here
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        token: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    },
    {
        tableName: "Access",
        timestamps: false,
    }
);
