const { TABLE_USER_TYPE } = require('../utils/constants/migrations.const');
const {
  USER_TYPE_ID_1,
  USER_TYPE_REAL_STATE_EMPLOYEE,
  USER_TYPE_ID_2,
  USER_TYPE_REAL_STATE_CLIENT,
} = require('../utils/constants/seeders.const');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      TABLE_USER_TYPE,
      [
        {
          id: USER_TYPE_ID_1,
          type: USER_TYPE_REAL_STATE_EMPLOYEE,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: USER_TYPE_ID_2,
          type: USER_TYPE_REAL_STATE_CLIENT,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );

    const data = (
      await queryInterface.sequelize.query(
        `select max(id) from "${TABLE_USER_TYPE}"`,
      )
    )[0][0]['max'];

    // SOLUTION: Updating the index after inserting the data
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "${TABLE_USER_TYPE}_id_seq" RESTART WITH ${
        parseInt(data) + 1
      }`,
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      TABLE_USER_TYPE,
      {
        id: [USER_TYPE_ID_1, USER_TYPE_ID_2],
      },
      null,
    );
  },
};
