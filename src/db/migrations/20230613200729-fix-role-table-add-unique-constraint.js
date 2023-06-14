const { TABLE_ROLE } = require('../utils/constants/migrations.const');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { DataTypes } = Sequelize;

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.addConstraint(TABLE_ROLE, {
        fields: ['idUserType', 'name'],
        type: 'unique',
        name: `${TABLE_ROLE}_${['idUserType', 'name'].join('_')}_key`,
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
      await queryInterface.removeConstraint(
        TABLE_ROLE,
        `${TABLE_ROLE}_${['idUserType', 'name'].join('_')}_key`,
      ),
        await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
