import { Model } from 'sequelize';
import BasicSchema = require('../migrations/basicModelDefinition');
import { TABLE_REAL_STATE_CLIENT } from '../utils/constants/migrations.const';
import { RealStateClientType } from './RealStateClientType';
import { BasicSchemaModel, ModelsType } from './types';

export interface RealStateClientAttributes extends BasicSchemaModel {
  name: string;
  lastName: string;
  avatar: string;
  email: string;
  phone: string; 
  address: string;
  idRealStatePropertyAttachment: number;
  RealStateClientType?: RealStateClientType; 
}

export class RealStateClient extends Model implements RealStateClientAttributes {
  name: string;
  lastName: string;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
  avatar: string;
  email: string;
  phone: string; 
  address: string;
  idRealStatePropertyAttachment: number;
  RealStateClientType?: RealStateClientType;

  static associate = (models: ModelsType) => {
    RealStateClient.belongsTo(models.RealStateClientType, {
      foreignKey: 'idRealStateClientType',
    });
  };
}

export default (sequelize, DataTypes) => {
  RealStateClient.init(
    BasicSchema(DataTypes, {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idRealStateClientType: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    }),
    {
      sequelize,
      tableName: TABLE_REAL_STATE_CLIENT,
    },
  );
};
