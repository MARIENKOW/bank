import { sequelize } from "../services/DB.js";
import { DataTypes } from "@sequelize/core";

export const Insurance = sequelize.define(
    "Insurance",
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
            type: DataTypes.TINYINT(1),
            allowNull: false,
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
        tableName: "insurance",
        timestamps: false,
    }
);

Insurance.associate = (models) => {
    Insurance.belongsTo(models.User, {
        foreignKey: {
            name: "user_id",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
    });
};
