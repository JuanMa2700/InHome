const { TABLE_USER_PROFILE } = require('../utils/constants/migrations.const');
const { USER_PROFILE_1 } = require('../utils/constants/seeders.const');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(TABLE_USER_PROFILE, [USER_PROFILE_1]);

    const data = (
      await queryInterface.sequelize.query(
        `select max(id) from "${TABLE_USER_PROFILE}"`,
      )
    )[0][0]['max'];

    // SOLUTION: Updating the index after inserting the data
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "${TABLE_USER_PROFILE}_id_seq" RESTART WITH ${
        parseInt(data) + 1
      }`,
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(TABLE_USER_PROFILE, {
      id: [USER_PROFILE_1.id],
    });
  },
};
