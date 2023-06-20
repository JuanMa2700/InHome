import { Model } from 'sequelize';
import BasicSchema = require('../migrations/basicModelDefinition');
import { TABLE_COUNTRY } from '../utils/constants/migrations.const';
import { Company } from './Company';
import { BasicSchemaModel, ModelsType } from './types';

export interface CountryAttributes extends BasicSchemaModel {
  name: string;
  companyIdentificationType: string;
  personalIdentificationType: string;
  Companies?: Company[];
}

export class Country extends Model implements CountryAttributes {
  name: string;
  companyIdentificationType: string;
  personalIdentificationType: string;
  Companies?: Company[];

  static associate = (models: ModelsType) => {
    Country.hasMany(models.Company, {
      foreignKey: 'idCountry',
    });
  };
}

export default (sequelize, DataTypes) => {
  Country.init(
    BasicSchema(DataTypes, {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      companyIdentificationType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      personalIdentificationType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }),
    {
      sequelize,
      tableName: TABLE_COUNTRY,
    },
  );
};
