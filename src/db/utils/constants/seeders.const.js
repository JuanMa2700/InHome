module.exports.USER_TYPE_ID_1 = 1;
module.exports.USER_TYPE_ID_2 = 2;
module.exports.USER_TYPE_REAL_STATE_CLIENT = 'REAL_STATE_CLIENT';
module.exports.USER_TYPE_REAL_STATE_EMPLOYEE = 'REAL_STATE_EMPLOYEE';

module.exports.COUNTRY_1 = {
  id: 1,
  name: 'COLOMBIA',
  companyIdentificationType: 'NIT',
  personalIdentificationType: 'CC',
  createdAt: new Date(),
  updatedAt: new Date(),
};

module.exports.COMPANY_TYPE_ID_1 = 1;
module.exports.COMPANY_TYPE_REAL_STATE_COMPANY = 'REAL_STATE_COMPANY';

module.exports.COMPANY_1_SEED = {
  id: 1,
  name: 'Inmobiliaria Mi Casa S.A.',
  idCompanyType: this.COMPANY_TYPE_ID_1,
  domain: 'micasa.com',
  idCountry: this.COUNTRY_1.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};

module.exports.FEATURE_REAL_STATE_CLIENTS = {
  id: 1,
  key: 'REAL_STATE_CLIENTS',
  createdAt: new Date(),
  updatedAt: new Date(),
};

module.exports.FEATURE_REAL_STATE_PROPERTIES = {
  id: 2,
  key: 'REAL_STATE_PROPERTIES',
  createdAt: new Date(),
  updatedAt: new Date(),
};

module.exports.FEATURE_REAL_STATE_PAYMENTS = {
  id: 3,
  key: 'REAL_STATE_PAYMENTS',
  createdAt: new Date(),
  updatedAt: new Date(),
};

module.exports.FEATURE_REAL_STATE_CALENDAR = {
  id: 4,
  key: 'REAL_STATE_CALENDAR',
  createdAt: new Date(),
  updatedAt: new Date(),
};
