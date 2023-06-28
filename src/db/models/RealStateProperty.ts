import { Model } from 'sequelize';
import BasicSchema = require('../migrations/basicModelDefinition');
import { TABLE_REAL_STATE_PROPERTY } from '../utils/constants/migrations.const';
import { RealStateClient } from './RealStateClient';
import { RealStatePropertyAttachment } from './RealStatePropertyAttachment';
import { LeasingContract } from './LeasingContract';
import { Country } from './Country';
import { BasicSchemaModel, ModelsType } from './types';

export interface RealStatePropertyAttributes extends BasicSchemaModel {
  description: string;
  address: string;
  city: string;
  idRealStateClientOwner: number;
  idCountry: number;
  RealStateClient?: RealStateClient;
  Country?: Country;
  RealStatePropertyAttachments?: RealStatePropertyAttachment[];
  LeasingContracts?: LeasingContract[];
}

export class RealStateProperty extends Model implements RealStatePropertyAttributes {
  description: string;
  address: string;
  city: string;
  idRealStateClientOwner: number;
  idCountry: number;
  RealStateClient?: RealStateClient;
  Country?: Country;
  RealStatePropertyAttachments?: RealStatePropertyAttachment[];
  LeasingContracts?: LeasingContract[];

  static associate = (models: ModelsType) => {
    RealStateProperty.belongsTo(models.RealStateClient, {
      foreignKey: 'idRealStateClientOwner',
    });
    RealStateProperty.belongsTo(models.Country, {
      foreignKey: 'idCountry',
    });
    RealStateProperty.hasMany(models.RealStatePropertyAttachment, {
      foreignKey: 'idRealStateProperty',
    });
    RealStateProperty.hasMany(models.LeasingContract, {
      foreignKey: 'idRealStateProperty',
    });
  };
}

export default (sequelize, DataTypes) => {
  RealStateProperty.init(
    BasicSchema(DataTypes, {
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idRealStateClientOwner: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idCountry: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }),
    {
      sequelize,
      tableName: TABLE_REAL_STATE_PROPERTY,
    },
  );
};
