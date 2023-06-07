const { TABLE_REAL_STATE_PROPERTY_ATTACHMENT } = require('../utils/constants');
const BasicSchema = require('./basicModelDefinition');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { DataTypes } = Sequelize;

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        TABLE_REAL_STATE_PROPERTY_ATTACHMENT,
        BasicSchema(DataTypes, {
          idRealStateProperty: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          url: {
            type: DataTypes.STRING,
            allowNull: true,
          },
        }),
        { transaction },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.dropTable(TABLE_REAL_STATE_PROPERTY_ATTACHMENT, {
        transaction,
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
