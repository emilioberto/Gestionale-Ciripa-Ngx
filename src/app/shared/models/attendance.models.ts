import { Kid } from 'app/shared/models/kid.model';

export class Attendance {
  id: number;
  date: Date;
  presencesList: Array<Presence>;
}

export class Presence {
  id: number;
  kidId: number;
  kid: Kid;
  appelloId: number;
  attendance: Attendance;
  morningEntry: Date;
  morningExit: Date;
  eveningEntry: Date;
  eveningExit: Date;
}
