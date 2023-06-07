const { TABLE_FEATURE } = require('../utils/constants/migrations.const');
const {
  FEATURE_REAL_STATE_CLIENTS,
  FEATURE_REAL_STATE_PROPERTIES,
  FEATURE_REAL_STATE_CALENDAR,
  FEATURE_REAL_STATE_PAYMENTS,
} = require('../utils/constants/seeders.const');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(TABLE_FEATURE, [
      FEATURE_REAL_STATE_CLIENTS,
      FEATURE_REAL_STATE_PROPERTIES,
      FEATURE_REAL_STATE_CALENDAR,
      FEATURE_REAL_STATE_PAYMENTS,
    ]);

    const data = (
      await queryInterface.sequelize.query(
        `select max(id) from "${TABLE_FEATURE}"`,
      )
    )[0][0]['max'];

    // SOLUTION: Updating the index after inserting the data
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "${TABLE_FEATURE}_id_seq" RESTART WITH ${
        parseInt(data) + 1
      }`,
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(TABLE_FEATURE, {
      id: [
        FEATURE_REAL_STATE_CLIENTS.id,
        FEATURE_REAL_STATE_PROPERTIES.id,
        FEATURE_REAL_STATE_CALENDAR.id,
        FEATURE_REAL_STATE_PAYMENTS.id,
      ],
    });
  },
};
