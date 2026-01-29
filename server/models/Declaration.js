import { sequelize } from "../services/DB.js";
import { DataTypes } from "@sequelize/core";

export const Declaration = sequelize.define(
    "Declaration",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        minValue: {
            type: DataTypes.DECIMAL(11, 2),
            allowNull: false,
            get() {
                return parseFloat(this.getDataValue("sum")).toFixed(2);
            },
        },
    },
    {
        tableName: "declaration",
        timestamps: false,
    },
);

Declaration.associate = (models) => {
    Declaration.belongsTo(models.User, {
        foreignKey: {
            name: "user_id",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
    });
};
