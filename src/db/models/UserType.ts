import { Model } from 'sequelize';
import BasicSchema = require('../migrations/basicModelDefinition');
import { TABLE_USER_TYPE } from '../utils/constants/migrations.const';
import { BasicSchemaModel, ModelsType } from './types';

export interface UserTypeAttributes extends BasicSchemaModel {
  type: string;
}

export class UserType extends Model implements UserTypeAttributes {
  type: string;
}

export default (sequelize, DataTypes) => {
  UserType.init(
    BasicSchema(DataTypes, {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }),
    {
      sequelize,
      tableName: TABLE_USER_TYPE,
    },
  );
};
