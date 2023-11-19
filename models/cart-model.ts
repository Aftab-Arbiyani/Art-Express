// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, DataTypes, UUIDV4 } from 'sequelize';
import { HookReturn } from 'sequelize/types/hooks';
import sequelize from '../sequelize';

const sequelizeClient: Sequelize = sequelize;
const cart = sequelizeClient.define(
  'cart',
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
      allowNull: false,
    },
    fk_user: {
      type: DataTypes.UUID,
      allowNull: false
    },
    deleted_at: {
      type: DataTypes.DATE,
    }
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    tableName: 'cart',
    hooks: {
      beforeCount(options: any): HookReturn {
        options.raw = true;
      },
    },
  }
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
(cart as any).associate = function (models: any): void {
  // Define associations here
  // See https://sequelize.org/master/manual/assocs.html
  cart.belongsTo(models.user, { targetKey: 'id', foreignKey: 'fk_user' });
  cart.hasMany(models.cartItems, { sourceKey: 'id', foreignKey: 'fk_cart' });
};

export default cart;
