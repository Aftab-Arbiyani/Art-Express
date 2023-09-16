// See https://sequelize.org/master/manual/model-basics.html
// for more of what you can do here.
import { Sequelize, DataTypes, UUIDV4 } from 'sequelize';
import { HookReturn } from 'sequelize/types/hooks';
import sequelize from '../sequelize';

const sequelizeClient: Sequelize = sequelize;
const otp = sequelizeClient.define(
    'otp',
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
        fk_artist: {
            type: DataTypes.UUID,
        },
        otp: {
            type: DataTypes.INTEGER
        },
        otp_type: {
            type: DataTypes.ENUM('sign_up', 'login', 'forgot_password')
        },
        is_verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        deleted_at: {
            type: DataTypes.DATE,
            defaultValue: null,
        },
    },
    {
        timestamps: true,
        tableName: 'otp',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        hooks: {
            beforeCount(options: any): HookReturn {
                options.raw = true;
            },
        },
    }
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
(otp as any).associate = function (models: any): void {
    // Define associations here
    // See https://sequelize.org/master/manual/assocs.html
    otp.belongsTo(models.user, { foreignKey: 'fk_user', targetKey: 'id' });
    otp.belongsTo(models.artists, { foreignKey: 'fk_artist', targetKey: 'id' });
};

export default otp;
