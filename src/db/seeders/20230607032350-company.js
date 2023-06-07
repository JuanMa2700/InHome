const { TABLE_COMPANY } = require('../utils/constants/migrations.const');
const { COMPANY_1_SEED } = require('../utils/constants/seeders.const');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(TABLE_COMPANY, [COMPANY_1_SEED]);

    const data = (
      await queryInterface.sequelize.query(
        `select max(id) from "${TABLE_COMPANY}"`,
      )
    )[0][0]['max'];

    // SOLUTION: Updating the index after inserting the data
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "${TABLE_COMPANY}_id_seq" RESTART WITH ${
        parseInt(data) + 1
      }`,
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(TABLE_COMPANY, {
      id: [COMPANY_1_SEED.id],
    });
  },
};
