const {
  TABLE_COMPANY_ROL_PERMISSION,
  TABLE_COMPANY_PERMISSION,
  TABLE_ROLE,
} = require('../utils/constants/migrations.const');
const BasicSchema = require('./basicModelDefinition');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { DataTypes } = Sequelize;

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        TABLE_COMPANY_ROL_PERMISSION,
        BasicSchema(DataTypes, {
          idCompanyPermission: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
          },
          idRole: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
          },
        }),
        { transaction },
      );

      await queryInterface.addConstraint(TABLE_COMPANY_ROL_PERMISSION, {
        fields: ['idCompanyPermission'],
        type: 'foreign key',
        name: 'CompanyRolePermission_fk_CompanyPermission',
        references: {
          table: TABLE_COMPANY_PERMISSION,
          field: 'id',
        },
        transaction,
      });
      await queryInterface.addConstraint(TABLE_COMPANY_ROL_PERMISSION, {
        fields: ['idRole'],
        type: 'foreign key',
        name: 'CompanyRolePermission_fk_Role',
        references: {
          table: TABLE_ROLE,
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
      await queryInterface.dropTable(TABLE_COMPANY_ROL_PERMISSION, {
        transaction,
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
