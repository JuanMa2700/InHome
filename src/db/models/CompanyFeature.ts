import { Model } from 'sequelize';
import BasicSchema = require('../migrations/basicModelDefinition');
import { TABLE_COMPANY_FEATURE } from '../utils/constants/migrations.const';
import { Company } from './Company';
import { Feature } from './Feature';
import { BasicSchemaModel, ModelsType } from './types';

export interface CompanyFeatureAttributes extends BasicSchemaModel {
  idFeature: number;
  idCompany: number;
  Feature?: Feature;
  Company?: Company;
}

export class CompanyFeature extends Model implements CompanyFeatureAttributes {
  idFeature: number;
  idCompany: number;
  Feature?: Feature;
  Company?: Company;

  static associate = (models: ModelsType) => {
    CompanyFeature.belongsTo(models.Feature, {
      foreignKey: 'idFeature',
    });
    CompanyFeature.belongsTo(models.Company, {
      foreignKey: 'idCompany',
    });
  };
}

export default (sequelize, DataTypes) => {
  CompanyFeature.init(
    BasicSchema(DataTypes, {
      idFeature: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idCompany: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }),
    {
      sequelize,
      tableName: TABLE_COMPANY_FEATURE,
    },
  );
};
