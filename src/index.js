const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { Sequelize, DataTypes, Model, Op } = require('sequelize');
const config = require('./db/config');
const BasicSchema = require('./db/migrations/basicModelDefinition');
const {
  TABLE_PAYMENT_TYPE,
  TABLE_PAYMENT,
} = require('./db/utils/constants/migrations.const');

(async () => {
  try {
    const stageDBConfig = config[process.env.NODE_ENV];

    const sequelize = new Sequelize(stageDBConfig);

    class PaymentType extends Model {}

    PaymentType.init(
      BasicSchema(DataTypes, {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
      }),
      {
        sequelize,
        tableName: TABLE_PAYMENT_TYPE,
      },
    );

    // the defined model is the class itself
    // console.log(PaymentType === sequelize.models.PaymentType); // true
    // const user = await PaymentType.findByPk(USER_TYPE_ID_1, { logging: console.log });

    class Payment extends Model {}

    Payment.init(
      BasicSchema(DataTypes, {
        date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        amount: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        accountOrigin: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        accountDestination: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        idPaymentType: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        reference: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        attachmentUrl: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      }),
      {
        sequelize,
        tableName: TABLE_PAYMENT,
      },
    );

    PaymentType.hasMany(Payment, { foreignKey: 'idPaymentType' });
    Payment.belongsTo(PaymentType, { foreignKey: 'idPaymentType' });

    const paymentType = await PaymentType.findByPk(1, {
      include: [{ model: Payment }],
    });
    // const payments = await paymentType.getPayments({ where: { id: 2 } });

    console.log(JSON.stringify({ paymentType }, null, 2));
  } catch (e) {
    console.log('error', e);
  }
  // `text` is not available here
})();
