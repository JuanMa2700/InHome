const {
  TABLE_REAL_STATE_PROPERTY,
  TABLE_REAL_STATE_CLIENT,
  TABLE_COUNTRY,
} = require('../utils/constants');
const BasicSchema = require('./basicModelDefinition');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { DataTypes } = Sequelize;

    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        TABLE_REAL_STATE_PROPERTY,
        BasicSchema(DataTypes, {
          description: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          address: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          city: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          idRealStateClientOwner: {
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

      await queryInterface.addConstraint(TABLE_REAL_STATE_PROPERTY, {
        fields: ['idRealStateClientOwner'],
        type: 'foreign key',
        name: 'RealStateProperty_fk_RealStateClient',
        references: {
          table: TABLE_REAL_STATE_CLIENT,
          field: 'id',
        },
        transaction,
      });
      await queryInterface.addConstraint(TABLE_REAL_STATE_PROPERTY, {
        fields: ['idCountry'],
        type: 'foreign key',
        name: 'RealStateProperty_fk_Country',
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
      await queryInterface.dropTable(TABLE_REAL_STATE_PROPERTY, {
        transaction,
      });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
