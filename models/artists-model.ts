// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, DataTypes, UUIDV4 } from "sequelize";
import { HookReturn } from "sequelize/types/hooks";
import sequelize from "../sequelize";
import otpModel from "./otp-model";

const sequelizeClient: Sequelize = sequelize;
const artists = sequelizeClient.define(
  "artists",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      set: function (val: string) {
        val = val.trim();
        this.setDataValue("first_name", val);
      },
    },
    last_name: {
      type: DataTypes.STRING,
      set: function (val: string) {
        val = val.trim();
        this.setDataValue("last_name", val);
      },
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
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    google_id: {
      type: DataTypes.STRING,
    },
    profile_picture: {
      type: DataTypes.STRING,
    },
    make_custom_art: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    deleted_at: {
      type: DataTypes.DATE
    }
  },
  {
    timestamps: true,
    tableName: "artists",
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
(artists as any).associate = function (models: any): void {
  // Define associations here
  // See https://sequelize.org/master/manual/assocs.html
  artists.hasMany(models.userToken, { sourceKey: 'id', foreignKey: 'fk_artist' });
  artists.hasMany(otpModel, { sourceKey: 'id', foreignKey: 'fk_artist' });
  artists.hasMany(models.art, { sourceKey: 'id', foreignKey: 'fk_artist'});
};

export default artists;
