import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'environments/environment';
import { Settings } from 'app/shared/models/settings.model';

@Injectable()
export class SettingsService {

  constructor(
    private http: HttpClient,
  ) {
  }

  public getSettings(): Observable<Settings> {
    return this.http.get<Settings>(`${environment.baseUrl}/settings`);
  }

  public upsertSettings(settings: Settings): Observable<any> {
    return this.http.put(`${environment.baseUrl}/settings`, settings);
  }
}
