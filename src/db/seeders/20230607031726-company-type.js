const { TABLE_COMPANY_TYPE } = require('../utils/constants/migrations.const');
const {
  COMPANY_TYPE_ID_1,
  COMPANY_TYPE_REAL_STATE_COMPANY,
} = require('../utils/constants/seeders.const');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      TABLE_COMPANY_TYPE,
      [
        {
          id: COMPANY_TYPE_ID_1,
          type: COMPANY_TYPE_REAL_STATE_COMPANY,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );

    const data = (
      await queryInterface.sequelize.query(
        `select max(id) from "${TABLE_COMPANY_TYPE}"`,
      )
    )[0][0]['max'];

    // SOLUTION: Updating the index after inserting the data
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "${TABLE_COMPANY_TYPE}_id_seq" RESTART WITH ${
        parseInt(data) + 1
      }`,
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      TABLE_COMPANY_TYPE,
      {
        id: [COMPANY_TYPE_ID_1],
      },
      null,
    );
  },
};
