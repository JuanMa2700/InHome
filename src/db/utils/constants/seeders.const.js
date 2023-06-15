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

module.exports.COMPANY_1 = {
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

module.exports.ROLE_1 = {
  id: 1,
  name: 'Basic',
  idUserType: this.USER_TYPE_ID_1,
  idCompany: this.COMPANY_1.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};

module.exports.ROLE_2 = {
  id: 2,
  name: 'All Permissions',
  idUserType: this.USER_TYPE_ID_1,
  idCompany: this.COMPANY_1.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};

module.exports.ROLE_3 = {
  id: 3,
  name: 'Sales',
  idUserType: this.USER_TYPE_ID_1,
  idCompany: this.COMPANY_1.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};

module.exports.ROLE_4 = {
  id: 4,
  name: 'Basic',
  idUserType: this.USER_TYPE_ID_2,
  idCompany: this.COMPANY_1.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};

module.exports.ROLE_5 = {
  id: 5,
  name: 'Accounting',
  idUserType: this.USER_TYPE_ID_1,
  idCompany: this.COMPANY_1.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};

module.exports.USER_1 = {
  id: 1,
  username: 'admin',
  password: 'admin',
  idRole: this.ROLE_2.id,
  idCompany: this.COMPANY_1.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};

module.exports.USER_PROFILE_1 = {
  id: 1,
  idUser: this.USER_1.id,
  name: 'Admin',
  lastName: 'Test',
  email: 'admin@gmail.com',
  phone: '3456785543',
  avatar: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};
