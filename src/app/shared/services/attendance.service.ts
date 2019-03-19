import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'environments/environment';
import { Attendance } from 'app/shared/models/attendance.models';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getAttendanceByDate(date: Date): Observable<Attendance> {
    return this.http.get<Attendance>(`${environment.baseUrl}/attendance/${date.toISOString()}`);
  }

  public saveAttendance(attendance: Attendance): Observable<any> {
    return this.http.put(`${environment.baseUrl}/attendance`, attendance);
  }

  public deleteAttendance(id: number): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/attendance` + `/${id}`);
  }
}
