const { TABLE_COUNTRY } = require('../utils/constants/migrations.const.js');
const { COUNTRY_1 } = require('../utils/constants/seeders.const.js');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(TABLE_COUNTRY, [COUNTRY_1], {});

    const data = (
      await queryInterface.sequelize.query(
        `select max(id) from "${TABLE_COUNTRY}"`,
      )
    )[0][0]['max'];

    // SOLUTION: Updating the index after inserting the data
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "${TABLE_COUNTRY}_id_seq" RESTART WITH ${
        parseInt(data) + 1
      }`,
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      TABLE_COUNTRY,
      {
        id: [COUNTRY_1.id],
      },
      null,
    );
  },
};
