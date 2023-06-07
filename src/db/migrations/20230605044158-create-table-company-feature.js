const {
  TABLE_COMPANY_FEATURE,
  TABLE_FEATURE,
  TABLE_COMPANY,
} = require('../utils/constants/migrations.const');
const BasicSchema = require('./basicModelDefinition');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { DataTypes } = Sequelize;

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        TABLE_COMPANY_FEATURE,
        BasicSchema(DataTypes, {
          idFeature: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
          },
          idCompany: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
        }),
        { transaction },
      );

      await queryInterface.addConstraint(TABLE_COMPANY_FEATURE, {
        fields: ['idFeature'],
        type: 'foreign key',
        name: 'CompanyFeature_fk_Feature',
        references: {
          table: TABLE_FEATURE,
          field: 'id',
        },
        transaction,
      });
      await queryInterface.addConstraint(TABLE_COMPANY_FEATURE, {
        fields: ['idCompany'],
        type: 'foreign key',
        name: 'CompanyFeature_fk_Company',
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
      await queryInterface.dropTable(TABLE_COMPANY_FEATURE, {
        transaction,
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
