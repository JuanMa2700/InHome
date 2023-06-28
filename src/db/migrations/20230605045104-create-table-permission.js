const {
  TABLE_PERMISSION,
  TABLE_USER_TYPE,
  TABLE_FEATURE,
} = require('../utils/constants/migrations.const');
const BasicSchema = require('./basicModelDefinition');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { DataTypes } = Sequelize;

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        TABLE_PERMISSION,
        BasicSchema(DataTypes, {
          key: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
          },
          idUserType: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
          },
          idRequiredFeature: {
            type: DataTypes.INTEGER,
            allowNull: true,
          },
        }),
        { transaction },
      );

      await queryInterface.addConstraint(TABLE_PERMISSION, {
        fields: ['idUserType'],
        type: 'foreign key',
        name: 'Permission_fk_UserType',
        references: {
          table: TABLE_USER_TYPE,
          field: 'id',
        },
        transaction,
      });
      await queryInterface.addConstraint(TABLE_PERMISSION, {
        fields: ['idRequiredFeature'],
        type: 'foreign key',
        name: 'Permission_fk_Feature',
        references: {
          table: TABLE_FEATURE,
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
      await queryInterface.dropTable(TABLE_PERMISSION, {
        transaction,
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
