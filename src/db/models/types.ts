import { Company } from './Company';
import { CompanyFeature } from './CompanyFeature';
import { CompanyType } from './CompanyType';
import { Country } from './Country';
import { Feature } from './Feature';
import { Payment } from './Payment';
import { PaymentType } from './PaymentType';
import { UserType } from './UserType';
import { RealStateClientType } from './RealStateClientType';
import { RealStateClient } from './RealStateClient';
import { RealStateProperty } from './RealStateProperty';
import { RealStatePropertyAttachment } from './RealStatePropertyAttachment';
import { LeasingContract } from './LeasingContract';
import { LeasingContractPayment } from './LeasingContractPayment';

export type BasicSchemaModel = {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type ModelsType = {
  Payment: typeof Payment;
  PaymentType: typeof PaymentType;
  CompanyFeature: typeof CompanyFeature;
  CompanyType: typeof CompanyType;
  Feature: typeof Feature;
  UserType: typeof UserType;
  Company: typeof Company;
  Country: typeof Country;
  RealStateClientType: typeof RealStateClientType;
  RealStateClient: typeof RealStateClient;
  RealStateProperty: typeof RealStateProperty;
  RealStatePropertyAttachment: typeof RealStatePropertyAttachment;
  LeasingContract: typeof LeasingContract;
  LeasingContractPayment: typeof LeasingContractPayment;
};
