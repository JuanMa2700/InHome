import { Payment } from './Payment';
import { PaymentType } from './PaymentType';

export type BasicSchemaModel = {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type ModelsType = {
  Payment: typeof Payment;
  PaymentType: typeof PaymentType;
};
