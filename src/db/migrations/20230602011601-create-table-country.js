const { TABLE_COUNTRY } = require('../utils/constants/migrations.const');
const BasicSchema = require('./basicModelDefinition');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { DataTypes } = Sequelize;

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        TABLE_COUNTRY,
        BasicSchema(DataTypes, {
          name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          companyIdentificationType: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          personalIdentificationType: {
            type: DataTypes.STRING,
            allowNull: false,
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
      await queryInterface.dropTable(TABLE_COUNTRY, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
