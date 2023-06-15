import { Model } from 'sequelize';
import BasicSchema = require('../migrations/basicModelDefinition');
import { TABLE_PAYMENT } from '../utils/constants/migrations.const';
import { PaymentType } from './PaymentType';
import { BasicSchemaModel, ModelsType } from './types';

export interface PaymentAttributes extends BasicSchemaModel {
  date: string;
  amount: number;
  accountOrigin: string;
  accountDestination: string;
  idPaymentType: number;
  reference: string;
  attachmentUrl?: string;
  PaymentType?: PaymentType;
}

export class Payment extends Model implements PaymentAttributes {
  date: string;
  amount: number;
  accountOrigin: string;
  accountDestination: string;
  idPaymentType: number;
  reference: string;
  attachmentUrl?: string;
  PaymentType?: PaymentType;

  static associate = (models: ModelsType) => {
    Payment.belongsTo(models.PaymentType, {
      foreignKey: 'idPaymentType',
    });
  };
}

export default (sequelize, DataTypes) => {
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
};
