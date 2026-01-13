import { sequelize } from "../services/DB.js";
import { DataTypes } from "@sequelize/core";

export const InsuranceBody = sequelize.define(
    "InsuranceBody",
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
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "insuranceBody",
        timestamps: false,
    }
);

InsuranceBody.associate = (models) => {
    InsuranceBody.belongsTo(models.User, {
        foreignKey: {
            name: "user_id",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
    });
};
