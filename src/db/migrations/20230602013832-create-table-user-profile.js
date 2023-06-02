const { TABLE_USER_PROFILE, TABLE_USER } = require('../utils/constants');
const BasicSchema = require('./basicModelDefinition');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { DataTypes } = Sequelize;

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        TABLE_USER_PROFILE,
        BasicSchema(DataTypes, {
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          lastName: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          phone: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          avatar: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          idUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
        }),
        { transaction },
      );

      await queryInterface.addConstraint(TABLE_USER_PROFILE, {
        fields: ['idUser'],
        type: 'foreign key',
        name: 'UserProfile_fk_User',
        references: {
          table: TABLE_USER,
          field: 'id',
        },
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.dropTable(TABLE_USER_PROFILE, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
