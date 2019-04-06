import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { SettingsService } from 'app/shared/services/settings.service';
import { BaseComponent } from 'app/shared/components/base.component';
import { Settings } from 'app/shared/models/settings.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends BaseComponent implements OnInit {

  public settings: Settings = <Settings>{ hourCost: 0 };

  constructor(
    private settingsService: SettingsService,
    public snackBar: MatSnackBar
  ) {
    super(snackBar);
  }

  ngOnInit() {
    this.settingsService.getSettings().subscribe(
      settings => {
        if (settings) {
          this.settings = settings;
        }
      },
      err => this.addErrorNotification(err.message, 'OK')
    );
  }

  public save(): void {
    this.settingsService.upsertSettings(this.settings).subscribe(
      settings => this.addSuccessNotification(`Salvataggio effettuato`, `Ok`),
      err => this.addErrorNotification(err.message, 'OK')
    );
  }

}
