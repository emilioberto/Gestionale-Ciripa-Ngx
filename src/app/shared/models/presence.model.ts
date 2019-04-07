import { Kid } from 'app/shared/models/kid.model';

export class Presence {
  id: number;
  date: string;
  month: number;
  year: number;
  kidId: number;
  kid: Kid;
  morningEntry: Date;
  morningExit: Date;
  eveningEntry: Date;
  eveningExit: Date;
}
