import { Model } from 'sequelize';
import BasicSchema = require('../migrations/basicModelDefinition');
import { TABLE_PAYMENT_TYPE } from '../utils/constants/migrations.const';
import { Payment } from './Payment';
import { BasicSchemaModel, ModelsType } from './types';

export interface PaymentTypeAttributes extends BasicSchemaModel {
  name: string;
  Payments: Payment[];
}

export class PaymentType extends Model implements PaymentTypeAttributes {
  name: string;
  Payments: Payment[];

  static associate = (models: ModelsType) => {
    Payment.hasMany(models.Payment, {
      foreignKey: 'idPaymentType',
    });
  };
}

export default (sequelize, DataTypes) => {
  PaymentType.init(
    BasicSchema(DataTypes, {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }),
    {
      sequelize,
      tableName: TABLE_PAYMENT_TYPE,
    },
  );
};
