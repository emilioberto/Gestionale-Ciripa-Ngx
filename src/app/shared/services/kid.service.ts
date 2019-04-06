import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Kid } from 'app/shared/models/kid.model';
import { environment } from 'environments/environment';
import { Presence } from 'app/shared/models/presence.model';

@Injectable()
export class KidService {

  constructor(
    private http: HttpClient,
  ) {
  }

  public getKidById(id: number): Observable<Kid> {
    return this.http.get<Kid>(`${environment.baseUrl}/kid/${id}`);
  }

  public getKidsList(): Observable<Array<Kid>> {
    return this.http.get<Array<Kid>>(`${environment.baseUrl}/kid/list`);
  }

  public upsertKid(kid: Kid): Observable<any> {
    return this.http.put(`${environment.baseUrl}/kid`, kid);
  }

  public deleteKid(id: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/kid/${id}`);
  }

  public getPresencesByDate(date: string): Observable<Presence[]> {
    return this.http.get<Presence[]>(`${environment.baseUrl}/presences/${date}`);
  }
}
