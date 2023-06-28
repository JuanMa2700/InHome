const {
  TABLE_REAL_STATE_CLIENT_TYPE,
} = require('../utils/constants/migrations.const');
const {
  REAL_STATE_CLIENT_TYPE_1,
  REAL_STATE_CLIENT_TYPE_2,
  REAL_STATE_CLIENT_TYPE_3,
  REAL_STATE_CLIENT_TYPE_4,
} = require('../utils/constants/seeders.const');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(TABLE_REAL_STATE_CLIENT_TYPE, [
      REAL_STATE_CLIENT_TYPE_1,
      REAL_STATE_CLIENT_TYPE_2,
      REAL_STATE_CLIENT_TYPE_3,
      REAL_STATE_CLIENT_TYPE_4,
    ]);

    const data = (
      await queryInterface.sequelize.query(
        `select max(id) from "${TABLE_REAL_STATE_CLIENT_TYPE}"`,
      )
    )[0][0]['max'];

    // SOLUTION: Updating the index after inserting the data
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "${TABLE_REAL_STATE_CLIENT_TYPE}_id_seq" RESTART WITH ${
        parseInt(data) + 1
      }`,
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(TABLE_REAL_STATE_CLIENT_TYPE, {
      id: [
        REAL_STATE_CLIENT_TYPE_1.id,
        REAL_STATE_CLIENT_TYPE_2.id,
        REAL_STATE_CLIENT_TYPE_3.id,
        REAL_STATE_CLIENT_TYPE_4.id,
      ],
    });
  },
};
