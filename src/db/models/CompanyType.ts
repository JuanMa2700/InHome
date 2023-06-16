import { Model } from 'sequelize';
import BasicSchema = require('../migrations/basicModelDefinition');
import { TABLE_COMPANY_TYPE } from '../utils/constants/migrations.const';
import { Company } from './Company';
import { BasicSchemaModel, ModelsType } from './types';

export interface CompanyTypeAttributes extends BasicSchemaModel {
  type: string;
  Companies?: Company[];
}

export class CompanyType extends Model implements CompanyTypeAttributes {
  type: string;
  Companies?: Company[];

  static associate = (models: ModelsType) => {
    CompanyType.hasMany(models.Company, {
      foreignKey: 'idCompanyType',
    });
  };
}

export default (sequelize, DataTypes) => {
  CompanyType.init(
    BasicSchema(DataTypes, {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }),
    {
      sequelize,
      tableName: TABLE_COMPANY_TYPE,
    },
  );
};
