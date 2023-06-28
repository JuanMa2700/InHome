const {
  TABLE_COMPANY_PERMISSION,
  TABLE_PERMISSION,
  TABLE_COMPANY,
} = require('../utils/constants/migrations.const');
const BasicSchema = require('./basicModelDefinition');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { DataTypes } = Sequelize;

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        TABLE_COMPANY_PERMISSION,
        BasicSchema(DataTypes, {
          idPermission: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
          },
          idCompany: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
          },
        }),
        { transaction },
      );

      await queryInterface.addConstraint(TABLE_COMPANY_PERMISSION, {
        fields: ['idPermission'],
        type: 'foreign key',
        name: 'CompanyPermission_fk_Permission',
        references: {
          table: TABLE_PERMISSION,
          field: 'id',
        },
        transaction,
      });
      await queryInterface.addConstraint(TABLE_COMPANY_PERMISSION, {
        fields: ['idCompany'],
        type: 'foreign key',
        name: 'CompanyPermission_fk_Company',
        references: {
          table: TABLE_COMPANY,
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
      await queryInterface.dropTable(TABLE_COMPANY_PERMISSION, {
        transaction,
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
