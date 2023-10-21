// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, DataTypes, UUIDV4 } from 'sequelize';
import { HookReturn } from 'sequelize/types/hooks';
import sequelize from '../sequelize';
import countryModel from './country-model';
import stateModel from './state-model';
import cityModel from './city-model';

const sequelizeClient: Sequelize = sequelize;
const userAddress = sequelizeClient.define(
  'userAddress',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    fk_user: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING
    },
    phone_number: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    zip_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fk_city: {
      type: DataTypes.UUID
    },
    fk_state: {
      type: DataTypes.UUID
    },
    fk_country: {
      type: DataTypes.UUID
    },
    address_type: {
      type: DataTypes.ENUM('House', 'Office', 'Other'),
      defaultValue: 'House'
    },
    is_default: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    deleted_at: {
      type: DataTypes.DATE,
    }
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'user_address',
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      },
    },
  }
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
(userAddress as any).associate = function (models: any): void {
  // Define associations here
  // See https://sequelize.org/master/manual/assocs.html
  userAddress.belongsTo(models.user, { foreignKey: 'fk_user', targetKey: 'id' });
  userAddress.belongsTo(countryModel, { foreignKey: 'fk_country', targetKey: 'id' });
  userAddress.belongsTo(stateModel, { foreignKey: 'fk_state', targetKey: 'id' });
  userAddress.belongsTo(cityModel, { foreignKey: 'fk_city', targetKey: 'id' });
};

export default userAddress;
