import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient
  ) { }

  public login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/authentication/token`, credentials);
  }
}
