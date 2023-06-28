import { Model } from 'sequelize';
import BasicSchema = require('../migrations/basicModelDefinition');
import { TABLE_FEATURE } from '../utils/constants/migrations.const';
import { CompanyFeature } from './CompanyFeature';
import { BasicSchemaModel, ModelsType } from './types';

export interface FeatureAttributes extends BasicSchemaModel {
  key: string;
  CompanyFeatures?: CompanyFeature[];
}

export class Feature extends Model implements FeatureAttributes {
  key: string;
  CompanyFeatures?: CompanyFeature[];

  static associate = (models: ModelsType) => {
    Feature.hasMany(models.CompanyFeature, {
      foreignKey: 'idFeature',
    });
  };
}

export default (sequelize, DataTypes) => {
  Feature.init(
    BasicSchema(DataTypes, {
      key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }),
    {
      sequelize,
      tableName: TABLE_FEATURE,
    },
  );
};
