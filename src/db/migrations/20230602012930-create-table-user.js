const {
  TABLE_USER,
  TABLE_ROLE,
  TABLE_COMPANY,
} = require('../utils/constants/migrations.const');
const BasicSchema = require('./basicModelDefinition');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { DataTypes } = Sequelize;

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        TABLE_USER,
        BasicSchema(DataTypes, {
          username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          idRole: {
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

      await queryInterface.addConstraint(TABLE_USER, {
        fields: ['idRole'],
        type: 'foreign key',
        name: 'User_fk_Role',
        references: {
          table: TABLE_ROLE,
          field: 'id',
        },
        transaction,
      });

      await queryInterface.addConstraint(TABLE_USER, {
        fields: ['idCompany'],
        type: 'foreign key',
        name: 'User_fk_Company',
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
      await queryInterface.dropTable(TABLE_USER, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
