import { sequelize } from "../services/DB.js";
import { DataTypes } from "@sequelize/core";

export const EventInsurance = sequelize.define(
    "EventInsurance",
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
        body_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        sum: {
            type: DataTypes.DECIMAL(11, 2),
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
        tableName: "eventInsurance",
        timestamps: false,
    }
);

EventInsurance.associate = (models) => {
    EventInsurance.belongsTo(models.InsuranceBody, {
        foreignKey: {
            name: "body_id",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
    });
};
