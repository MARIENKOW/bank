import { sequelize } from "../services/DB.js";
import { DataTypes } from "@sequelize/core";

export const Event = sequelize.define(
    "Event",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        increment: {
            type: DataTypes.TINYINT(1),
            allowNull: false,
            defaultValue: 1,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        sum: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            get() {
                return parseFloat(this.getDataValue("sum")).toFixed(2);
            },
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: sequelize.fn("CURDATE"),
        },
    },
    {
        tableName: "event",
        timestamps: false,
    }
);
