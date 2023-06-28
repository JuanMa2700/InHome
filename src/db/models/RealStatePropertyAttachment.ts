import { Model } from 'sequelize';
import BasicSchema = require('../migrations/basicModelDefinition');
import { TABLE_REAL_STATE_PROPERTY_ATTACHMENT } from '../utils/constants/migrations.const';
import { RealStateProperty } from './RealStateProperty';
import { BasicSchemaModel, ModelsType } from './types';

export interface RealStatePropertyAttachmentAttributes extends BasicSchemaModel {
  url: string;
  idRealStateProperty: number;
  RealStateProperty?: RealStateProperty; 
}

export class RealStatePropertyAttachment extends Model implements RealStatePropertyAttachmentAttributes {
  url: string;
  idRealStateProperty: number;
  RealStateProperty?: RealStateProperty;

  static associate = (models: ModelsType) => {
    RealStatePropertyAttachment.belongsTo(models.RealStateProperty, {
      foreignKey: 'idRealStateProperty',
    });
  };
}

export default (sequelize, DataTypes) => {
  RealStatePropertyAttachment.init(
    BasicSchema(DataTypes, {
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idRealStatePropertyAttachmentType: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    }),
    {
      sequelize,
      tableName: TABLE_REAL_STATE_PROPERTY_ATTACHMENT,
    },
  );
};
