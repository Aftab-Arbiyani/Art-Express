// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, DataTypes, UUIDV4 } from "sequelize";
import { HookReturn } from "sequelize/types/hooks";
import sequelize from "../sequelize";

const sequelizeClient: Sequelize = sequelize;
const category = sequelizeClient.define(
  "category",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING
    },
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    deleted_at: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
    tableName: "category",
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      },
    },
  }
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
(category as any).associate = function (models: any): void {
  // Define associations here
  // See https://sequelize.org/master/manual/assocs.html
};

export default category;
