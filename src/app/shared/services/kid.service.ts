import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Kid } from 'app/shared/models/kid.model';
import { environment } from 'environments/environment';

@Injectable()
export class KidService {

  constructor(
    private http: HttpClient,
  ) {
  }

  public getBambinoById(id: number): Observable<Kid> {
    return this.http.get<Kid>(`${environment.baseUrl}/kid/${id}`);
  }

  public getBambinoList(): Observable<Array<Kid>> {
    return this.http.get<Array<Kid>>(`${environment.baseUrl}/kid/list`);
  }

  public saveBambino(kid: Kid): Observable<any> {
    return this.http.put(`${environment.baseUrl}/kid`, kid);
  }

  public deleteBambino(id: number): Observable<any> {
    return this.http.delete(`${environment.baseUrl}/kid/${id}`);
  }
}
