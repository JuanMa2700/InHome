const {
  TABLE_COMPANY,
  TABLE_COMPANY_TYPE,
  TABLE_COUNTRY,
} = require('../utils/constants');
const BasicSchema = require('./basicModelDefinition');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { DataTypes } = Sequelize;

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        TABLE_COMPANY,
        BasicSchema(DataTypes, {
          name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          domain: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          idCompanyType: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          idCountry: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
        }),
        { transaction },
      );

      await queryInterface.addConstraint(TABLE_COMPANY, {
        fields: ['idCompanyType'],
        type: 'foreign key',
        name: 'Company_fk_CompanyType',
        references: {
          table: TABLE_COMPANY_TYPE,
          field: 'id',
        },
        transaction,
      });

      await queryInterface.addConstraint(TABLE_COMPANY, {
        fields: ['idCountry'],
        type: 'foreign key',
        name: 'Company_fk_Country',
        references: {
          table: TABLE_COUNTRY,
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
      await queryInterface.dropTable(TABLE_COMPANY, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
