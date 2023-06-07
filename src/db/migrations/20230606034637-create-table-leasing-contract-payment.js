const {
  TABLE_LEASING_CONTRACT,
  TABLE_PAYMENT,
  TABLE_LEASING_CONTRACT_PAYMENT,
} = require('../utils/constants');
const BasicSchema = require('./basicModelDefinition');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { DataTypes } = Sequelize;

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        TABLE_LEASING_CONTRACT_PAYMENT,
        BasicSchema(DataTypes, {
          idPayment: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          idLeasingContract: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
        }),
        { transaction },
      );

      await queryInterface.addConstraint(TABLE_LEASING_CONTRACT_PAYMENT, {
        fields: ['idPayment'],
        type: 'foreign key',
        name: 'LeasingContractPayment_fk_Payment',
        references: {
          table: TABLE_PAYMENT,
          field: 'id',
        },
        transaction,
      });

      await queryInterface.addConstraint(TABLE_LEASING_CONTRACT_PAYMENT, {
        fields: ['idLeasingContract'],
        type: 'foreign key',
        name: 'LeasingContractPayment_fk_LeasingContract',
        references: {
          table: TABLE_LEASING_CONTRACT,
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
      await queryInterface.dropTable(TABLE_LEASING_CONTRACT_PAYMENT, {
        transaction,
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
