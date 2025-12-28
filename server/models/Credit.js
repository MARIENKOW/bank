import { sequelize } from "../services/DB.js";
import { DataTypes } from "@sequelize/core";
import documentService from "../services/document-service.js";

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
        elc: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        time: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bank: {
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
        hooks: {
            async afterDestroy(post, options) {
                try {
                    // if (post?.document?.id) {
                    //     await documentService.delete(post?.document?.id);
                    // }
                } catch (error) {
                    console.log(error);
                }
            },
        },
    }
);

Credit.associate = (models) => {
    Credit.belongsTo(models.User, {
        foreignKey: {
            name: "user_id",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
    });
    Credit.belongsTo(models.Document, {
        foreignKey: {
            name: "document_id",
            allowNull: true,
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
        },
    });
};
