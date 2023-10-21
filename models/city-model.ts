// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, DataTypes, UUIDV4 } from 'sequelize';
import { HookReturn } from 'sequelize/types/hooks';
import sequelize from '../sequelize';
import stateModel from './state-model';

const sequelizeClient: Sequelize = sequelize;
const city = sequelizeClient.define(
  'city',
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
    country_code: {
      type: DataTypes.STRING,
    },
    state_code: {
      type: DataTypes.STRING,
    },
    latitude: {
      type: DataTypes.STRING,
    },
    longitude: {
      type: DataTypes.STRING,
    },
    fk_state: {
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
    tableName: 'city',
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      },
    },
  }
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
(city as any).associate = function (models: any): void {
  // Define associations here
  // See https://sequelize.org/master/manual/assocs.html
  city.belongsTo(stateModel, { targetKey: 'id', foreignKey: 'fk_state' });
  city.hasMany(models.userAddress, { sourceKey: 'id', foreignKey: 'fk_city' });
};

export default city;
