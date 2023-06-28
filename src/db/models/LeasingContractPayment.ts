import { Model } from 'sequelize';
import BasicSchema = require('../migrations/basicModelDefinition');
import { TABLE_LEASING_CONTRACT_PAYMENT } from '../utils/constants/migrations.const';
import { LeasingContract } from './LeasingContract';
import { Payment } from './Payment';
import { BasicSchemaModel, ModelsType } from './types';

export interface LeasingContractPaymentAttributes extends BasicSchemaModel {
  idLeasingContract: number;
  LeasingContract?: LeasingContract; 
  idPayment: number;
  Payment?: Payment; 
}

export class LeasingContractPayment extends Model implements LeasingContractPaymentAttributes {
  idLeasingContract: number;
  LeasingContract?: LeasingContract; 
  idPayment: number;
  Payment?: Payment; 

  static associate = (models: ModelsType) => {
    LeasingContractPayment.belongsTo(models.LeasingContract, {
      foreignKey: 'idLeasingContract',
    });
    LeasingContractPayment.belongsTo(models.Payment, {
      foreignKey: 'idPayment',
    });
  };
}

export default (sequelize, DataTypes) => {
  LeasingContractPayment.init(
    BasicSchema(DataTypes, {
      idLeasingContract: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idPayment: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    }),
    {
      sequelize,
      tableName: TABLE_LEASING_CONTRACT_PAYMENT,
    },
  );
};
