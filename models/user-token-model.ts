// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, DataTypes, UUIDV4 } from "sequelize";
import { HookReturn } from "sequelize/types/hooks";
import sequelize from "../sequelize";

const sequelizeClient: Sequelize = sequelize;
const userToken = sequelizeClient.define(
  "userToken",
  {
    fk_user: {
      type: DataTypes.UUID,
    },
    token: {
      type: DataTypes.STRING,
    },
    ip: {
      type: DataTypes.STRING,
    },
    device: {
      type: DataTypes.STRING,
    },
    deletedAt: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  },
  {
    timestamps: true,
    tableName: "USER_TOKEN",
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      },
    },
  }
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
(userToken as any).associate = function (models: any): void {
  // Define associations here
  // See https://sequelize.org/master/manual/assocs.html
};

export default userToken;
