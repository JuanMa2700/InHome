const {
  TABLE_ROLE,
  TABLE_USER_TYPE,
  TABLE_COMPANY,
} = require('../utils/constants');
const BasicSchema = require('./basicModelDefinition');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { DataTypes } = Sequelize;

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        TABLE_ROLE,
        BasicSchema(DataTypes, {
          name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          idUserType: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          idCompany: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
        }),
        { transaction },
      );

      await queryInterface.addConstraint(TABLE_ROLE, {
        fields: ['idUserType'],
        type: 'foreign key',
        name: 'Role_fk_UserType',
        references: {
          table: TABLE_USER_TYPE,
          field: 'id',
        },
        transaction,
      });

      await queryInterface.addConstraint(TABLE_ROLE, {
        fields: ['idCompany'],
        type: 'foreign key',
        name: 'Role_fk_Company',
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
      await queryInterface.dropTable(TABLE_ROLE, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
