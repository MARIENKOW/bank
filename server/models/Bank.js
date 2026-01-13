import { sequelize } from "../services/DB.js";
import { DataTypes } from "@sequelize/core";

export const Bank = sequelize.define(
    "Bank",
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
        elc: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        limit: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "bank",
        timestamps: false,
    }
);

Bank.associate = (models) => {
    Bank.belongsTo(models.User, {
        foreignKey: {
            name: "user_id",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
    });
};
