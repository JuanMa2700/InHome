const {
  TABLE_REAL_STATE_CLIENT,
  TABLE_REAL_STATE_PROPERTY,
  TABLE_LEASING_CONTRACT,
} = require('../utils/constants');
const BasicSchema = require('./basicModelDefinition');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { DataTypes } = Sequelize;

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        TABLE_LEASING_CONTRACT,
        BasicSchema(DataTypes, {
          startDate: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          dueDate: {
            type: DataTypes.DATE,
            allowNull: false,
          },
          idRealStateTenant: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          paymentCutOff: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          paymentAmount: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          idRealStateProperty: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          contractUrl: {
            type: DataTypes.STRING,
            allowNull: true,
          },
        }),
        { transaction },
      );

      await queryInterface.addConstraint(TABLE_LEASING_CONTRACT, {
        fields: ['idRealStateTenant'],
        type: 'foreign key',
        name: 'LeasingContract_fk_RealStateClient',
        references: {
          table: TABLE_REAL_STATE_CLIENT,
          field: 'id',
        },
        transaction,
      });

      await queryInterface.addConstraint(TABLE_LEASING_CONTRACT, {
        fields: ['idRealStateProperty'],
        type: 'foreign key',
        name: 'LeasingContract_fk_RealStateProperty',
        references: {
          table: TABLE_REAL_STATE_PROPERTY,
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
      await queryInterface.dropTable(TABLE_LEASING_CONTRACT, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
