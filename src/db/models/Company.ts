import { Model } from 'sequelize';
import BasicSchema = require('../migrations/basicModelDefinition');
import { TABLE_COMPANY } from '../utils/constants/migrations.const';
import { CompanyType } from './CompanyType';
import { Country } from './Country';
import { BasicSchemaModel, ModelsType } from './types';

export interface CompanyAttributes extends BasicSchemaModel {
  name: string;
  idCompanyType: number;
  domain: string;
  idCountry: number;
  CompanyType?: CompanyType;
  Country?: Country;
}

export class Company extends Model implements CompanyAttributes {
  name: string;
  idCompanyType: number;
  domain: string;
  idCountry: number;
  CompanyType?: CompanyType;
  Country?: Country;

  static associate = (models: ModelsType) => {
    Company.belongsTo(models.CompanyType, {
      foreignKey: 'idCompanyType',
    });
    Company.belongsTo(models.Country, {
      foreignKey: 'idCountry',
    });
  };
}

export default (sequelize, DataTypes) => {
  Company.init(
    BasicSchema(DataTypes, {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idCompanyType: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      domain: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idCountry: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }),
    {
      sequelize,
      tableName: TABLE_COMPANY,
    },
  );
};
