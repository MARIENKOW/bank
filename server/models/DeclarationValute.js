import { sequelize } from "../services/DB.js";
import { DataTypes } from "@sequelize/core";

export const DeclarationValute = sequelize.define(
    "DeclarationValute",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "declarationValute",
        timestamps: false,
    },
);

DeclarationValute.associate = (models) => {
    DeclarationValute.belongsTo(models.User, {
        foreignKey: {
            name: "user_id",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
    });
};
