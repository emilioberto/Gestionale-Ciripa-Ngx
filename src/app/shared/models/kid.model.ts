export class Kid {
  id: string;
  firstName: string;
  lastName: string;
  fiscalCode: string;
  birthDate: Date;
  from: Date;
  to: Date;
  contractType: ContractType;
  notes: string;
  billingData: Billing;

  subscription: number;
  subscriptionPaid: boolean;
}

export class Billing {
  id: number;
  parentFirstName: string;
  parentLastName: string;
  parentFiscalCode: string;
  address: string;
  city: string;
  cap: number;
  province: string;
  paymentMethod: PaymentMethod;
}

export enum PaymentMethod {
  Bonifico = 1,
  Contanti = 2
}

export enum ContractType {
  Contratto = 0,
  Ore
}
