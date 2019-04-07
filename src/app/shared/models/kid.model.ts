import { Presence } from 'app/shared/models/presence.model';

export class Kid {
  id: string;
  firstName: string;
  lastName: string;
  fiscalCode: string;
  birthDate: Date;
  from: Date;
  to: Date;
  contractType: ContractType;
  contractValue: number;
  notes: string;
  subscription: number;
  subscriptionPaid: boolean;
  // Billing data
  parentFirstName: string;
  parentLastName: string;
  parentFiscalCode: string;
  address: string;
  city: string;
  cap: number;
  province: string;
  paymentMethod: PaymentMethod;
  // Presences
  presencesList: Presence[];
}

export enum PaymentMethod {
  Bonifico = 1,
  Contanti = 2
}

export enum ContractType {
  Contratto = 0,
  Ore
}
