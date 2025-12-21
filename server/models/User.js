import { sequelize } from "../services/DB.js";
import { sql, DataTypes } from "@sequelize/core";

export const User = sequelize.define(
    "User",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        passwordHash: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        elc: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        bankNumber: {
            type: DataTypes.STRING(50),
            allowNull: true,
        },
        refreshToken: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        balance: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            get() {
                return parseFloat(this.getDataValue("balance")).toFixed(2);
            },
            defaultValue: 0,
        },
        isActivated: {
            type: DataTypes.TINYINT(1),
            allowNull: false,
            defaultValue: 1,
        },
        uuid: {
            type: DataTypes.UUID.V4,
            defaultValue: sql.uuidV4,
            allowNull: false,
        },
    },
    {
        tableName: "user",
        timestamps: false,
    }
);
