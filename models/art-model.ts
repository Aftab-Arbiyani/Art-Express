// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, DataTypes, UUIDV4 } from "sequelize";
import { HookReturn } from "sequelize/types/hooks";
import sequelize from "../sequelize";
import lookupModel from "./lookup-model";

const sequelizeClient: Sequelize = sequelize;
const art = sequelizeClient.define(
  "art",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
      allowNull: false,
    },
    fk_artist: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    fk_category: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    display_spot: {
      type: DataTypes.UUID
    },
    color: {
      type: DataTypes.UUID,
    },
    fk_art_medium: {
      type: DataTypes. UUID
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    height: {
      type: DataTypes.DECIMAL,
    },
    width: {
      type: DataTypes.DECIMAL
    },
    price: {
      type: DataTypes.DECIMAL,
      defaultValue: 0
    },
    tax: {
      type: DataTypes.DECIMAL,
      defaultValue: 0
    },
    discount: {
      type: DataTypes.DECIMAL,
      defaultValue: 0
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    deleted_at: {
      type: DataTypes.DATE,
    }
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: "art",
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      },
    },
  }
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
(art as any).associate = function (models: any): void {
  // Define associations here
  // See https://sequelize.org/master/manual/assocs.html
  art.belongsTo(models.category, { targetKey: 'id' , foreignKey: 'fk_category'});
  art.belongsTo(models.artists, { targetKey: 'id' , foreignKey: 'fk_artist'});
  art.belongsTo(lookupModel, { targetKey: 'id' , foreignKey: 'display_spot'});
  art.belongsTo(lookupModel, { targetKey: 'id' , foreignKey: 'color'});
  art.belongsTo(models.artMedium, { targetKey: 'id' , foreignKey: 'fk_art_medium'});
  art.hasMany(models.artImages, { sourceKey: 'id', foreignKey: 'fk_art' });
};

export default art;
