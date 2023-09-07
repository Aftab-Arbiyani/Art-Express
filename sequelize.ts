import { Sequelize }  from 'sequelize';

const sequelize = new Sequelize(process.env.CONNECTION_STRING, {
    dialect: 'postgres',
    logging: false,
});

export default sequelize;
