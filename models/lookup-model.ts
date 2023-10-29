// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, DataTypes, UUIDV4 } from 'sequelize';
import { HookReturn } from 'sequelize/types/hooks';
import sequelize from '../sequelize';

const sequelizeClient: Sequelize = sequelize;
const lookup = sequelizeClient.define(
  'lookup',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
      allowNull: false,
    },
    label: {
      type: DataTypes.STRING
    },
    key: {
      type: DataTypes.STRING
    },
    value: {
      type: DataTypes.STRING
    },
    parent_id: {
      type: DataTypes.UUID
    },
    icon_path: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.ENUM('Active', 'InActive'),
      defaultValue: 'Active',
    },
    deleted_at: {
      type: DataTypes.DATE,
    }
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'lookup',
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      },
    },
  }
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
(lookup as any).associate = function (models: any): void {
  // Define associations here
  // See https://sequelize.org/master/manual/assocs.html
  lookup.hasMany(models.art, { sourceKey: 'id', foreignKey: 'display_spot' });
  lookup.hasMany(models.art, { sourceKey: 'id', foreignKey: 'color' });
};

export default lookup;
