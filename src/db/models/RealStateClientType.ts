import { Model } from 'sequelize';
import BasicSchema = require('../migrations/basicModelDefinition');
import { TABLE_REAL_STATE_CLIENT_TYPE } from '../utils/constants/migrations.const';
import { RealStateClient } from './RealStateClient';
import { BasicSchemaModel, ModelsType } from './types';

export interface RealStateClientTypeAttributes extends BasicSchemaModel {
  name: string;
  RealStateClients?: RealStateClient[];
}

export class RealStateClientType extends Model implements RealStateClientTypeAttributes {
  name: string;
  RealStateClients?: RealStateClient[];

  static associate = (models: ModelsType) => {
    RealStateClientType.hasMany(models.RealStateClient, {
      foreignKey: 'idRealStateClientType',
    });
  };
}

export default (sequelize, DataTypes) => {
  RealStateClientType.init(
    BasicSchema(DataTypes, {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }),
    {
      sequelize,
      tableName: TABLE_REAL_STATE_CLIENT_TYPE,
    },
  );
};
