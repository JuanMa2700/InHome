const { TABLE_ROLE } = require('../utils/constants/migrations.const');
const {
  ROLE_1,
  ROLE_2,
  ROLE_3,
  ROLE_4,
  ROLE_5,
} = require('../utils/constants/seeders.const');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(TABLE_ROLE, [
      ROLE_1,
      ROLE_2,
      ROLE_3,
      ROLE_4,
      ROLE_5,
    ]);

    const data = (
      await queryInterface.sequelize.query(
        `select max(id) from "${TABLE_ROLE}"`,
      )
    )[0][0]['max'];

    // SOLUTION: Updating the index after inserting the data
    await queryInterface.sequelize.query(
      `ALTER SEQUENCE "${TABLE_ROLE}_id_seq" RESTART WITH ${
        parseInt(data) + 1
      }`,
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(TABLE_ROLE, {
      id: [ROLE_1.id, ROLE_2.id, ROLE_3.id, ROLE_4.id, ROLE_5.id],
    });
  },
};
