const { TABLE_PAYMENT_TYPE, TABLE_PAYMENT } = require('../utils/constants');
const BasicSchema = require('./basicModelDefinition');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { DataTypes } = Sequelize;

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        TABLE_PAYMENT,
        BasicSchema(DataTypes, {
          date: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          accountOrigin: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          accountDestination: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          idPaymentType: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          reference: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          attachmentUrl: {
            type: DataTypes.STRING,
            allowNull: true,
          },
        }),
        { transaction },
      );

      await queryInterface.addConstraint(TABLE_PAYMENT, {
        fields: ['idPaymentType'],
        type: 'foreign key',
        name: 'Payment_fk_PaymentType',
        references: {
          table: TABLE_PAYMENT_TYPE,
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
      await queryInterface.dropTable(TABLE_PAYMENT, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
