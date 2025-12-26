import { sequelize } from "../services/DB.js";
import { DataTypes } from "@sequelize/core";

export const Credit = sequelize.define(
    "Credit",
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
        status: {
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
        document_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        tableName: "credit",
        timestamps: false,
    }
);

Event.associate = (models) => {
    Event.belongsTo(models.User, {
        foreignKey: {
            name: "user_id",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
    });
    Event.belongsTo(models.Document, {
        foreignKey: {
            name: "document_id",
            allowNull: true,
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
        },
    });
};
