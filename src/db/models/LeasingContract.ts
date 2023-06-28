import { Model } from 'sequelize';
import BasicSchema = require('../migrations/basicModelDefinition');
import { TABLE_LEASING_CONTRACT } from '../utils/constants/migrations.const';
import { RealStateClient } from './RealStateClient';
import { RealStateProperty } from './RealStateProperty';
import { LeasingContractPayment } from './LeasingContractPayment';
import { BasicSchemaModel, ModelsType } from './types';

export interface LeasingContractAttributes extends BasicSchemaModel {
  startDate: Date;
  dueDate: Date;
  paymentCutOff: number;  
  paymentAmount: number;  
  contractUrl: string;
  idRealStateTenant: number;
  idRealStateProperty: number;
  RealStateClient?: RealStateClient;
  RealStateProperty?: RealStateProperty;
  LeasingContractPayments?: LeasingContractPayment[];
}

export class LeasingContract extends Model implements LeasingContractAttributes {
  startDate: Date;
  dueDate: Date;
  paymentCutOff: number;  
  paymentAmount: number;  
  contractUrl: string;
  idRealStateTenant: number;
  idRealStateProperty: number;
  RealStateClient?: RealStateClient;
  RealStateProperty?: RealStateProperty;
  LeasingContractPayments?: LeasingContractPayment[];


  static associate = (models: ModelsType) => {
    LeasingContract.belongsTo(models.RealStateClient, {
      foreignKey: 'idRealStateTenant',
    });
    LeasingContract.belongsTo(models.RealStateProperty, {
      foreignKey: 'idRealStateProperty',
    });
    LeasingContract.hasMany(models.LeasingContractPayment, {
      foreignKey: 'idLeasingContract',
    });
  };
}

export default (sequelize, DataTypes) => {
  LeasingContract.init(
    BasicSchema(DataTypes, {
      startDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      paymentCutOff: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      paymentAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      contractUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      idRealStateTenant: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idRealStateProperty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }),
    {
      sequelize,
      tableName: TABLE_LEASING_CONTRACT,
    },
  );
};
