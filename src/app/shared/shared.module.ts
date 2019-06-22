import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { KidService } from 'app/shared/services/kid.service';
import { SettingsService } from 'app/shared/services/settings.service';
import { ConfirmDeleteDialogComponent } from './components/confirm-delete-dialog/confirm-delete-dialog.component';
import { MaterialModule } from 'app/material/material.module';

@NgModule({
  declarations: [ConfirmDeleteDialogComponent],
  providers: [
    KidService,
    SettingsService
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule
  ],
  entryComponents: [
    ConfirmDeleteDialogComponent
  ],
  exports: [
  ]
})
export class SharedModule { }
