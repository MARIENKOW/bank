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
        insurance_elc: {
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

        reservedBalance: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: false,
            get() {
                return parseFloat(this.getDataValue("reservedBalance")).toFixed(
                    2,
                );
            },
            defaultValue: 0,
        },
        balance: {
            type: DataTypes.DECIMAL(15, 2),
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
        declarationMinValue: {
            type: DataTypes.DECIMAL(15, 2),
            allowNull: true,
            get() {
                const tq = parseFloat(
                    this.getDataValue("declarationMinValue"),
                ).toFixed(2);
                return isNaN(tq) ? 0.0 : tq;
            },
        },
        banker_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        banker_phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        banker_job: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        banker_whatsup: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        banker_img_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            columnName: "img_id",
        },
    },
    {
        tableName: "user",
        timestamps: false,
    },
);
User.associate = (models) => {
    User.belongsTo(models.Img, {
        foreignKey: {
            name: "img_id",
            allowNull: true,
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
        },
    });
    User.hasMany(models.Event, {
        foreignKey: {
            name: "user_id",
            // allowNull: true,
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
    });
};
