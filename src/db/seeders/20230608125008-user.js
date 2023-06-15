const { TABLE_USER } = require('../utils/constants/migrations.const');
const { USER_1 } = require('../utils/constants/seeders.const');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(TABLE_USER, [USER_1]);

    const data = (
      await queryInterface.sequelize.query(
        `select max(id) from "${TABLE_USER}"`,
      )
    )[0][0]['max'];

    // SOLUTION: Updating the index after inserting the data
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "${TABLE_USER}_id_seq" RESTART WITH ${
        parseInt(data) + 1
      }`,
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(TABLE_USER, {
      id: [USER_1.id],
    });
  },
};
