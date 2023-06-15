const { TABLE_PAYMENT_TYPE } = require('../utils/constants/migrations.const');
const { PAYMENT_TYPE_1 } = require('../utils/constants/seeders.const');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(TABLE_PAYMENT_TYPE, [PAYMENT_TYPE_1]);

    const data = (
      await queryInterface.sequelize.query(
        `select max(id) from "${TABLE_PAYMENT_TYPE}"`,
      )
    )[0][0]['max'];

    // SOLUTION: Updating the index after inserting the data
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "${TABLE_PAYMENT_TYPE}_id_seq" RESTART WITH ${
        parseInt(data) + 1
      }`,
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(TABLE_PAYMENT_TYPE, {
      id: [PAYMENT_TYPE_1.id],
    });
  },
};
