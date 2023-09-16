// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, DataTypes, UUIDV4 } from "sequelize";
import { HookReturn } from "sequelize/types/hooks";
import sequelize from "../sequelize";

const sequelizeClient: Sequelize = sequelize;
const userToken = sequelizeClient.define(
  "userToken",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
      allowNull: false,
    },
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
    deleted_at: {
      type: DataTypes.DATE
    }
  },
  {
    timestamps: true,
    tableName: "user_token",
    createdAt: "created_at",
    updatedAt: "updated_at",
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
  userToken.belongsTo(models.user, { foreignKey: 'fk_user', targetKey: 'id' });
  userToken.belongsTo(models.artists, { foreignKey: 'fk_artist', targetKey: 'id' });
};

export default userToken;
