import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntlModule } from '@progress/kendo-angular-intl';

import { NavigationService } from 'app/core/services/navigation.service';

import '@progress/kendo-angular-intl/locales/it/all';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IntlModule
  ],
  providers: [
    NavigationService,
    { provide: LOCALE_ID, useValue: 'it-IT' }
  ]
})
export class CoreModule { }
