// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, DataTypes, UUIDV4 } from 'sequelize';
import { HookReturn } from 'sequelize/types/hooks';
import sequelize from '../sequelize';
import cityModel from './city-model';
import countryModel from './country-model';

const sequelizeClient: Sequelize = sequelize;
const state = sequelizeClient.define(
  'state',
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
    country_code: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.STRING,
    },
    longitude: {
      type: DataTypes.STRING,
    },
    fk_country: {
      type: DataTypes.UUID,
    },
    deleted_at: {
      type: DataTypes.DATE,
    }
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'state',
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      },
    },
  }
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
(state as any).associate = function (models: any): void {
  // Define associations here
  // See https://sequelize.org/master/manual/assocs.html
  state.belongsTo(countryModel, { targetKey: 'id', foreignKey: 'fk_country' });
  state.hasMany(cityModel, { sourceKey: 'id', foreignKey: 'fk_state' });
};

export default state;
