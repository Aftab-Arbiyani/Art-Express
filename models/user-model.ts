// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, DataTypes, UUIDV4 } from "sequelize";
import { HookReturn } from "sequelize/types/hooks";
import sequelize from "../sequelize";

const sequelizeClient: Sequelize = sequelize;
const user = sequelizeClient.define(
  "user",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      set: function (val: string) {
        val = val.trim();
        this.setDataValue("firstName", val);
      },
    },
    middleName: {
      type: DataTypes.STRING,
      set: function (val: string) {
        val = val.trim();
        this.setDataValue("middleName", val);
      },
    },
    lastName: {
      type: DataTypes.STRING,
      set: function (val: string) {
        val = val.trim();
        this.setDataValue("lastName", val);
      },
    },
    birthDate: {
      type: DataTypes.DATE,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: "email",
        msg: "Email already in use",
      },
      validate: {
        isEmail: { msg: "You must enter a valid email" },
      },
      set: function (val: string) {
        val = val.toLowerCase().trim();
        this.setDataValue("email", val);
      },
    },
    password: {
      type: DataTypes.STRING,
    },
    googleId: {
      type: DataTypes.STRING,
    },
    profilePicture: {
      type: DataTypes.STRING,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    resetPasswordLink: {
      type: DataTypes.JSON,
    },
    loginRetryLimit: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    loginReactiveTime: {
      type: DataTypes.DATE,
    },
    blockReason: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    isBlock: {
      type: DataTypes.BOOLEAN,
    },
    status: {
      type: DataTypes.ENUM("Active", "InActive"),
      defaultValue: "Active",
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
    createdAtIp: {
      type: DataTypes.STRING,
    },
    updatedAtIp: {
      type: DataTypes.STRING,
    },
    deletedAtIp: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    tableName: "USER",
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      },
    },
  }
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
(user as any).associate = function (models: any): void {
  // Define associations here
  // See https://sequelize.org/master/manual/assocs.html
};

export default user;
