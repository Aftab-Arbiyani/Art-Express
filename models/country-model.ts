// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, DataTypes, UUIDV4 } from 'sequelize';
import { HookReturn } from 'sequelize/types/hooks';
import sequelize from '../sequelize';
import stateModel from './state-model';

const sequelizeClient: Sequelize = sequelize;
const country = sequelizeClient.define(
  'country',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
    },
    iso_code: {
      type: DataTypes.STRING,
    },
    flag: {
      type: DataTypes.STRING,
    },
    phone_code: {
      type: DataTypes.STRING,
    },
    currency: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.STRING,
    },
    longitude: {
      type: DataTypes.STRING,
    },
    deleted_at: {
      type: DataTypes.DATE,
    }
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'country',
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      },
    },
  }
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
(country as any).associate = function (models: any): void {
  // Define associations here
  // See https://sequelize.org/master/manual/assocs.html
  country.hasMany(stateModel, { sourceKey: 'id', foreignKey: 'fk_country' });
  country.hasMany(models.userAddress, { sourceKey: 'id', foreignKey: 'fk_country' });
};

export default country;
