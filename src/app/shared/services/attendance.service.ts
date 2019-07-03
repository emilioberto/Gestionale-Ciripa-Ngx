import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import * as moment from 'moment';

import { environment } from 'environments/environment';
import { Presence } from 'app/shared/models/presence.model';
import { map } from 'rxjs/operators';
import { Kid } from 'app/shared/models/kid.model';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getPresencesByDate(date: string): Observable<Presence[]> {
    return this.http.get<Presence[]>(`${environment.baseUrl}/presence/${date}`)
      .pipe(map(presences => {
        return presences.map(p => {
          p.date = moment(p.date).locale('it').format('YYYY-MM-DD');
          p.morningEntry = p.morningEntry ? new Date(p.morningEntry) : null;
          p.morningExit = p.morningExit ? new Date(p.morningExit) : null;
          p.eveningEntry = p.eveningEntry ? new Date(p.eveningEntry) : null;
          p.eveningExit = p.eveningExit ? new Date(p.eveningExit) : null;
          if (!p.month) {
            delete p.month;
          }
          if (!p.year) {
            delete p.year;
          }
          return p;
        });
      }));
  }

  public saveAttendance(attendance: { presencesList: Presence[] }): Observable<any> {
    return this.http.put(`${environment.baseUrl}/presence`, attendance.presencesList);
  }
}
